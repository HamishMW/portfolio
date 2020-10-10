import React, { useEffect, useRef } from 'react';
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
} from 'three';
import { spring, value } from 'popmotion';
import innerHeight from 'ios-inner-height';
import vertShader from './sphereVertShader';
import fragShader from './sphereFragShader';
import { Transition } from 'react-transition-group';
import { useTheme } from 'components/ThemeProvider';
import { usePrefersReducedMotion, useInViewport } from 'hooks';
import { reflow } from 'utils/transition';
import { media, rgbToThreeColor } from 'utils/style';
import { cleanScene, removeLights, cleanRenderer } from 'utils/three';
import './DisplacementSphere.css';

const DisplacementSphere = props => {
  const theme = useTheme();
  const { rgbBackground, themeId, colorWhite } = theme;
  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);
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

  useEffect(() => {
    mouse.current = new Vector2(0.8, 0.5);
    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      powerPreference: 'high-performance',
    });
    renderer.current.setSize(width.current, height.current);
    renderer.current.setPixelRatio(1);
    renderer.current.outputEncoding = sRGBEncoding;

    camera.current = new PerspectiveCamera(55, width.current / height.current, 0.1, 200);
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
      shader.lights = true;
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
    scene.current.background = rgbToThreeColor(rgbBackground);
    lights.current.forEach(light => scene.current.add(light));

    return () => {
      removeLights(lights.current);
    };
  }, [rgbBackground, colorWhite, themeId]);

  useEffect(() => {
    const handleResize = () => {
      const canvasHeight = innerHeight();
      const windowWidth = window.innerWidth;
      const fullHeight = canvasHeight + canvasHeight * 0.3;
      canvasRef.current.style.height = fullHeight;
      renderer.current.setSize(windowWidth, fullHeight);
      camera.current.aspect = windowWidth / fullHeight;
      camera.current.updateProjectionMatrix();

      // Render a single frame on resize when not animating
      if (prefersReducedMotion) {
        renderer.current.render(scene.current, camera.current);
      }

      if (windowWidth <= media.mobile) {
        sphere.current.position.x = 14;
        sphere.current.position.y = 10;
      } else if (windowWidth <= media.tablet) {
        sphere.current.position.x = 18;
        sphere.current.position.y = 14;
      } else {
        sphere.current.position.x = 22;
        sphere.current.position.y = 16;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

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

      if (tweenRef.current) {
        tweenRef.current.stop();
      }
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
