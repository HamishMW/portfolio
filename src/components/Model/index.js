import React, { useRef, useEffect, memo, useState } from 'react';
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  sRGBEncoding,
  Color,
  TextureLoader,
  LinearFilter,
  Vector3,
  MathUtils,
  Group,
} from 'three';
import classNames from 'classnames';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { spring, value, chain, delay } from 'popmotion';
import { cleanScene } from 'utils/three';
import { ModelAnimationType } from './deviceModels';
import { useInViewport, usePrefersReducedMotion } from 'hooks';
import { getImageFromSrcSet } from 'utils/image';
import './index.css';

const MeshType = {
  Frame: 'Frame',
  Logo: 'Logo',
  Screen: 'Screen',
};

const LightType = {
  Ambient: 'ambient',
  Key: 'key',
  Fill: 'fill',
};

const renderPixelRatio = Math.max(window.devicePixelRatio, 2);

const Model = ({
  className,
  style,
  models,
  alt,
  cameraPosition,
  show = true,
  showDelay = 0,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [modelData, setModelData] = useState();
  const canvasRef = useRef();
  const containerRef = useRef();
  const scene = useRef();
  const camera = useRef();
  const renderer = useRef();
  const lights = useRef();
  const textureLoader = useRef();
  const modelLoader = useRef();
  const modelGroup = useRef();
  const rotationSpring = useRef();
  const rotationSpringValue = useRef();
  const isInViewport = useInViewport(containerRef);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Handle loading and rendering
  useEffect(() => {
    const { clientWidth, clientHeight } = containerRef.current;

    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.current.setSize(clientWidth, clientHeight);
    renderer.current.setPixelRatio(renderPixelRatio);
    renderer.current.outputEncoding = sRGBEncoding;
    renderer.current.physicallyCorrectLights = true;

    camera.current = new PerspectiveCamera(36, clientWidth / clientHeight, 0.01, 100);
    camera.current.position.set(...cameraPosition);

    scene.current = new Scene();
    scene.current.add(camera.current);

    textureLoader.current = new TextureLoader();
    modelLoader.current = new GLTFLoader();
    modelGroup.current = new Group();

    // Lighting
    const ambientLight = new AmbientLight(0xffffff, 1.2);
    const keyLight = new DirectionalLight(0xffffff, 1.1);
    const fillLight = new DirectionalLight(0xffffff, 0.8);

    ambientLight.name = LightType.Ambient;
    fillLight.name = LightType.Fill;
    keyLight.name = LightType.Key;
    fillLight.position.set(-6, 2, 2);
    keyLight.position.set(0.5, 0, 0.866);
    lights.current = [ambientLight, keyLight, fillLight];
    lights.current.forEach(light => camera.current.add(light));

    const applyScreenTexture = (map, node) => {
      map.encoding = sRGBEncoding;
      map.minFilter = LinearFilter;
      map.flipY = false;
      map.anisotropy = renderer.current.capabilities.getMaxAnisotropy();
      node.material.color = new Color(0xffffff);
      node.material.transparent = false;
      node.material.map = map;
    };

    const modelConfigs = models.map(async (model, index) => {
      const { texture, position, url } = model;
      const loadedModel = await modelLoader.current.loadAsync(url);
      const placeholder = await textureLoader.current.loadAsync(texture.placeholder);

      modelGroup.current.add(loadedModel.scene);

      let loadFullResTexture;

      loadedModel.scene.traverse(async node => {
        if (node.material) {
          node.material.color = new Color(0x1f2025);
          node.material.color.convertSRGBToLinear();
        }

        if (node.name === MeshType.Screen) {
          applyScreenTexture(placeholder, node);
          loadFullResTexture = async () => {
            const image = await getImageFromSrcSet(texture);
            const fullSize = await textureLoader.current.loadAsync(image);
            applyScreenTexture(fullSize, node);
          };
        }
      });

      if (model.animation === ModelAnimationType.SpringUp) {
        const startPosition = new Vector3(position.x, position.y - 1, position.z);
        const endPosition = new Vector3(position.x, position.y, position.z);
        const initPosition = prefersReducedMotion ? endPosition : startPosition;

        loadedModel.scene.position.set(initPosition.x, initPosition.y, initPosition.z);

        const modelValue = value(loadedModel.scene.position, ({ x, y, z }) => {
          loadedModel.scene.position.set(x, y, z);
          renderer.current.render(scene.current, camera.current);
        });

        const animation = chain(
          delay(300 * index + showDelay * 0.6),
          spring({
            from: startPosition,
            to: endPosition,
            stiffness: 60,
            damping: 16,
            restSpeed: 0.0001,
          })
        );

        return {
          animation: prefersReducedMotion ? undefined : animation,
          modelValue,
          loadFullResTexture,
        };
      }

      if (model.animation === ModelAnimationType.LaptopOpen) {
        const frameNode = loadedModel.scene.children.find(
          node => node.name === MeshType.Frame
        );

        const startRotation = { x: MathUtils.degToRad(90), y: 0, z: 0 };
        const endRotation = { x: 0, y: 0, z: 0 };
        const initRotation = prefersReducedMotion ? endRotation : startRotation;

        frameNode.rotation.set(initRotation.x, initRotation.y, initRotation.z);

        const modelValue = value(frameNode.rotation, ({ x, y, z }) => {
          frameNode.rotation.set(x, y, z);
          renderer.current.render(scene.current, camera.current);
        });

        const animation = chain(
          delay(300 * index + showDelay),
          spring({
            from: startRotation,
            to: endRotation,
            stiffness: 50,
            damping: 14,
            restSpeed: 0.0001,
          })
        );

        return {
          animation: prefersReducedMotion ? undefined : animation,
          modelValue,
          loadFullResTexture,
        };
      }

      return { loadFullResTexture };
    });

    scene.current.add(modelGroup.current);

    setModelData(modelConfigs);

    return () => {
      lights.current.forEach(light => light.parent.remove(light));
      cleanScene(scene.current);
      renderer.current.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let introSprings = [];

    if (!show || !modelData) return;

    const loadScene = async () => {
      const loadedModels = await Promise.all(modelData);

      setLoaded(true);

      const handleModelLoad = loadedModels.map(async model => {
        // Start animation
        if (model.animation) {
          const modelAnimation = model.animation.start(model.modelValue);
          introSprings.push(modelAnimation);
        }

        // Load full res screen texture
        await model.loadFullResTexture();

        requestAnimationFrame(() => {
          renderer.current.render(scene.current, camera.current);
        });
      });

      await Promise.all(handleModelLoad);
    };

    loadScene();

    return () => {
      for (const spring of introSprings) {
        spring.stop();
      }
    };
  }, [modelData, show]);

  // Handle mouse move animation
  useEffect(() => {
    const onMouseMove = event => {
      const { rotation } = modelGroup.current;
      const { innerWidth, innerHeight } = window;

      const position = {
        x: (event.clientX - innerWidth / 2) / innerWidth,
        y: (event.clientY - innerHeight / 2) / innerHeight,
      };

      if (!rotationSpringValue.current) {
        rotationSpringValue.current = value(
          { x: rotation.x, y: rotation.y },
          ({ x, y }) => {
            rotation.set(x, y, rotation.z);
            renderer.current.render(scene.current, camera.current);
          }
        );
      }

      rotationSpring.current = spring({
        from: rotationSpringValue.current.get(),
        to: { x: position.y / 2, y: position.x / 2 },
        stiffness: 40,
        damping: 40,
        velocity: rotationSpringValue.current.getVelocity(),
        restSpeed: 0.00001,
        mass: 1.4,
      }).start(rotationSpringValue.current);
    };

    if (isInViewport && !prefersReducedMotion) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return function cleanup() {
      window.removeEventListener('mousemove', onMouseMove);

      if (rotationSpring.current) {
        rotationSpring.current.stop();
      }
    };
  }, [isInViewport, prefersReducedMotion]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const { clientWidth, clientHeight } = containerRef.current;
      renderer.current.setSize(clientWidth, clientHeight);
      camera.current.aspect = clientWidth / clientHeight;
      camera.current.updateProjectionMatrix();

      requestAnimationFrame(() => {
        renderer.current.render(scene.current, camera.current);
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return function cleanup() {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={classNames('model', { 'model--loaded': loaded }, className)}
      style={{ '--delay': `${showDelay}ms`, ...style }}
      ref={containerRef}
      role="img"
      aria-label={alt}
      {...rest}
    >
      <canvas className="model__canvas" ref={canvasRef} />
    </div>
  );
};

export default memo(Model);
