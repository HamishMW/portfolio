import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  Vector2,
  sRGBEncoding,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  DirectionalLight,
  AmbientLight,
  UniformsUtils,
  UniformsLib,
  MeshPhongMaterial,
  SphereBufferGeometry,
  Mesh,
  Color,
} from 'three';
import { spring, value } from 'popmotion';
import vertShader from './sphereVertShader';
import fragShader from './sphereFragShader';
import { Transition } from 'react-transition-group';
import { useTheme } from 'components/ThemeProvider';
import { usePrefersReducedMotion, useInViewport, useWindowSize } from 'hooks';
import { reflow } from 'utils/transition';
import { media, rgbToThreeColor } from 'utils/style';
import { cleanScene, removeLights, cleanRenderer } from 'utils/three';
import './DisplacementSphere.css';

const DisplacementSphere = props => {
  const theme = useTheme();
  const { rgbBackground, themeId, colorWhite } = theme;
  const start = useRef(Date.now());
  const canvasRef = useRef();
  const mouse = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const lights = useRef();
  const uniforms = useRef();
  const material = useRef();
  const geometry = useRef();
  const sphere = useRef();
  const tweenRef = useRef();
  const sphereSpring = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(canvasRef);
  const windowSize = useWindowSize();

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    mouse.current = new Vector2(0.8, 0.5);
    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.current.setSize(innerWidth, innerHeight);
    renderer.current.setPixelRatio(1);
    renderer.current.outputEncoding = sRGBEncoding;

    camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
    camera.current.position.z = 52;

    scene.current = new Scene();

    material.current = new MeshPhongMaterial();
    material.current.onBeforeCompile = shader => {
      uniforms.current = UniformsUtils.merge([
        UniformsLib['ambient'],
        UniformsLib['lights'],
        shader.uniforms,
        { time: { type: 'f', value: 0 } },
      ]);

      shader.uniforms = uniforms.current;
      shader.vertexShader = vertShader;
      shader.fragmentShader = fragShader;
    };

    geometry.current = new SphereBufferGeometry(32, 128, 128);

    sphere.current = new Mesh(geometry.current, material.current);
    sphere.current.position.z = 0;
    sphere.current.modifier = Math.random();
    scene.current.add(sphere.current);

    return () => {
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
  }, []);

  useEffect(() => {
    const dirLight = new DirectionalLight(colorWhite, 0.6);
    const ambientLight = new AmbientLight(colorWhite, themeId === 'light' ? 0.8 : 0.1);

    dirLight.position.z = 200;
    dirLight.position.x = 100;
    dirLight.position.y = 100;

    lights.current = [dirLight, ambientLight];
    scene.current.background = new Color(...rgbToThreeColor(rgbBackground));
    lights.current.forEach(light => scene.current.add(light));

    return () => {
      removeLights(lights.current);
    };
  }, [rgbBackground, colorWhite, themeId]);

  useEffect(() => {
    const { width, height } = windowSize;

    const adjustedHeight = height + height * 0.3;
    renderer.current.setSize(width, adjustedHeight);
    camera.current.aspect = width / adjustedHeight;
    camera.current.updateProjectionMatrix();

    // Render a single frame on resize when not animating
    if (prefersReducedMotion) {
      renderer.current.render(scene.current, camera.current);
    }

    if (width <= media.mobile) {
      sphere.current.position.x = 14;
      sphere.current.position.y = 10;
    } else if (width <= media.tablet) {
      sphere.current.position.x = 18;
      sphere.current.position.y = 14;
    } else {
      sphere.current.position.x = 22;
      sphere.current.position.y = 16;
    }
  }, [prefersReducedMotion, windowSize]);

  useEffect(() => {
    const onMouseMove = event => {
      const { rotation } = sphere.current;

      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };

      if (!sphereSpring.current) {
        sphereSpring.current = value(rotation.toArray(), values =>
          rotation.set(values[0], values[1], sphere.current.rotation.z)
        );
      }

      tweenRef.current = spring({
        from: sphereSpring.current.get(),
        to: [position.y / 2, position.x / 2],
        stiffness: 30,
        damping: 20,
        velocity: sphereSpring.current.getVelocity(),
        mass: 2,
        restSpeed: 0.0001,
      }).start(sphereSpring.current);
    };

    if (!prefersReducedMotion && isInViewport) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      tweenRef.current?.stop();
    };
  }, [isInViewport, prefersReducedMotion]);

  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);

      if (uniforms.current !== undefined) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current);
      }

      sphere.current.rotation.z += 0.001;
      renderer.current.render(scene.current, camera.current);
    };

    if (!prefersReducedMotion && isInViewport) {
      animate();
    } else {
      renderer.current.render(scene.current, camera.current);
    }

    return () => {
      cancelAnimationFrame(animation);
    };
  }, [isInViewport, prefersReducedMotion]);

  return (
    <Transition appear in onEnter={reflow} timeout={3000}>
      {status => (
        <canvas
          aria-hidden
          className={classNames('displacement-sphere', `displacement-sphere--${status}`)}
          ref={canvasRef}
          {...props}
        />
      )}
    </Transition>
  );
};

export default DisplacementSphere;
