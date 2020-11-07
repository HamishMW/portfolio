import {
  useEffect,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
  memo,
  forwardRef,
} from 'react';
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
import { cleanScene, removeLights, cleanRenderer } from 'utils/three';
import { useInViewport, usePrefersReducedMotion, useWindowSize } from 'hooks';
import { media } from 'utils/style';
import './Earth.css';

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

const isEqualCameraPosition = (position1, position2) => {
  const round = (num = 0) => Math.round((num + Number.EPSILON) * 100) / 100;

  return (
    round(position1?.x) === round(position2?.x) &&
    round(position1?.y) === round(position2?.y) &&
    round(position1?.z) === round(position2?.z)
  );
};

const EarthContext = createContext({});

const Earth = forwardRef(
  (
    {
      position = [0, 0, 0],
      scale = 1,
      hideMeshes = [],
      labels = [],
      className,
      children,
    },
    ref
  ) => {
    const [loaded, setLoaded] = useState(false);
    const [grabbing, setGrabbing] = useState(false);
    const sectionRefs = useRef([]);
    const defaultContainer = useRef();
    const container = ref || defaultContainer;
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
    const fetching = useRef(false);
    const inViewport = useInViewport(canvas);
    const animationFrame = useRef();
    const initCameraPosition = useRef(getPositionValues(sectionRefs.current[0]));
    const labelElements = useRef([]);
    const cameraValue = useRef();
    const controls = useRef();
    const envMap = useRef();
    const skyBox = useRef();
    const contentAdded = useRef();
    const cameraSpring = useRef();
    const mounted = useRef();
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const reduceMotion = usePrefersReducedMotion();

    const animate = useCallback(() => {
      if (!inViewport) {
        cancelAnimationFrame(animationFrame.current);
        return;
      }

      animationFrame.current = requestAnimationFrame(animate);
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
        element.style.transform = `translate3d(-50%, -50%, 0) translate3d(${vector.x}px, ${vector.y}px, 0)`;

        if (spriteBehindObject) {
          element.classList.add('earth__label--occluded');
        } else {
          element.classList.remove('earth__label--occluded');
        }
      });
    }, [inViewport]);

    useEffect(() => {
      mounted.current = true;
      const { innerWidth, innerHeight } = window;

      renderer.current = new WebGLRenderer({
        canvas: canvas.current,
        antialias: false,
        powerPreference: 'high-performance',
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

      const handleControlStart = () => {
        cameraSpring.current?.stop();
        setGrabbing(true);
      };
      const handleControlEnd = () => setGrabbing(false);

      controls.current = new OrbitControls(camera.current, canvas.current);
      controls.current.enableZoom = false;
      controls.current.enablePan = false;
      controls.current.enableDamping = true;
      controls.current.dampingFactor = 0.1;
      controls.current.rotateSpeed = 0.5;
      controls.current.addEventListener('start', handleControlStart);
      controls.current.addEventListener('end', handleControlEnd);

      scene.current = new Scene();
      clock.current = new Clock();
      raycaster.current = new Raycaster();

      const ambientLight = new AmbientLight(0x222222, 0.05);
      const dirLight = new DirectionalLight(0xffffff, 1.5);
      dirLight.position.set(3, 0, 1);
      const lights = [ambientLight, dirLight];
      lights.forEach(light => scene.current.add(light));

      return () => {
        mounted.current = false;
        cancelAnimationFrame(animationFrame.current);
        controls.current.removeEventListener('start', handleControlStart);
        controls.current.removeEventListener('end', handleControlEnd);
        removeLights(lights);
        cleanScene(scene.current);
        cleanRenderer(renderer.current);
      };
    }, []);

    useEffect(() => {
      if (windowWidth <= media.tablet) {
        controls.current.enabled = false;
      }
    }, [windowWidth]);

    useEffect(() => {
      if (loaded || fetching.current) return;

      const gltfLoader = new GLTFLoader();
      const rgbeLoader = new RGBELoader();
      const textureLoader = new TextureLoader();
      const pmremGenerator = new PMREMGenerator(renderer.current);
      pmremGenerator.compileEquirectangularShader();

      const loadModel = async () => {
        const gltf = await gltfLoader.loadAsync(earthModel);

        sceneModel.current = gltf.scene;
        animations.current = gltf.animations;
        mixer.current = new AnimationMixer(sceneModel.current);
        mixer.current.timeScale = 0.1;

        sceneModel.current.traverse(child => {
          const { material, name } = child;

          if (name === 'Atmosphere') {
            material.alphaMap = material.map;
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
        const hdrTexture = await rgbeLoader
          .setDataType(UnsignedByteType)
          .loadAsync(milkywayHdr);

        envMap.current = pmremGenerator.fromEquirectangular(hdrTexture).texture;
        pmremGenerator.dispose();
      };

      const loadBackground = async () => {
        const backgroundTexture = await textureLoader.loadAsync(milkywayBg);
        backgroundTexture.encoding = sRGBEncoding;

        const cubeTarget = new WebGLCubeRenderTarget(4096);
        skyBox.current = cubeTarget.fromEquirectangularTexture(
          renderer.current,
          backgroundTexture
        );
      };

      const handleLoad = async () => {
        await Promise.all([loadBackground(), loadEnv(), loadModel()]);

        if (mounted.current) {
          setLoaded(true);
        }

        fetching.current = false;
      };

      fetching.current = true;
      handleLoad();
    }, [loaded, position, scale]);

    useEffect(() => {
      // Add models and textures once visible
      if (loaded && inViewport && !contentAdded.current) {
        scene.current.add(sceneModel.current);
        scene.current.environment = envMap.current;
        scene.current.background = skyBox.current;
        contentAdded.current = true;
      }

      // Only animate while visible
      if (loaded && inViewport) {
        animate();
      }

      return () => {
        cancelAnimationFrame(animationFrame.current);
      };
    }, [animate, inViewport, loaded]);

    useEffect(() => {
      if (loaded) {
        labelContainer.current.innerHTML = '';
        labelElements.current = labels.map(label => {
          const element = document.createElement('div');
          element.classList.add('earth__label');
          element.classList.add('earth__label--hidden');
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
        console.log({ cameraPosition });

        // Set a surface position to help with defining annotations
        mouse.current = new Vector2(
          (event.clientX / innerWidth) * 2 - 1,
          -(event.clientY / innerHeight) * 2 + 1
        );
        raycaster.current.setFromCamera(mouse.current, camera.current);
        const intersects = raycaster.current.intersectObjects(
          scene.current.children,
          true
        );

        if (intersects.length > 0) {
          const clickPosition = positionToString(intersects[0].point);
          console.log({ clickPosition });
        }
      };

      if (process.env.NODE_ENV === 'development') {
        currentCanvas.addEventListener('click', handleMouseUp);
      }

      return () => {
        currentCanvas.removeEventListener('click', handleMouseUp);
      };
    }, []);

    useEffect(() => {
      let chunkSpring;
      let chunkValue;
      let chunkValueSubscription;
      let opacitySpring;
      let opacityValue;
      const { offsetTop } = container.current;
      const { innerHeight } = window;

      const handleScroll = () => {
        const currentScrollY = window.scrollY - offsetTop;
        let prevTarget;

        if (chunkValueSubscription) {
          chunkValueSubscription.unsubscribe();
        }

        const getChild = name => {
          let node;

          sceneModel.current.traverse(child => {
            if (child.name === name) {
              node = child;
            }
          });

          return node;
        };

        const updateMeshes = index => {
          const visibleMeshes = sectionRefs.current[index].meshes;

          sceneModel.current.traverse(child => {
            const { name } = child;
            const isVisible = visibleMeshes && visibleMeshes.includes(name);
            const isHidden = hideMeshes.includes(name);
            const chunk = getChild('Chunk');
            const earthFull = getChild('EarthFull');
            const earthPartial = getChild('EarthPartial');
            const atmosphere = getChild('Atmosphere');

            if (!opacityValue) {
              opacityValue = value(atmosphere.material.opacity, opacity => {
                atmosphere.material.opacity = opacity;
              });
            }

            const setChunkValue = () => {
              chunkValue = value(chunk.position, ({ x, y, z }) => {
                chunk.position.set(x, y, z);
              });
            };

            if (!chunkValue) {
              setChunkValue();
            }

            const opacitySpringConfig = {
              from: opacityValue?.get(),
              velocity: opacityValue?.getVelocity(),
              stiffness: 16,
              damping: 32,
            };

            const chunkSpringConfig = {
              from: chunkValue?.get(),
              velocity: chunkValue?.getVelocity(),
              stiffness: 32,
              damping: 26,
              mass: 1.8,
              restSpeed: 0.001,
            };

            if (isVisible) {
              if (name === 'Atmosphere') {
                child.visible = true;
                opacitySpring = spring({ ...opacitySpringConfig, to: 1 }).start(
                  opacityValue
                );
              } else if (name === 'Chunk') {
                const chunkPosition = new Vector3(-0.4, 0.4, 0.4);
                child.visible = true;
                chunkValueSubscription = chunkValue.subscribe({
                  complete: setChunkValue,
                });

                if (reduceMotion) {
                  chunk.position.set(...chunkPosition.toArray());
                } else {
                  chunkSpring = spring({
                    ...chunkSpringConfig,
                    to: chunkPosition,
                  }).start(chunkValue);
                }
              } else if (name === 'EarthFull' && chunk.visible) {
                child.visible = false;
              } else {
                child.visible = true;
              }
            } else if (isHidden && !isVisible) {
              if (name === 'Atmosphere') {
                opacitySpring = spring({ ...opacitySpringConfig, to: 0 }).start(
                  opacityValue
                );
              } else if (name === 'Chunk') {
                chunkValueSubscription = chunkValue.subscribe({
                  complete: () => {
                    chunk.visible = false;
                    earthPartial.visible = false;
                    earthFull.visible = true;

                    setChunkValue();
                  },
                });

                chunkSpring = spring({
                  ...chunkSpringConfig,
                  to: new Vector3(0, 0, 0),
                }).start(chunkValue);
              } else if (name !== 'EarthPartial') {
                child.visible = false;
              }
            }
          });
        };

        const updateAnimation = index => {
          const sectionAnimations = sectionRefs.current[index].animations;

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
              label.element.classList.add('earth__label--hidden');
              label.element.setAttribute('aria-hidden', true);
            }
          });

          const sectionLabels = sectionRefs.current[index].labels;

          sectionLabels.forEach(label => {
            const matches = labelElements.current.filter(item => item.text === label);
            matches.forEach(match => {
              match.element.classList.remove('earth__label--hidden');
              match.element.setAttribute('aria-hidden', false);
            });
          });
        };

        const update = () => {
          const indexRange = transform.clamp(0, sectionRefs.current.length - 1);

          const currentSectionIndex = indexRange(
            Math.floor(currentScrollY / innerHeight)
          );

          const currentTarget =
            getPositionValues(sectionRefs.current[currentSectionIndex]) || nullTarget;
          const nextTarget =
            getPositionValues(sectionRefs.current[currentSectionIndex + 1]) || nullTarget;
          const sectionScrolled =
            (currentScrollY - innerHeight * currentSectionIndex) / innerHeight;

          const scrollPercentRange = transform.clamp(0, 1);
          const scrollPercent = scrollPercentRange(sectionScrolled);
          const currentX = interpolatePosition(
            currentTarget.x,
            nextTarget.x,
            scrollPercent
          );
          const currentY = interpolatePosition(
            currentTarget.y,
            nextTarget.y,
            scrollPercent
          );
          const currentZ = interpolatePosition(
            currentTarget.z,
            nextTarget.z,
            scrollPercent
          );

          if (
            prevTarget !== currentTarget &&
            sectionRefs.current.length &&
            sectionRefs.current[currentSectionIndex]
          ) {
            updateMeshes(currentSectionIndex);
            updateAnimation(currentSectionIndex);
            updateLabels(currentSectionIndex);
          }

          prevTarget = currentTarget;

          if (
            !isEqualCameraPosition(cameraValue.current?.get(), camera.current.position)
          ) {
            cameraValue.current = value(camera.current.position, ({ x, y, z }) =>
              camera.current.position.set(x, y, z)
            );
          }

          if (reduceMotion) {
            camera.current.position.set(currentX, currentY, currentZ);
          } else {
            cameraSpring.current = spring({
              from: cameraValue.current.get(),
              to: { x: currentX, y: currentY, z: currentZ },
              velocity: cameraValue.current.getVelocity(),
              stiffness: 80,
              damping: 70,
              mass: 2,
              restSpeed: 0.001,
            }).start(cameraValue.current);
          }
        };

        requestAnimationFrame(update);
      };

      if (loaded && inViewport) {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
      }

      return () => {
        window.removeEventListener('scroll', handleScroll);
        chunkSpring?.stop();
        opacitySpring?.stop();
        cameraSpring.current?.stop();
      };
    }, [container, hideMeshes, inViewport, loaded, reduceMotion]);

    const registerSection = useCallback(section => {
      sectionRefs.current = [...sectionRefs.current, section];
    }, []);

    const unregisterSection = useCallback(section => {
      sectionRefs.current = sectionRefs.current.filter(item => item !== section);
    }, []);

    return (
      <EarthContext.Provider value={{ registerSection, unregisterSection }}>
        <div className={classNames('earth', className)} ref={container}>
          <div className="earth__viewport">
            <canvas
              className={classNames('earth__canvas', {
                'earth__canvas--visible': inViewport && loaded,
                'earth__canvas--grabbing': grabbing,
              })}
              ref={canvas}
            />
            <div className="earth__labels" aria-live="polite" ref={labelContainer} />
            <div className="earth__vignette" />
          </div>
          <div className="earth__sections">{children}</div>
        </div>
      </EarthContext.Provider>
    );
  }
);

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
        className={classNames('earth__section', className, {
          'earth__section--scrim': scrim,
          'earth__section--scrim-reverse': scrimReverse,
        })}
        ref={sectionRef}
      >
        {children}
      </div>
    );
  }
);

export default Earth;
