import earthModel from 'assets/earth.glb';
import mwnx from 'assets/milkyway-nx.hdr';
import mwny from 'assets/milkyway-ny.hdr';
import mwnz from 'assets/milkyway-nz.hdr';
import mwpx from 'assets/milkyway-px.hdr';
import mwpy from 'assets/milkyway-py.hdr';
import mwpz from 'assets/milkyway-pz.hdr';
import milkywayBg from 'assets/milkyway.jpg';
import { Loader } from 'components/Loader';
import { Section } from 'components/Section';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { useReducedMotion, useSpring } from 'framer-motion';
import { useInViewport, useWindowSize } from 'hooks';
import {
  createContext,
  memo,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { HDRCubeTextureLoader, OrbitControls } from 'three-stdlib';
import {
  ACESFilmicToneMapping,
  AmbientLight,
  AnimationMixer,
  Clock,
  DirectionalLight,
  LoopOnce,
  PMREMGenerator,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Sprite,
  Vector2,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
} from 'three';
import { LinearFilter } from 'three';
import { EquirectangularReflectionMapping } from 'three';
import { clamp } from 'utils/clamp';
import { classes, media, msToNum, numToPx } from 'utils/style';
import {
  cleanRenderer,
  cleanScene,
  getChild,
  modelLoader,
  removeLights,
  textureLoader,
} from 'utils/three';
import { throttle } from 'utils/throttle';
import styles from './Earth.module.css';

const nullTarget = { x: 0, y: 0, z: 2 };

const interpolatePosition = (value, nextValue, percent) =>
  value + percent * (nextValue - value);

const positionToString = value =>
  Object.keys(value)
    .map(key => parseFloat(Math.round(value[key] * 100) / 100).toFixed(2))
    .join(', ');

const getPositionValues = section => {
  if (!section || !section.camera) return nullTarget;

  return {
    x: section.camera[0],
    y: section.camera[1],
    z: section.camera[2],
  };
};

const isEqualPosition = (position1, position2) => {
  const round = (num = 0) => Math.round((num + Number.EPSILON) * 100) / 100;

  return (
    round(position1?.x) === round(position2?.x) &&
    round(position1?.y) === round(position2?.y) &&
    round(position1?.z) === round(position2?.z)
  );
};

const cameraSpringConfig = {
  stiffness: 80,
  damping: 40,
  mass: 2,
  restSpeed: 0.001,
  restDelta: 0.001,
};

const chunkSpringConfig = {
  stiffness: 40,
  damping: 30,
  mass: 2,
  restSpeed: 0.001,
  restDelta: 0.001,
};

const opacitySpringConfig = {
  stiffness: 40,
  damping: 30,
};

const EarthContext = createContext({});

export const Earth = ({
  position = [0, 0, 0],
  scale = 1,
  hideMeshes = [],
  labels = [],
  className,
  children,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const sectionRefs = useRef([]);
  const container = useRef();
  const labelContainer = useRef();
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
  const inViewport = useInViewport(canvas);
  const animationFrame = useRef();
  const initCameraPosition = useRef(getPositionValues(sectionRefs.current[0]));
  const labelElements = useRef([]);
  const controls = useRef();
  const envMap = useRef();
  const contentAdded = useRef();
  const mounted = useRef();
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const reduceMotion = useReducedMotion();
  const cameraXSpring = useSpring(0, cameraSpringConfig);
  const cameraYSpring = useSpring(0, cameraSpringConfig);
  const cameraZSpring = useSpring(0, cameraSpringConfig);
  const chunkXSpring = useSpring(0, chunkSpringConfig);
  const chunkYSpring = useSpring(0, chunkSpringConfig);
  const chunkZSpring = useSpring(0, chunkSpringConfig);
  const opacitySpring = useSpring(0, opacitySpringConfig);

  const renderFrame = useCallback(() => {
    if (!inViewport) {
      cancelAnimationFrame(animationFrame.current);
      return;
    }

    animationFrame.current = requestAnimationFrame(renderFrame);
    const delta = clock.current.getDelta();
    mixer.current.update(delta);
    controls.current.update();
    renderer.current.render(scene.current, camera.current);

    // Render labels
    labelElements.current.forEach(label => {
      const { element, position, sprite } = label;
      const vector = new Vector3(...position);
      const meshDistance = camera.current.position.distanceTo(
        sceneModel.current.position
      );
      const spriteDistance = camera.current.position.distanceTo(sprite.position);
      const spriteBehindObject = spriteDistance > meshDistance;

      vector.project(camera.current);
      vector.x = Math.round((0.5 + vector.x / 2) * window.innerWidth);
      vector.y = Math.round((0.5 - vector.y / 2) * window.innerHeight);
      element.style.setProperty('--posX', numToPx(vector.x));
      element.style.setProperty('--posY', numToPx(vector.y));

      if (spriteBehindObject) {
        element.dataset.occluded = true;
      } else {
        element.dataset.occluded = false;
      }
    });
  }, [inViewport]);

  useEffect(() => {
    mounted.current = true;
    const { innerWidth, innerHeight } = window;

    renderer.current = new WebGLRenderer({
      canvas: canvas.current,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    });
    renderer.current.setPixelRatio(1);
    renderer.current.outputEncoding = sRGBEncoding;
    renderer.current.physicallyCorrectLights = true;
    renderer.current.toneMapping = ACESFilmicToneMapping;

    camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
    camera.current.position.x = initCameraPosition.current.x;
    camera.current.position.y = initCameraPosition.current.y;
    camera.current.position.z = initCameraPosition.current.z;
    camera.current.lookAt(0, 0, 0);

    cameraXSpring.set(camera.current.position.x, false);
    cameraYSpring.set(camera.current.position.y, false);
    cameraZSpring.set(camera.current.position.z, false);

    scene.current = new Scene();
    clock.current = new Clock();
    raycaster.current = new Raycaster();

    const ambientLight = new AmbientLight(0x222222, 0.05);
    const dirLight = new DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(3, 0, 1);
    const lights = [ambientLight, dirLight];
    lights.forEach(light => scene.current.add(light));

    controls.current = new OrbitControls(camera.current, canvas.current);
    controls.current.enableZoom = false;
    controls.current.enablePan = false;
    controls.current.enableDamping = false;
    controls.current.rotateSpeed = 0.5;

    return () => {
      mounted.current = false;
      cancelAnimationFrame(animationFrame.current);

      removeLights(lights);
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleControlStart = () => {
      setGrabbing(true);
      cameraXSpring.stop();
      cameraYSpring.stop();
      cameraZSpring.stop();
    };

    const handleControlEnd = () => {
      cameraXSpring.set(camera.current.position.x, false);
      cameraYSpring.set(camera.current.position.y, false);
      cameraZSpring.set(camera.current.position.z, false);
      setGrabbing(false);
    };

    controls.current.addEventListener('start', handleControlStart);
    controls.current.addEventListener('end', handleControlEnd);

    return () => {
      controls.current.removeEventListener('start', handleControlStart);
      controls.current.removeEventListener('end', handleControlEnd);
    };
  }, [cameraXSpring, cameraYSpring, cameraZSpring]);

  useEffect(() => {
    if (!loaded) return;

    const chunk = getChild('Chunk', sceneModel.current);
    const atmosphere = getChild('Atmosphere', sceneModel.current);

    const handleCameraChange = (axis, value) => {
      camera.current.position[axis] = value;
    };

    const unsubscribeCameraX = cameraXSpring.onChange(value =>
      handleCameraChange('x', value)
    );
    const unsubscribeCameraY = cameraYSpring.onChange(value =>
      handleCameraChange('y', value)
    );
    const unsubscribeCameraZ = cameraZSpring.onChange(value =>
      handleCameraChange('z', value)
    );

    const handleChunkChange = (axis, value) => {
      chunk.position[axis] = value;
    };

    const unsubscribeChunkX = chunkXSpring.onChange(value =>
      handleChunkChange('x', value)
    );
    const unsubscribeChunkY = chunkYSpring.onChange(value =>
      handleChunkChange('y', value)
    );
    const unsubscribeChunkZ = chunkZSpring.onChange(value =>
      handleChunkChange('z', value)
    );

    const unsubscribeOpacity = opacitySpring.onChange(value => {
      atmosphere.material.opacity = value;
    });

    return () => {
      unsubscribeCameraX();
      unsubscribeCameraY();
      unsubscribeCameraZ();
      unsubscribeChunkX();
      unsubscribeChunkY();
      unsubscribeChunkZ();
      unsubscribeOpacity();
    };
  }, [
    cameraXSpring,
    cameraYSpring,
    cameraZSpring,
    chunkXSpring,
    chunkYSpring,
    chunkZSpring,
    loaded,
    opacitySpring,
  ]);

  useEffect(() => {
    if (windowWidth <= media.tablet) {
      controls.current.enabled = false;
    }
  }, [windowWidth]);

  useEffect(() => {
    if (loaded) return;

    const hdrLoader = new HDRCubeTextureLoader();
    const pmremGenerator = new PMREMGenerator(renderer.current);
    pmremGenerator.compileCubemapShader();

    const loadModel = async () => {
      const gltf = await modelLoader.loadAsync(earthModel);

      sceneModel.current = gltf.scene;
      animations.current = gltf.animations;
      mixer.current = new AnimationMixer(sceneModel.current);
      mixer.current.timeScale = 0.1;

      sceneModel.current.traverse(async child => {
        const { material, name } = child;

        if (name === 'Atmosphere') {
          material.alphaMap = material.map;
        }

        if (material) {
          await renderer.current.initTexture(material);
        }
      });

      sceneModel.current.position.x = position[0];
      sceneModel.current.position.y = position[1];
      sceneModel.current.position.z = position[2];

      sceneModel.current.scale.x = scale;
      sceneModel.current.scale.y = scale;
      sceneModel.current.scale.z = scale;
    };

    const loadEnv = async () => {
      const hdrTexture = await hdrLoader.loadAsync([mwnx, mwny, mwnz, mwpx, mwpy, mwpz]);

      hdrTexture.magFilter = LinearFilter;
      envMap.current = pmremGenerator.fromCubemap(hdrTexture);
      pmremGenerator.dispose();
      await renderer.current.initTexture(envMap.current.texture);
    };

    const loadBackground = async () => {
      const backgroundTexture = await textureLoader.loadAsync(milkywayBg.src);
      backgroundTexture.mapping = EquirectangularReflectionMapping;
      backgroundTexture.encoding = sRGBEncoding;
      scene.current.background = backgroundTexture;
      await renderer.current.initTexture(backgroundTexture);
    };

    const handleLoad = async () => {
      await Promise.all([loadBackground(), loadEnv(), loadModel()]);

      sceneModel.current.traverse(({ material }) => {
        if (material) {
          material.envMap = envMap.current.texture;
          material.needsUpdate = true;
        }
      });

      if (mounted.current) {
        setLoaded(true);
      }
    };

    startTransition(() => {
      handleLoad();

      setTimeout(() => {
        setLoaderVisible(true);
      }, 1000);
    });
  }, [loaded, position, scale]);

  useEffect(() => {
    // Add models and textures once visible
    if (loaded && !contentAdded.current) {
      scene.current.add(sceneModel.current);
      contentAdded.current = true;
    }

    // Only animate while visible
    if (loaded && inViewport) {
      setVisible(true);
      renderFrame();
    }

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, [renderFrame, inViewport, loaded]);

  useEffect(() => {
    if (loaded) {
      labelContainer.current.innerHTML = '';
      labelElements.current = labels.map(label => {
        const element = document.createElement('div');
        element.classList.add(styles.label);
        element.dataset.hidden = true;
        element.style.setProperty('--delay', `${label.delay || 0}ms`);
        element.textContent = label.text;
        labelContainer.current.appendChild(element);
        const sprite = new Sprite();
        sprite.position.set(...label.position);
        sprite.scale.set(60, 60, 1);
        return { element, ...label, sprite };
      });
    }
  }, [labels, loaded]);

  useEffect(() => {
    renderer.current.setSize(windowWidth, windowHeight);
    camera.current.aspect = windowWidth / windowHeight;
    camera.current.updateProjectionMatrix();
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    const currentCanvas = canvas.current;

    // Log readouts for dev in console
    const handleMouseUp = event => {
      const { innerWidth, innerHeight } = window;
      // Set a camera position property to help with defining camera angles
      const cameraPosition = positionToString(camera.current.position);
      console.info({ cameraPosition });

      // Set a surface position to help with defining annotations
      mouse.current = new Vector2(
        (event.clientX / innerWidth) * 2 - 1,
        -(event.clientY / innerHeight) * 2 + 1
      );
      raycaster.current.setFromCamera(mouse.current, camera.current);
      const intersects = raycaster.current.intersectObjects(scene.current.children, true);

      if (intersects.length > 0) {
        const clickPosition = positionToString(intersects[0].point);
        console.info({ clickPosition });
      }
    };

    if (process.env.NODE_ENV === 'development') {
      currentCanvas.addEventListener('click', handleMouseUp);
    }

    return () => {
      currentCanvas.removeEventListener('click', handleMouseUp);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (!container.current) return;

    const { offsetTop } = container.current;
    const { innerHeight } = window;

    const currentScrollY = window.scrollY - offsetTop;
    let prevTarget;

    const updateMeshes = index => {
      const visibleMeshes = sectionRefs.current[index].meshes;

      sceneModel.current.traverse(child => {
        const { name } = child;
        const chunk = getChild('Chunk', sceneModel.current);
        const isVisible = visibleMeshes?.includes(name);
        const isHidden = hideMeshes?.includes(name);

        if (isVisible) {
          if (name === 'Atmosphere') {
            child.visible = true;

            opacitySpring.set(1);
          } else if (name === 'Chunk') {
            const chunkTarget = new Vector3(-0.4, 0.4, 0.4);

            child.visible = true;

            if (reduceMotion) {
              child.position.set(...chunkTarget.toArray());
            } else {
              chunkXSpring.set(chunkTarget.x);
              chunkYSpring.set(chunkTarget.y);
              chunkZSpring.set(chunkTarget.z);
            }
          } else if (name === 'EarthFull' && chunk.visible) {
            child.visible = false;
          } else {
            child.visible = true;
          }
        } else if (isHidden && !isVisible) {
          if (name === 'Atmosphere') {
            opacitySpring.set(0);
          } else if (name === 'Chunk') {
            const chunkTarget = new Vector3(0, 0, 0);

            if (isEqualPosition(chunkTarget, chunk.position)) {
              child.visible = false;
            }

            chunkXSpring.set(chunkTarget.x);
            chunkYSpring.set(chunkTarget.y);
            chunkZSpring.set(chunkTarget.z);
          } else if (name === 'EarthPartial' && chunk.visible) {
            child.visible = true;
          } else {
            child.visible = false;
          }
        }
      });
    };

    const updateAnimation = index => {
      const sectionAnimations = sectionRefs.current[index].animations;

      if (reduceMotion) return;

      animations.current.forEach((clip, index) => {
        if (!sectionAnimations.find(section => section.includes(index.toString()))) {
          const animation = mixer.current.clipAction(clip);
          animation.reset().stop();
        }
      });

      if (animations.current.length && sectionRefs.current[index].animations) {
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
          label.element.dataset.hidden = true;
          label.element.setAttribute('aria-hidden', true);
        }
      });

      const sectionLabels = sectionRefs.current[index].labels;

      sectionLabels.forEach(label => {
        const matches = labelElements.current.filter(item => item.text === label);
        matches.forEach(match => {
          match.element.dataset.hidden = false;
          match.element.setAttribute('aria-hidden', false);
        });
      });
    };

    const update = () => {
      const sectionCount = sectionRefs.current.length - 1;
      const absoluteSection = Math.floor(currentScrollY / innerHeight);
      const currentSectionIndex = clamp(absoluteSection, 0, sectionCount);
      const currentSection = sectionRefs.current[currentSectionIndex];
      const nextSection = sectionRefs.current[currentSectionIndex + 1];

      const currentTarget = getPositionValues(currentSection) || nullTarget;
      const nextTarget = getPositionValues(nextSection) || nullTarget;
      const sectionScrolled =
        (currentScrollY - innerHeight * currentSectionIndex) / innerHeight;

      const scrollPercent = clamp(sectionScrolled, 0, 1);
      const currentX = interpolatePosition(currentTarget.x, nextTarget.x, scrollPercent);
      const currentY = interpolatePosition(currentTarget.y, nextTarget.y, scrollPercent);
      const currentZ = interpolatePosition(currentTarget.z, nextTarget.z, scrollPercent);

      if (prevTarget !== currentTarget && sectionRefs.current.length && currentSection) {
        updateMeshes(currentSectionIndex);
        updateAnimation(currentSectionIndex);
        updateLabels(currentSectionIndex);
      }

      prevTarget = currentTarget;

      if (grabbing) return;

      if (reduceMotion) {
        camera.current.position.set(currentX, currentY, currentZ);
        return;
      }

      cameraXSpring.set(currentX);
      cameraYSpring.set(currentY);
      cameraZSpring.set(currentZ);
    };

    requestAnimationFrame(update);
  }, [
    cameraXSpring,
    cameraYSpring,
    cameraZSpring,
    chunkXSpring,
    chunkYSpring,
    chunkZSpring,
    grabbing,
    hideMeshes,
    opacitySpring,
    reduceMotion,
  ]);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 100);

    if (loaded && inViewport) {
      window.addEventListener('scroll', throttledScroll);
    }

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll, inViewport, loaded, opacitySpring]);

  const registerSection = useCallback(section => {
    sectionRefs.current = [...sectionRefs.current, section];
  }, []);

  const unregisterSection = useCallback(section => {
    sectionRefs.current = sectionRefs.current.filter(item => item !== section);
  }, []);

  return (
    <EarthContext.Provider value={{ registerSection, unregisterSection }}>
      <div className={classes(styles.earth, className)} ref={container}>
        <div className={styles.viewport}>
          <canvas
            className={styles.canvas}
            data-visible={loaded && visible}
            data-grabbing={grabbing}
            ref={canvas}
          />
          <div className={styles.labels} aria-live="polite" ref={labelContainer} />
          <div className={styles.vignette} />
        </div>
        <div className={styles.sections}>{children}</div>
        <Transition
          unmount
          in={!loaded && loaderVisible}
          timeout={msToNum(tokens.base.durationL)}
        >
          {visible => (
            <Section className={styles.loader} data-visible={visible}>
              <Loader />
            </Section>
          )}
        </Transition>
      </div>
    </EarthContext.Provider>
  );
};

export const EarthSection = memo(
  ({
    children,
    scrim,
    scrimReverse,
    className,
    camera = [0, 0, 0],
    animations = [],
    meshes = [],
    labels = [],
  }) => {
    const { registerSection, unregisterSection } = useContext(EarthContext);
    const sectionRef = useRef();
    const stringifiedDeps =
      JSON.stringify(animations) +
      JSON.stringify(camera) +
      JSON.stringify(labels) +
      JSON.stringify(meshes);

    useEffect(() => {
      const section = {
        camera,
        animations,
        meshes,
        labels,
        sectionRef,
      };

      registerSection(section);

      return () => {
        unregisterSection(section);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringifiedDeps, registerSection, unregisterSection]);

    return (
      <div
        className={classes(styles.section, className)}
        data-scrim={scrim}
        data-scrim-reverse={scrimReverse}
        ref={sectionRef}
      >
        {children}
      </div>
    );
  }
);
