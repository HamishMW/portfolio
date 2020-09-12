import React, { useEffect, useRef, useState, useCallback, forwardRef } from 'react';
import classNames from 'classnames';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  AnimationMixer,
  Clock,
  UnsignedByteType,
  TextureLoader,
  sRGBEncoding,
  Color,
  LoopOnce,
  Vector3,
  Vector2,
  Sprite,
  Raycaster,
  PMREMGenerator,
  WebGLCubeRenderTarget,
  ACESFilmicToneMapping,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { spring, value, transform } from 'popmotion';
import milkywayBg from 'assets/milkyway.jpg';
import milkywayHdr from 'assets/milkyway.hdr';
import earthModel from 'assets/earth.glb';
import { cleanScene, removeLights, cleanRenderer, renderPixelRatio } from 'utils/three';
import { useInViewport } from 'hooks';
import { Helmet } from 'react-helmet-async';
import './Earth.css';

const nullTarget = { x: 0, y: 0, z: 2 };

const getIntertpolatedPosition = (value, nextValue, percent) =>
  value + percent * (nextValue - value);

const positionToString = value =>
  Object.keys(value)
    .map(key => parseFloat(Math.round(value[key] * 100) / 100).toFixed(2))
    .join(', ');

const getPositionValues = section => {
  if (!section || !section.camera) return nullTarget;
  const array = section.camera.split(', ');

  return {
    x: Number(array[0]),
    y: Number(array[1]),
    z: Number(array[2]),
  };
};

const Earth = ({ sections = [], labels = [], model, className, children }) => {
  const [loaded, setLoaded] = useState(false);
  const container = useRef();
  const labelContrainer = useRef();
  const canvas = useRef();
  const scene = useRef();
  const renderer = useRef();
  const camera = useRef();
  const clock = useRef();
  const mouse = useRef();
  const raycaster = useRef();
  const sceneModel = useRef();
  const animations = useRef();
  const mixer = useRef();
  const fetching = useRef(false);
  const inViewport = useInViewport(canvas);
  const animationFrame = useRef();
  const initCameraPosition = useRef(getPositionValues(sections[0]));
  const labelElements = useRef([]);
  const cameraValue = useRef();

  const controls = useRef();

  // componentWillUnmount() {
  //   // const { viewportRef } = this.props;
  //   this.scene.remove(this.model);
  //   this.scene.remove(this.ambientLight);
  //   this.scene.remove(this.dirLight);
  //   this.scene.dispose();
  //   this.renderer.dispose();
  //   this.renderer.forceContextLoss();
  //   this.renderer.context = null;
  //   this.renderer.domElement = null;
  //   this.controls = null;
  //   this.camera = null;
  //   this.animating = false;
  //   // viewportRef.current.removeEventListener('scroll', this.handleScroll);
  //   window.removeEventListener('resize', this.handleResize);
  //   // viewportRef.current.removeEventListener('mouseup', this.handleMouseUp);
  // }

  // componentDidUpdate(prevProps) {
  //   const { labels, model } = this.props;
  //   const { labels: prevLabels, model: prevModel } = prevProps;

  //   if (!isEqual(labels, prevLabels)) {
  //     this.setLabels();
  //     this.handleScroll();
  //   }

  //   if (!isEqual(model, prevModel)) {
  //     this.setModelPosition();
  //     this.handleScroll();
  //   }
  // }

  const animate = useCallback(() => {
    animationFrame.current = requestAnimationFrame(animate);
    const delta = clock.current.getDelta();
    mixer.current.update(delta);
    controls.current.update();
    // renderLabels();
    renderer.current.render(scene.current, camera.current);
  }, []);

  useEffect(() => {
    const { innerWidth, innerHeight } = window;

    console.log('init');

    renderer.current = new WebGLRenderer({
      antialias: false,
      canvas: canvas.current,
      powerPreference: 'high-performance',
    });
    renderer.current.setPixelRatio(renderPixelRatio);
    renderer.current.outputEncoding = sRGBEncoding;
    renderer.current.physicallyCorrectLights = true;
    renderer.current.toneMapping = ACESFilmicToneMapping;

    camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
    camera.current.position.x = initCameraPosition.current.x;
    camera.current.position.y = initCameraPosition.current.y;
    camera.current.position.z = initCameraPosition.current.z;
    camera.current.lookAt(0, 0, 0);

    controls.current = new OrbitControls(camera.current, canvas.current);
    controls.current.enableZoom = false;
    controls.current.enablePan = false;
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.1;
    controls.current.rotateSpeed = 0.5;

    scene.current = new Scene();
    clock.current = new Clock();
    raycaster.current = new Raycaster();

    const ambientLight = new AmbientLight(0x222222, 0.05);
    const dirLight = new DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(3, 0, 1);
    const lights = [ambientLight, dirLight];
    lights.forEach(light => scene.current.add(light));

    return () => {
      cancelAnimationFrame(animationFrame.current);
      removeLights(lights);
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
  }, []);

  useEffect(() => {
    if (loaded || fetching.current) return;
    console.log('load');

    const gltfLoader = new GLTFLoader();
    const rgbeLoader = new RGBELoader();
    const textureLoader = new TextureLoader();
    const pmremGenerator = new PMREMGenerator(renderer.current);
    pmremGenerator.compileEquirectangularShader();

    const loadModel = async () => {
      const gltf = await gltfLoader.loadAsync(earthModel);

      sceneModel.current = gltf.scene;
      animations.current = gltf.animations;

      scene.current.add(sceneModel.current);
      mixer.current = new AnimationMixer(sceneModel.current);
      mixer.current.timeScale = 0.1;

      sceneModel.current.traverse(child => {
        const { material, name } = child;

        if (name === 'Atmosphere') {
          material.alphaMap = material.map;
        }
      });

      const modelPosition = model.position.split(', ');
      sceneModel.current.position.x = Number(modelPosition[0]);
      sceneModel.current.position.y = Number(modelPosition[1]);
      sceneModel.current.position.z = Number(modelPosition[2]);

      sceneModel.current.scale.x = model.scale;
      sceneModel.current.scale.y = model.scale;
      sceneModel.current.scale.z = model.scale;
    };

    const loadEnv = async () => {
      const hdrTexture = await rgbeLoader
        .setDataType(UnsignedByteType)
        .loadAsync(milkywayHdr);

      const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
      scene.current.environment = envMap;
      pmremGenerator.dispose();
    };

    const loadBackground = async () => {
      const backgroundTexture = await textureLoader.loadAsync(milkywayBg);
      backgroundTexture.encoding = sRGBEncoding;

      const cubeTarget = new WebGLCubeRenderTarget(4096);
      const cubeMap = cubeTarget.fromEquirectangularTexture(
        renderer.current,
        backgroundTexture
      );
      scene.current.background = cubeMap;
    };

    const handleLoad = async () => {
      await Promise.all([loadBackground(), loadEnv(), loadModel()]);

      // setLabels();
      setLoaded(true);
      fetching.current = false;
    };

    fetching.current = true;
    handleLoad();
  }, [loaded, model.position, model.scale]);

  useEffect(() => {
    if (loaded && inViewport) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, [animate, inViewport, loaded]);

  const setLabels = () => {
    // const { labels } = this.props;
    // labelElements.current.current.innerHTML = '';
    // labelElements.current = labels.map(label => {
    //   const element = document.createElement('div');
    //   element.classList.add('earth__label');
    //   element.textcontainer = label.text;
    //   labelElements.current.current.appendChild(element);
    //   const position = label.position.split(', ').map(value => Number(value));
    //   const sprite = new Sprite();
    //   sprite.position.set(...position);
    //   sprite.scale.set(60, 60, 1);
    //   return { element, ...label, position, sprite };
    // });
  };

  const renderLabels = () => {
    // labelElements.current.forEach(label => {
    //   const { element, position, sprite } = label;
    //   const vector = new Vector3(...position);
    //   const meshDistance = this.camera.position.distanceTo(this.model.position);
    //   const spriteDistance = this.camera.position.distanceTo(sprite.position);
    //   const spriteBehindObject = spriteDistance > meshDistance;
    //   vector.project(this.camera);
    //   vector.x = Math.round((0.5 + vector.x / 2) * window.innerWidth);
    //   vector.y = Math.round((0.5 - vector.y / 2) * window.innerHeight);
    //   element.style.transform = `translate3d(-50%, -50%, 0) translate3d(${vector.x}px, ${vector.y}px, 0)`;
    //   if (spriteBehindObject) {
    //     element.classList.add('earth__label--occluded');
    //   } else {
    //     element.classList.remove('earth__label--occluded');
    //   }
    // });
  };

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.current.setSize(innerWidth, innerHeight);
      camera.current.aspect = innerWidth / innerHeight;
      camera.current.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseUp = event => {
      const { innerWidth, innerHeight } = window;
      // Set a camera position property to help with defining camera angles
      const cameraPosition = positionToString(camera.current.position);
      console.log({ cameraPosition });

      // Set a surface position to help with defining annotations
      mouse.current = new Vector2(
        (event.clientX / innerWidth) * 2 - 1,
        -(event.clientY / innerHeight) * 2 + 1
      );
      raycaster.current.setFromCamera(mouse.current, camera.current);
      const intersects = raycaster.current.intersectObjects(scene.current.children, true);

      if (intersects.length > 0) {
        const clickPosition = positionToString(intersects[0].point);
        console.log({ clickPosition });
      }
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    let opacitySpring;
    let cameraSpring;

    const handleScroll = () => {
      const { innerHeight } = window;
      const currentScrollY = window.scrollY - container.current.offsetTop;
      let prevTarget;

      const updateMeshes = index => {
        const visibleMeshes = sections[index].meshes.split(', ');

        sceneModel.current.traverse(child => {
          const { isMesh, material, name } = child;

          if (isMesh) {
            const isTransparent = material.opacity === 0;
            const isVisible = visibleMeshes && visibleMeshes.includes(name);
            const isHidden = model.hideMeshes.includes(name);

            const opacityValue = value(
              material.opacity,
              opacity => (material.opacity = opacity)
            );

            const springConfig = { from: opacityValue.get(), stiffness: 32, damping: 26 };

            if (isVisible && isTransparent) {
              opacitySpring = spring({ ...springConfig, to: 1 }).start(opacityValue);
              child.renderOrder = 0;
            } else if (isHidden && !isVisible) {
              opacitySpring = spring({ ...springConfig, to: 0 }).start(opacityValue);
              child.renderOrder = 9999;
            }
          }
        });
      };

      const updateAnimation = index => {
        const sectionAnimations = sections[index].animations.split(', ');

        animations.current.forEach((clip, index) => {
          if (!sectionAnimations.find(section => section.includes(index.toString()))) {
            const animation = mixer.current.clipAction(clip);
            animation.reset().stop();
          }
        });

        if (animations.current.length && sections[index].animations) {
          sectionAnimations.forEach(animItem => {
            const values = animItem.split(':');
            const clip = animations.current[Number(values[0])];
            const animation = mixer.current.clipAction(clip);

            if (!values[1] || values[1] !== 'loop') {
              animation.clampWhenFinished = true;
              animation.loop = LoopOnce;
            }
            animation.play();
          });
        }
      };

      const updateLabels = index => {
        labelElements.current.forEach(label => {
          if (label.hidden) {
            label.element.classList.add('earth__label--hidden');
          }
        });

        if (!sections[index].labels) return;
        const labels = sections[index].labels.split(', ');

        labels.forEach(label => {
          const matches = labelElements.current.filter(item => item.text === label);
          matches.forEach(match => {
            match.element.classList.remove('earth__label--hidden');
          });
        });
      };

      const update = () => {
        const indexRange = transform.clamp(0, sections.length - 1);

        const currentSectionIndex = indexRange(Math.floor(currentScrollY / innerHeight));

        const currentTarget =
          getPositionValues(sections[currentSectionIndex]) || nullTarget;
        const nextTarget =
          getPositionValues(sections[currentSectionIndex + 1]) || nullTarget;
        const sectionScrolled =
          (currentScrollY - innerHeight * currentSectionIndex) / innerHeight;

        const scrollPercentRange = transform.clamp(0, 1);
        const scrollPercent = scrollPercentRange(sectionScrolled);
        const currentX = getIntertpolatedPosition(
          currentTarget.x,
          nextTarget.x,
          scrollPercent
        );
        const currentY = getIntertpolatedPosition(
          currentTarget.y,
          nextTarget.y,
          scrollPercent
        );
        const currentZ = getIntertpolatedPosition(
          currentTarget.z,
          nextTarget.z,
          scrollPercent
        );

        if (
          prevTarget !== currentTarget &&
          sections.length &&
          sections[currentSectionIndex]
        ) {
          updateMeshes(currentSectionIndex);
          updateAnimation(currentSectionIndex);
          updateLabels(currentSectionIndex);
        }

        prevTarget = currentTarget;

        if (!cameraValue.current) {
          cameraValue.current = value(camera.current.position, ({ x, y, z }) =>
            camera.current.position.set(x, y, z)
          );
        }

        cameraSpring = spring({
          from: cameraValue.current.get(),
          to: { x: currentX, y: currentY, z: currentZ },
          velocity: cameraValue.current.getVelocity(),
          stiffness: 100,
          damping: 80,
        }).start(cameraValue.current);
      };

      requestAnimationFrame(update);
    };

    if (loaded && inViewport) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (opacitySpring) {
        opacitySpring.stop();
      }

      if (cameraSpring) {
        cameraSpring.stop();
      }
    };
  }, [inViewport, loaded, model, model.hideMeshes, sections]);

  return (
    <div className={classNames('earth', className)} ref={container}>
      <Helmet>
        <link rel="prefetch" href={milkywayBg} as="fetch" />
        <link rel="prefetch" href={milkywayHdr} as="fetch" />
        <link rel="prefetch" href={earthModel} as="fetch" />
      </Helmet>
      <div className="earth__viewport">
        <canvas
          className="earth__canvas"
          ref={canvas}
          style={{ opacity: loaded && inViewport ? 1 : 0 }}
        />
        <div className="earth__labels" aria-live="polite" ref={labelContrainer} />
        <div className="earth__vignette" />
      </div>
      <div className="earth__sections">{children}</div>
    </div>
  );
};

export const EarthSection = ({ children, scrim, className }) => {
  return (
    <div
      className={classNames('earth__section', className, {
        'earth__section--scrim': scrim,
      })}
    >
      {children}
    </div>
  );
};

export default Earth;
