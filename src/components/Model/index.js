import { useEffect, useCallback, useRef, useState } from 'react';
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
  MeshDepthMaterial,
  ShaderMaterial,
} from 'three';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { delay, chain, spring, value } from 'popmotion';
import { getImageFromSrcSet } from 'utils/image';
import { useInViewport, usePrefersReducedMotion } from 'hooks';
import { cleanScene, cleanRenderer, removeLights } from 'utils/three';
import { ModelAnimationType } from './deviceModels';
import { numToMs } from 'utils/style';
import './index.css';

const MeshType = {
  Frame: 'Frame',
  Logo: 'Logo',
  Screen: 'Screen',
};

const Model = ({
  models,
  show = true,
  showDelay = 0,
  cameraPosition = { x: 0, y: 0, z: 8 },
  enableControls,
  style,
  className,
  alt,
  ...rest
}) => {
  const [modelData, setModelData] = useState();
  const [loaded, setLoaded] = useState(false);
  const container = useRef();
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
  const depthMaterial = useRef();
  const horizontalBlurMaterial = useRef();
  const verticalBlurMaterial = useRef();
  const plane = useRef();
  const lights = useRef();
  const blurPlane = useRef();
  const fillPlane = useRef();
  const isInViewport = useInViewport(container, false, { threshold: 0.4 });
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const { clientWidth, clientHeight } = container.current;

    renderer.current = new WebGLRenderer({
      canvas: canvas.current,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });

    renderer.current.setPixelRatio(2);
    renderer.current.setSize(clientWidth, clientHeight);
    renderer.current.outputEncoding = sRGBEncoding;
    renderer.current.physicallyCorrectLights = true;

    camera.current = new PerspectiveCamera(36, clientWidth / clientHeight, 0.1, 100);
    camera.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    scene.current = new Scene();

    textureLoader.current = new TextureLoader();
    modelLoader.current = new GLTFLoader();
    modelGroup.current = new Group();

    // Lighting
    const ambientLight = new AmbientLight(0xffffff, 1.2);
    const keyLight = new DirectionalLight(0xffffff, 1.1);
    const fillLight = new DirectionalLight(0xffffff, 0.8);

    fillLight.position.set(-6, 2, 2);
    keyLight.position.set(0.5, 0, 0.866);
    lights.current = [ambientLight, keyLight, fillLight];
    lights.current.forEach(light => scene.current.add(light));

    // The shadow container, if you need to move the plane just move this
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

    // The render target that will show the shadows in the plane texture
    renderTarget.current = new WebGLRenderTarget(renderTargetSize, renderTargetSize);
    renderTarget.current.texture.generateMipmaps = false;

    // The render target that we will use to blur the first render target
    renderTargetBlur.current = new WebGLRenderTarget(renderTargetSize, renderTargetSize);
    renderTargetBlur.current.texture.generateMipmaps = false;

    // Make a plane and make it face up
    const planeGeometry = new PlaneBufferGeometry(planeWidth, planeHeight).rotateX(
      Math.PI / 2
    );

    const planeMaterial = new MeshBasicMaterial({
      map: renderTarget.current.texture,
      opacity: shadowOpacity,
      transparent: true,
    });

    plane.current = new Mesh(planeGeometry, planeMaterial);
    // The y from the texture is flipped!
    plane.current.scale.y = -1;
    shadowGroup.current.add(plane.current);

    // The plane onto which to blur the texture
    blurPlane.current = new Mesh(planeGeometry);
    blurPlane.current.visible = false;
    shadowGroup.current.add(blurPlane.current);

    // The plane with the color of the ground
    const fillMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0,
      transparent: true,
    });

    fillPlane.current = new Mesh(planeGeometry, fillMaterial);
    fillPlane.current.rotateX(Math.PI);
    fillPlane.current.position.y -= 0.00001;
    shadowGroup.current.add(fillPlane.current);

    // The camera to render the depth material from
    shadowCamera.current = new OrthographicCamera(
      -planeWidth / 2,
      planeWidth / 2,
      planeHeight / 2,
      -planeHeight / 2,
      0,
      cameraHeight
    );
    // Get the camera to look up
    shadowCamera.current.rotation.x = Math.PI / 2;
    shadowGroup.current.add(shadowCamera.current);

    // Like MeshDepthMaterial, but goes from black to transparent
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

    const applyScreenTexture = async (texture, node) => {
      texture.encoding = sRGBEncoding;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.flipY = false;
      texture.anisotropy = renderer.current.capabilities.getMaxAnisotropy();
      texture.generateMipmaps = false;

      // Decode the texture to prevent jank on first render
      await renderer.current.initTexture(texture);

      node.material.color = new Color(0xffffff);
      node.material.transparent = false;
      node.material.map = texture;
    };

    // Build an array of promises to fetch and apply models & animations
    const modelConfigPromises = models.map(async (model, index) => {
      const { texture, position, url } = model;
      let loadFullResTexture;

      const [gltf, placeholder] = await Promise.all([
        await modelLoader.current.loadAsync(url),
        await textureLoader.current.loadAsync(texture.placeholder),
      ]);

      gltf.scene.traverse(async node => {
        if (node.material) {
          node.material.color = new Color(0x1f2025);
          node.material.color.convertSRGBToLinear();
        }

        if (node.name === MeshType.Screen) {
          applyScreenTexture(placeholder, node);
          loadFullResTexture = async () => {
            const image = await getImageFromSrcSet(texture);
            const fullSize = await textureLoader.current.loadAsync(image);
            await applyScreenTexture(fullSize, node);
          };
        }
      });

      modelGroup.current.add(gltf.scene);

      const animation = getModelAnimation({
        model,
        gltf,
        position,
        reduceMotion,
        renderFrame,
        index,
        showDelay,
      });

      return { ...animation, loadFullResTexture };
    });

    setModelData(modelConfigPromises);

    return () => {
      removeLights(lights.current);
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blurShadow = useCallback(amount => {
    blurPlane.current.visible = true;

    // Blur horizontally and draw in the renderTargetBlur
    blurPlane.current.material = horizontalBlurMaterial.current;
    blurPlane.current.material.uniforms.tDiffuse.value = renderTarget.current.texture;
    horizontalBlurMaterial.current.uniforms.h.value = amount * (1 / 256);

    renderer.current.setRenderTarget(renderTargetBlur.current);
    renderer.current.render(blurPlane.current, shadowCamera.current);

    // Blur vertically and draw in the main renderTarget
    blurPlane.current.material = verticalBlurMaterial.current;
    blurPlane.current.material.uniforms.tDiffuse.value = renderTargetBlur.current.texture;
    verticalBlurMaterial.current.uniforms.v.value = amount * (1 / 256);

    renderer.current.setRenderTarget(renderTarget.current);
    renderer.current.render(blurPlane.current, shadowCamera.current);

    blurPlane.current.visible = false;
  }, []);

  // Handle render passes for a single frame
  const renderFrame = useCallback(() => {
    const blurAmount = 5;

    // Remove the background
    const initialBackground = scene.current.background;
    scene.current.background = null;

    // Force the depthMaterial to everything
    // cameraHelper.visible = false;
    scene.current.overrideMaterial = depthMaterial.current;

    // Render to the render target to get the depths
    renderer.current.setRenderTarget(renderTarget.current);
    renderer.current.render(scene.current, shadowCamera.current);

    // And reset the override material
    scene.current.overrideMaterial = null;

    blurShadow(blurAmount);

    // A second pass to reduce the artifacts
    // (0.4 is the minimum blur amout so that the artifacts are gone)
    blurShadow(blurAmount * 0.4);

    // Reset and render the normal scene
    renderer.current.setRenderTarget(null);
    scene.current.background = initialBackground;

    renderer.current.render(scene.current, camera.current);
  }, [blurShadow]);

  useEffect(() => {
    let introSprings = [];

    if (!modelData) return;

    scene.current.add(modelGroup.current);

    const loadScene = async () => {
      const loadedModels = await Promise.all(modelData);

      setLoaded(true);

      const handleModelLoad = loadedModels.map(async model => {
        // Start animation
        if (model.animation) {
          const modelAnimation = model.animation.start(model.modelValue);
          introSprings.push(modelAnimation);
        }

        if (reduceMotion) {
          renderFrame();
        }

        // Load full res screen texture
        await model.loadFullResTexture();

        // Render the loaded texture
        if (reduceMotion) {
          renderFrame();
        }
      });

      await Promise.all(handleModelLoad);
    };

    if (show) {
      loadScene();
    }

    return () => {
      for (const spring of introSprings) {
        spring.stop();
      }
    };
  }, [modelData, reduceMotion, renderFrame, show]);

  // Handle mouse move animation
  useEffect(() => {
    let rotationSpring;
    let rotationSpringValue;

    const onMouseMove = event => {
      const { rotation } = modelGroup.current;
      const { innerWidth, innerHeight } = window;

      const position = {
        x: (event.clientX - innerWidth / 2) / innerWidth,
        y: (event.clientY - innerHeight / 2) / innerHeight,
      };

      if (!rotationSpringValue) {
        rotationSpringValue = value({ x: rotation.x, y: rotation.y }, ({ x, y }) => {
          rotation.set(x, y, rotation.z);
          renderFrame();
        });
      }

      rotationSpring = spring({
        from: rotationSpringValue.get(),
        to: { x: position.y / 2, y: position.x / 2 },
        stiffness: 40,
        damping: 40,
        velocity: rotationSpringValue.getVelocity(),
        restSpeed: 0.00001,
        mass: 1.4,
      }).start(rotationSpringValue);
    };

    if (isInViewport && !reduceMotion) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      rotationSpring?.stop();
    };
  }, [isInViewport, reduceMotion, renderFrame]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!container.current) return;

      const { clientWidth, clientHeight } = container.current;

      renderer.current.setSize(clientWidth, clientHeight);
      camera.current.aspect = clientWidth / clientHeight;
      camera.current.updateProjectionMatrix();

      renderFrame();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrame]);

  return (
    <div
      className={classNames('model', { 'model--loaded': loaded }, className)}
      style={{ '--delay': numToMs(showDelay), ...style }}
      ref={container}
      role="img"
      aria-label={alt}
      {...rest}
    >
      <canvas className="model__canvas" ref={canvas} />
    </div>
  );
};

// Get custom model animation
function getModelAnimation({ model, gltf, reduceMotion, renderFrame, index, showDelay }) {
  const positionVector = new Vector3(
    model.position.x,
    model.position.y,
    model.position.z
  );

  if (reduceMotion) {
    gltf.scene.position.set(...positionVector.toArray());
    return;
  }

  // Simple slide up animation
  if (model.animation === ModelAnimationType.SpringUp) {
    const startPosition = new Vector3(
      positionVector.x,
      positionVector.y - 1,
      positionVector.z
    );
    const endPosition = positionVector;

    gltf.scene.position.set(...startPosition.toArray());

    const modelValue = value(gltf.scene.position, ({ x, y, z }) => {
      gltf.scene.position.set(x, y, z);
      renderFrame();
    });

    const animation = chain(
      delay(300 * index + showDelay * 0.6),
      spring({
        from: startPosition,
        to: endPosition,
        stiffness: 60,
        damping: 16,
        restSpeed: 0.001,
      })
    );

    return { animation, modelValue };
  }

  // Laptop open animation
  if (model.animation === ModelAnimationType.LaptopOpen) {
    const frameNode = gltf.scene.children.find(node => node.name === MeshType.Frame);
    const startRotation = new Vector3(MathUtils.degToRad(90), 0, 0);
    const endRotation = new Vector3(0, 0, 0);

    gltf.scene.position.set(...positionVector.toArray());
    frameNode.rotation.set(...startRotation.toArray());

    const modelValue = value(frameNode.rotation, ({ x, y, z }) => {
      frameNode.rotation.set(x, y, z);
      renderFrame();
    });

    const animation = chain(
      delay(300 * index + showDelay + 200),
      spring({
        from: startRotation,
        to: endRotation,
        stiffness: 50,
        damping: 14,
        restSpeed: 0.001,
      })
    );

    return { animation, modelValue };
  }
}

export default Model;
