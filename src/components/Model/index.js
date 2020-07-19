import React, { useEffect, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import {
  sRGBEncoding,
  LinearFilter,
  Color,
  TextureLoader,
  Vector3,
  MathUtils,
  Group,
  AmbientLight,
  DirectionalLight,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  WebGLRenderTarget,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  OrthographicCamera,
  CameraHelper,
  MeshDepthMaterial,
  ShaderMaterial,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { delay, chain, spring, value } from 'popmotion';
import { getImageFromSrcSet } from 'utils/image';
import { useInViewport, usePrefersReducedMotion } from 'hooks';
import { cleanScene, renderPixelRatio } from 'utils/three';
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

const Shadow = ({
  models,
  show = true,
  showDelay = 0,
  cameraPosition = { x: -1, y: 0, z: 0 },
  enableControls,
  style,
  className,
  alt,
  ...rest
}) => {
  const [modelData, setModelData] = useState();
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef();
  const canvas = useRef();
  const camera = useRef();
  const textureLoader = useRef();
  const modelLoader = useRef();
  const modelGroup = useRef();
  const scene = useRef();
  const renderer = useRef();
  const shadowGroup = useRef();
  const renderTarget = useRef();
  const renderTargetBlur = useRef();
  const shadowCamera = useRef();
  const cameraHelper = useRef();
  const depthMaterial = useRef();
  const horizontalBlurMaterial = useRef();
  const verticalBlurMaterial = useRef();
  const plane = useRef();
  const lights = useRef();
  const blurPlane = useRef();
  const fillPlane = useRef();
  const rotationSpring = useRef();
  const rotationSpringValue = useRef();
  const isInViewport = useInViewport(containerRef);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const { innerHeight, innerWidth } = window;

    renderer.current = new WebGLRenderer({
      canvas: canvas.current,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.current.setPixelRatio(renderPixelRatio);
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.outputEncoding = sRGBEncoding;
    renderer.current.physicallyCorrectLights = true;

    camera.current = new PerspectiveCamera(36, innerWidth / innerHeight, 0.1, 100);
    camera.current.position.set(...cameraPosition);
    scene.current = new Scene();

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
    lights.current.forEach(light => scene.current.add(light));

    // the container, if you need to move the plane just move this
    shadowGroup.current = new Group();
    scene.current.add(shadowGroup.current);
    shadowGroup.current.position.set(0, 0, -0.8);
    shadowGroup.current.rotateX(Math.PI / 2);

    const renderTargetSize = 512;
    const planeWidth = 8;
    const planeHeight = 8;
    const cameraHeight = 1.5;
    const shadowOpacity = 0.8;
    const shadowDarkness = 3;

    // the render target that will show the shadows in the plane texture
    renderTarget.current = new WebGLRenderTarget(renderTargetSize, renderTargetSize);
    renderTarget.current.texture.generateMipmaps = false;

    // the render target that we will use to blur the first render target
    renderTargetBlur.current = new WebGLRenderTarget(renderTargetSize, renderTargetSize);
    renderTargetBlur.current.texture.generateMipmaps = false;

    // make a plane and make it face up
    const planeGeometry = new PlaneBufferGeometry(planeWidth, planeHeight).rotateX(
      Math.PI / 2
    );

    const material1 = new MeshBasicMaterial({
      map: renderTarget.current.texture,
      opacity: 1,
      transparent: true,
    });

    plane.current = new Mesh(planeGeometry, material1);
    // the y from the texture is flipped!
    plane.current.scale.y = -1;
    plane.current.material.opacity = shadowOpacity;
    shadowGroup.current.add(plane.current);

    // the plane onto which to blur the texture
    blurPlane.current = new Mesh(planeGeometry);
    blurPlane.current.visible = false;
    shadowGroup.current.add(blurPlane.current);

    // the plane with the color of the ground
    const material2 = new MeshBasicMaterial({
      color: 0xffffff,
      opacity: 1,
      transparent: true,
    });

    fillPlane.current = new Mesh(planeGeometry, material2);
    fillPlane.current.rotateX(Math.PI);
    fillPlane.current.position.y -= 0.00001;
    fillPlane.current.material.opacity = 0;
    shadowGroup.current.add(fillPlane.current);

    // the camera to render the depth material from
    shadowCamera.current = new OrthographicCamera(
      -planeWidth / 2,
      planeWidth / 2,
      planeHeight / 2,
      -planeHeight / 2,
      0,
      cameraHeight
    );
    shadowCamera.current.rotation.x = Math.PI / 2; // get the camera to look up
    shadowGroup.current.add(shadowCamera.current);

    cameraHelper.current = new CameraHelper(shadowCamera.current);

    // like MeshDepthMaterial, but goes from black to transparent
    depthMaterial.current = new MeshDepthMaterial();
    depthMaterial.current.userData.darkness = { value: shadowDarkness };
    depthMaterial.current.onBeforeCompile = shader => {
      shader.uniforms.darkness = depthMaterial.current.userData.darkness;
      shader.fragmentShader = `
        uniform float darkness;
        ${shader.fragmentShader.replace(
          'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
          'gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );'
        )}
      `;
    };
    depthMaterial.current.depthTest = false;
    depthMaterial.current.depthWrite = false;

    horizontalBlurMaterial.current = new ShaderMaterial(HorizontalBlurShader);
    horizontalBlurMaterial.current.depthTest = false;

    verticalBlurMaterial.current = new ShaderMaterial(VerticalBlurShader);
    verticalBlurMaterial.current.depthTest = false;

    const applyScreenTexture = (map, node) => {
      map.encoding = sRGBEncoding;
      map.minFilter = LinearFilter;
      map.magFilter = LinearFilter;
      map.flipY = false;
      map.anisotropy = renderer.current.capabilities.getMaxAnisotropy();
      map.generateMipmaps = false;
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
          renderFrame();
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

        loadedModel.scene.position.set(
          model.position.x,
          model.position.y,
          model.position.z
        );

        const startRotation = { x: MathUtils.degToRad(90), y: 0, z: 0 };
        const endRotation = { x: 0, y: 0, z: 0 };
        const initRotation = prefersReducedMotion ? endRotation : startRotation;

        frameNode.rotation.set(initRotation.x, initRotation.y, initRotation.z);

        const modelValue = value(frameNode.rotation, ({ x, y, z }) => {
          frameNode.rotation.set(x, y, z);
          renderFrame();
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

    setModelData(modelConfigs);

    if (enableControls) {
      new OrbitControls(camera.current, renderer.current.domElement);
    }

    return () => {
      lights.current.forEach(light => light.parent.remove(light));
      cleanScene(scene.current);
      renderer.current.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blurShadow = useCallback(amount => {
    blurPlane.current.visible = true;

    // blur horizontally and draw in the renderTargetBlur
    blurPlane.current.material = horizontalBlurMaterial.current;
    blurPlane.current.material.uniforms.tDiffuse.value = renderTarget.current.texture;
    horizontalBlurMaterial.current.uniforms.h.value = amount * (1 / 256);

    renderer.current.setRenderTarget(renderTargetBlur.current);
    renderer.current.render(blurPlane.current, shadowCamera.current);

    // blur vertically and draw in the main renderTarget
    blurPlane.current.material = verticalBlurMaterial.current;
    blurPlane.current.material.uniforms.tDiffuse.value = renderTargetBlur.current.texture;
    verticalBlurMaterial.current.uniforms.v.value = amount * (1 / 256);

    renderer.current.setRenderTarget(renderTarget.current);
    renderer.current.render(blurPlane.current, shadowCamera.current);

    blurPlane.current.visible = false;
  }, []);

  const renderFrame = useCallback(() => {
    const blurAmount = 5;

    // remove the background
    const initialBackground = scene.current.background;
    scene.current.background = null;

    // force the depthMaterial to everything
    // cameraHelper.visible = false;
    scene.current.overrideMaterial = depthMaterial.current;

    // render to the render target to get the depths
    renderer.current.setRenderTarget(renderTarget.current);
    renderer.current.render(scene.current, shadowCamera.current);

    // and reset the override material
    scene.current.overrideMaterial = null;
    // cameraHelper.visible = true;

    blurShadow(blurAmount);

    // a second pass to reduce the artifacts
    // (0.4 is the minimum blur amout so that the artifacts are gone)
    blurShadow(blurAmount * 0.4);

    // reset and render the normal scene
    renderer.current.setRenderTarget(null);
    scene.current.background = initialBackground;

    renderer.current.render(scene.current, camera.current);
  }, [blurShadow]);

  useEffect(() => {
    let introSprings = [];

    if (!show || !modelData) return;

    const loadScene = async () => {
      const loadedModels = await Promise.all(modelData);
      scene.current.add(modelGroup.current);

      setLoaded(true);

      const handleModelLoad = loadedModels.map(async model => {
        // Start animation
        if (model.animation) {
          const modelAnimation = model.animation.start(model.modelValue);
          introSprings.push(modelAnimation);
        }

        // Load full res screen texture
        await model.loadFullResTexture();
      });

      await Promise.all(handleModelLoad);
    };

    loadScene();

    return () => {
      for (const spring of introSprings) {
        spring.stop();
      }
    };
  }, [modelData, renderFrame, show]);

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
            renderFrame();
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
  }, [isInViewport, prefersReducedMotion, renderFrame]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const { clientWidth, clientHeight } = containerRef.current;

      renderer.current.setSize(clientWidth, clientHeight);
      camera.current.aspect = clientWidth / clientHeight;
      camera.current.updateProjectionMatrix();

      renderFrame();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return function cleanup() {
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrame]);

  return (
    <div
      className={classNames('model', { 'model--loaded': loaded }, className)}
      style={{ '--delay': `${showDelay}ms`, ...style }}
      ref={containerRef}
      role="img"
      aria-label={alt}
      {...rest}
    >
      <canvas className="model__canvas" ref={canvas} />
    </div>
  );
};

export default Shadow;
