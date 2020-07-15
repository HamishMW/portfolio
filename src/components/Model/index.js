import React, { useRef, useEffect, useCallback, memo, useState } from 'react';
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
} from 'three';
import classNames from 'classnames';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { spring, value, chain, delay } from 'popmotion';
import { clean, loader } from 'utils/three';
import { ModelAnimationType } from './deviceModels';
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

const Model = ({ models, enableControls, cameraPosition }) => {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef();
  const containerRef = useRef();

  // Three js refs
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const controlsRef = useRef();
  const lightsRef = useRef();
  const animationFrameRef = useRef();
  const textureLoaderRef = useRef();
  const modelLoaderRef = useRef();
  const modelTweenRef = useRef();
  const cameraTweenRef = useRef();

  const render = useCallback(() => {
    rendererRef.current.render(sceneRef.current, cameraRef.current);

    controlsRef.current.update();

    // Loop animation
    animationFrameRef.current = requestAnimationFrame(render);
  }, []);

  // Handle threejs initialization and rendering
  useEffect(() => {
    // Initialize
    rendererRef.current = new WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    rendererRef.current.setPixelRatio(renderPixelRatio);
    rendererRef.current.outputEncoding = sRGBEncoding;
    rendererRef.current.physicallyCorrectLights = true;
    cameraRef.current = new PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.01,
      1000
    );
    cameraRef.current.position.set(...cameraPosition);
    sceneRef.current = new Scene();
    sceneRef.current.add(cameraRef.current);
    textureLoaderRef.current = new TextureLoader();
    modelLoaderRef.current = new GLTFLoader();

    // Orbit controls
    if (enableControls) {
      controlsRef.current = new OrbitControls(
        cameraRef.current,
        rendererRef.current.domElement
      );
      controlsRef.current.enableKeys = false;
      controlsRef.current.enablePan = true;
      controlsRef.current.enableZoom = true;
      controlsRef.current.maxDistance = 16;
      controlsRef.current.minDistance = 4;
      controlsRef.current.enableRotate = true;
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.1;
    }

    // Lighting
    const ambientLight = new AmbientLight(0xffffff, 1.2);
    const keyLight = new DirectionalLight(0xffffff, 1.1);
    const fillLight = new DirectionalLight(0xffffff, 0.8);

    ambientLight.name = LightType.Ambient;
    fillLight.name = LightType.Fill;
    keyLight.name = LightType.Key;
    fillLight.position.set(-6, 2, 2);
    keyLight.position.set(0.5, 0, 0.866);
    lightsRef.current = [ambientLight, keyLight, fillLight];
    lightsRef.current.forEach(light => cameraRef.current.add(light));

    const applyTexture = (map, node) => {
      map.encoding = sRGBEncoding;
      map.minFilter = LinearFilter;
      map.flipY = false;
      map.anisotropy = rendererRef.current.capabilities.getMaxAnisotropy();
      node.material.color = new Color(0xffffff);
      node.material.transparent = false;
      node.material.map = map;
    };

    const modelLoaders = models.map((model, index) => async () => {
      const { texture, position, url } = model;
      const loadedModel = await loader(modelLoaderRef.current, url);
      const placeholder = await loader(textureLoaderRef.current, texture.placeholder);
      sceneRef.current.add(loadedModel.scene);
      let loadFullResTexture;

      loadedModel.scene.traverse(async node => {
        if (node.material) {
          node.material.color = new Color(0x1f2025);
          node.material.color.convertSRGBToLinear();
        }

        if (node.name === MeshType.Screen) {
          applyTexture(placeholder, node);
          loadFullResTexture = async () => {
            const fullSize = await loader(textureLoaderRef.current, texture.large);
            applyTexture(fullSize, node);
          };
        }
      });

      if (model.animation === ModelAnimationType.SpringUp) {
        const startPosition = new Vector3(position.x, position.y - 1, position.z);
        const endPosition = new Vector3(position.x, position.y, position.z);
        loadedModel.scene.position.set(startPosition.x, startPosition.y, startPosition.z);

        const modelValue = value(loadedModel.scene.position, ({ x, y, z }) =>
          loadedModel.scene.position.set(x, y, z)
        );

        const animation = chain(
          delay(300 * index + 100),
          spring({ from: startPosition, to: endPosition, stiffness: 160, damping: 18 })
        );

        return { animation, modelValue, loadFullResTexture };
      }

      if (model.animation === ModelAnimationType.LaptopOpen) {
        const frameNode = loadedModel.scene.children.find(
          node => node.name === MeshType.Frame
        );

        const startRotation = { x: MathUtils.degToRad(90), y: 0, z: 0 };
        const endRotation = { x: 0, y: 0, z: 0 };
        frameNode.rotation.set(startRotation.x, startRotation.y, startRotation.z);

        const modelValue = value(frameNode.rotation, ({ x, y, z }) =>
          frameNode.rotation.set(x, y, z)
        );

        const animation = chain(
          delay(300 * index + 500),
          spring({
            from: startRotation,
            to: endRotation,
            stiffness: 100,
            damping: 10,
          })
        );

        return { animation, modelValue, loadFullResTexture };
      }

      return { loadFullResTexture };
    });

    const loadScene = async () => {
      const loadedModels = await Promise.all(
        modelLoaders.map(async loader => await loader())
      );

      setLoaded(true);

      animationFrameRef.current = requestAnimationFrame(render);

      loadedModels.forEach(async model => {
        if (model.animation) {
          model.animation.start(model.modelValue);
        }
        await model.loadFullResTexture();
      });
    };

    loadScene();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      lightsRef.current.forEach(light => light.parent.remove(light));
      clean(sceneRef.current);
      rendererRef.current.dispose();
      sceneRef.current.dispose();
      rendererRef.current.domElement = null;
      rendererRef.current.forceContextLoss();
    };
  }, [cameraPosition, enableControls, models, render]);

  return (
    <div className={classNames('model', { 'model--loaded': loaded })} ref={containerRef}>
      <canvas className="model__canvas" ref={canvasRef} />
    </div>
  );
};

export default memo(Model);
