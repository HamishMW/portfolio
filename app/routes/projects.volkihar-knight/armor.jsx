import vknx from '~/assets/volkihar-cube-nx.jpg';
import vkny from '~/assets/volkihar-cube-ny.jpg';
import vknz from '~/assets/volkihar-cube-nz.jpg';
import vkpx from '~/assets/volkihar-cube-px.jpg';
import vkpy from '~/assets/volkihar-cube-py.jpg';
import vkpz from '~/assets/volkihar-cube-pz.jpg';
import armor from '~/assets/volkihar-knight.glb';
import { Loader } from '~/components/loader';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useReducedMotion, useSpring } from 'framer-motion';
import { useInViewport } from '~/hooks';
import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import {
  ACESFilmicToneMapping,
  CubeTextureLoader,
  DirectionalLight,
  Group,
  PMREMGenerator,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  MathUtils,
  SRGBColorSpace,
} from 'three';
import { classes, cssProps, msToNum, numToMs } from '~/utils/style';
import { cleanRenderer, cleanScene, modelLoader, removeLights } from '~/utils/three';
import { throttle } from '~/utils/throttle';
import styles from './armor.module.css';

const rotationSpringConfig = {
  stiffness: 40,
  damping: 20,
  mass: 1.5,
};

export const Armor = ({
  showDelay = 0,
  cameraPosition = { x: 0, y: 0, z: 6 },
  className,
  alt,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const container = useRef();
  const canvas = useRef();
  const camera = useRef();
  const modelGroup = useRef();
  const scene = useRef();
  const renderer = useRef();
  const lights = useRef();
  const isInViewport = useInViewport(container, false, { threshold: 0.4 });
  const reduceMotion = useReducedMotion();
  const rotationX = useSpring(0, rotationSpringConfig);
  const rotationY = useSpring(0, rotationSpringConfig);

  useEffect(() => {
    const { clientWidth, clientHeight } = container.current;

    renderer.current = new WebGLRenderer({
      canvas: canvas.current,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    });

    renderer.current.setPixelRatio(2);
    renderer.current.setSize(clientWidth, clientHeight);
    renderer.current.outputColorSpace = SRGBColorSpace;
    renderer.current.toneMapping = ACESFilmicToneMapping;

    camera.current = new PerspectiveCamera(36, clientWidth / clientHeight, 0.1, 100);
    camera.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    scene.current = new Scene();

    const cubeTextureLoader = new CubeTextureLoader();
    modelGroup.current = new Group();
    scene.current.add(modelGroup.current);

    const pmremGenerator = new PMREMGenerator(renderer.current);
    pmremGenerator.compileCubemapShader();

    // Lighting
    const keyLight = new DirectionalLight(0xffffff, 2.6);
    const fillLight = new DirectionalLight(0xffffff, 1.0);
    const backLight = new DirectionalLight(0xffffff, 1.3);

    keyLight.position.set(1, 0.1, 2);
    fillLight.position.set(-1, 0.1, 8);
    backLight.position.set(-2, 2, -3);
    lights.current = [backLight, keyLight, fillLight];
    lights.current.forEach(light => scene.current.add(light));

    const load = async () => {
      const loadGltf = modelLoader.loadAsync(armor);
      const loadEnv = cubeTextureLoader.loadAsync([vknx, vkny, vknz, vkpx, vkpy, vkpz]);

      const [gltf, envTexture] = await Promise.all([loadGltf, loadEnv]);

      modelGroup.current.add(gltf.scene);
      gltf.scene.rotation.y = MathUtils.degToRad(180);
      gltf.scene.position.y = -1.6;

      const { texture } = pmremGenerator.fromCubemap(envTexture);
      scene.current.environment = texture;
      pmremGenerator.dispose();

      await renderer.current.initTexture(scene.current.environment);

      modelGroup.current.traverse(async node => {
        if (node.material) {
          await renderer.current.initTexture(node.material);
        }
      });

      setLoaded(true);
      renderFrame();
    };

    startTransition(() => {
      load();

      setTimeout(() => {
        setLoaderVisible(true);
      }, 1000);
    });

    const unsubscribeX = rotationX.on('change', value => {
      modelGroup.current.rotation.x = value;
      renderFrame();
    });

    const unsubscribeY = rotationY.on('change', value => {
      modelGroup.current.rotation.y = value;
      renderFrame();
    });

    return () => {
      removeLights(lights.current);
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
      unsubscribeX();
      unsubscribeY();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle render passes for a single frame
  const renderFrame = useCallback(() => {
    renderer.current.render(scene.current, camera.current);
  }, []);

  // Handle mouse move animation
  useEffect(() => {
    const onMouseMove = throttle(event => {
      const { innerWidth, innerHeight } = window;

      const position = {
        x: (event.clientX - innerWidth / 2) / innerWidth,
        y: (event.clientY - innerHeight / 2) / innerHeight,
      };

      rotationX.set(position.y / 2);
      rotationY.set(position.x / 2);
    }, 100);

    if (isInViewport) {
      setVisible(true);
    }

    if (isInViewport && !reduceMotion) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isInViewport, reduceMotion, rotationX, rotationY]);

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
      className={classes(styles.armor, className)}
      ref={container}
      role="img"
      aria-label={alt}
      {...rest}
    >
      <Transition
        unmount
        in={!loaded && loaderVisible}
        timeout={msToNum(tokens.base.durationL)}
      >
        {({ visible }) => <Loader className={styles.loader} data-visible={visible} />}
      </Transition>
      <canvas
        className={styles.canvas}
        ref={canvas}
        data-loaded={loaded && visible}
        style={cssProps({ delay: numToMs(showDelay) })}
      />
    </div>
  );
};
