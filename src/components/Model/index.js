import React, { useRef, useEffect, useCallback, memo } from 'react';
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
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Easing, Tween, update as updateTween, remove as removeTween } from 'es6-tween';
import { clean } from 'utils/three';
import './index.css';

const MeshTypes = {
  frame: 'Frame',
  logo: 'Logo',
  screen: 'Screen',
};

const LightTypes = {
  ambient: 'ambient',
  key: 'key',
  fill: 'fill',
};

const renderPixelRatio = Math.max(window.devicePixelRatio, 2);

const Model = ({ models, enableControls, cameraPosition }) => {
  const canvasRef = useRef();
  const containerRef = useRef();

  // Three js refs
  const modelRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const controlsRef = useRef();
  const lightsRef = useRef();
  const animationFrameRef = useRef();
  const modelTweenRef = useRef();
  const cameraTweenRef = useRef();

  const render = useCallback(() => {
    rendererRef.current.render(sceneRef.current, cameraRef.current);

    controlsRef.current.update();

    // Loop animation
    animationFrameRef.current = requestAnimationFrame(render);
    updateTween();
  }, []);

  // Handle threejs initialization and rendering
  useEffect(() => {
    const loader = new GLTFLoader();

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

    ambientLight.name = LightTypes.Ambient;
    fillLight.name = LightTypes.Fill;
    keyLight.name = LightTypes.Key;
    fillLight.position.set(-6, 2, 2);
    keyLight.position.set(0.5, 0, 0.866);
    lightsRef.current = [ambientLight, keyLight, fillLight];
    lightsRef.current.forEach(light => cameraRef.current.add(light));

    models.forEach(model => {
      const { texture, position, url } = model;
      const textureLoader = new TextureLoader();

      loader.load(url, gltf => {
        modelRef.current = gltf;
        sceneRef.current.add(modelRef.current.scene);

        modelRef.current.scene.traverse(node => {
          console.log(node);
          if (node.material) {
            node.material.color = new Color(0x1f2025);
            node.material.color.convertSRGBToLinear();
          }

          if (node.name === 'Screen') {
            textureLoader.load(texture, map => {
              map.encoding = sRGBEncoding;
              map.minFilter = LinearFilter;
              map.flipY = false;
              map.anisotropy = rendererRef.current.capabilities.getMaxAnisotropy();
              node.material.color = new Color(0xffffff);
              node.material.transparent = false;
              node.material.map = map;
              console.log(node.material);
            });
          }
        });

        modelRef.current.scene.position.set(position.x, position.y, position.z);
        animationFrameRef.current = requestAnimationFrame(render);
      });
    });

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
    <div className="model" ref={containerRef}>
      <canvas className="model__canvas" ref={canvasRef} />
    </div>
  );
};

export default memo(Model);
