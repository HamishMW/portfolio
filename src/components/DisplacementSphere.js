import React, { useEffect, useRef, useContext } from 'react';
import styled, { keyframes, ThemeContext } from 'styled-components/macro';
import {
  Vector2, WebGLRenderer, PerspectiveCamera, Scene, DirectionalLight, AmbientLight,
  UniformsUtils, UniformsLib, ShaderLib, SphereBufferGeometry, Mesh, Color, ShaderMaterial
} from 'three';
import { Easing, Tween, autoPlay } from 'es6-tween';
import innerHeight from 'ios-inner-height';
import VertShader from 'shaders/sphereVertShader';
import FragmentShader from 'shaders/sphereFragmentShader';
import { usePrefersReducedMotion } from 'hooks';

function DisplacementSphere() {
  const theme = useContext(ThemeContext);
  const initialThemeRef = useRef(theme);
  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);
  const start = useRef(Date.now());
  const canvasRef = useRef();
  const mouse = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const light = useRef();
  const ambientLight = useRef();
  const uniforms = useRef();
  const material = useRef();
  const geometry = useRef();
  const sphere = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const rand = Math.random();
    mouse.current = new Vector2(0.8, 0.5);
    renderer.current = new WebGLRenderer({ canvas: canvasRef.current, powerPreference: 'high-performance' });
    camera.current = new PerspectiveCamera(55, width.current / height.current, 0.1, 200);
    scene.current = new Scene();

    uniforms.current = UniformsUtils.merge([
      UniformsLib['ambient'],
      UniformsLib['lights'],
      ShaderLib.phong.uniforms,
      { time: { type: 'f', value: 0 } },
    ]);

    material.current = new ShaderMaterial({
      uniforms: uniforms.current,
      vertexShader: VertShader,
      fragmentShader: FragmentShader,
      lights: true,
    });

    geometry.current = new SphereBufferGeometry(32, 128, 128);
    sphere.current = new Mesh(geometry.current, material.current);
    scene.current.background = new Color(initialThemeRef.current.colorBackground);
    renderer.current.setSize(width.current, height.current);
    camera.current.position.z = 52;

    scene.current.add(sphere.current);
    sphere.current.position.z = 0;
    sphere.current.modifier = rand;

    return function cleanUp() {
      scene.current.remove(sphere.current);
      sphere.current.geometry.dispose();
      sphere.current.material.dispose();
      geometry.current.dispose();
      material.current.dispose();
      renderer.current.dispose();
      renderer.current.forceContextLoss();
      scene.current.dispose();
      camera.current = null;
      sphere.current = null;
      uniforms.current = null;
      renderer.current.domElement = null;
    };
  }, []);

  useEffect(() => {
    light.current = new DirectionalLight(theme.colorWhite, 0.6);
    light.current.position.z = 200;
    light.current.position.x = 100;
    light.current.position.y = 100;
    ambientLight.current = new AmbientLight(theme.colorWhite, theme.id === 'light' ? 0.8 : 0.1);
    scene.current.background = new Color(theme.colorBackground);
    scene.current.add(light.current);
    scene.current.add(ambientLight.current);

    return function cleanup() {
      scene.current.remove(light.current);
      scene.current.remove(ambientLight.current);
      light.current = null;
      ambientLight.current = null;
    };
  }, [theme]);

  useEffect(() => {
    const onWindowResize = () => {
      const canvasHeight = innerHeight();
      const windowWidth = window.innerWidth;
      const fullHeight = canvasHeight + canvasHeight * 0.3;
      canvasRef.current.style.height = fullHeight;
      renderer.current.setSize(windowWidth, fullHeight);
      camera.current.aspect = windowWidth / fullHeight;
      camera.current.updateProjectionMatrix();

      if (prefersReducedMotion) {
        renderer.current.render(scene.current, camera.current);
      }

      if (windowWidth <= theme.mobile) {
        sphere.current.position.x = 14;
        sphere.current.position.y = 10;
      } else if (windowWidth <= theme.tablet) {
        sphere.current.position.x = 18;
        sphere.current.position.y = 14;
      } else {
        sphere.current.position.x = 22;
        sphere.current.position.y = 16;
      }
    };

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    return function cleanup() {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [prefersReducedMotion, theme.mobile, theme.tablet]);

  useEffect(() => {
    const onMouseMove = event => {
      const mouseY = event.clientY / window.innerHeight;
      const mouseX = event.clientX / window.innerWidth;

      new Tween(sphere.current.rotation)
        .to({ x: mouseY / 2, y: mouseX / 2 }, 2000)
        .easing(Easing.Quartic.Out)
        .start();
    };

    if (!prefersReducedMotion) {
      autoPlay(true);
      window.addEventListener('mousemove', onMouseMove);
    }

    return function cleanup() {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);
      uniforms.current.time.value = .00005 * (Date.now() - start.current);
      sphere.current.rotation.z += 0.001;
      renderer.current.render(scene.current, camera.current);
    };

    if (!prefersReducedMotion) {
      animate();
    } else {
      renderer.current.render(scene.current, camera.current);
    }

    return function cleanup() {
      cancelAnimationFrame(animation);
    };
  }, [prefersReducedMotion]);

  return (
    <SphereCanvas aria-hidden ref={canvasRef} />
  );
}

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const SphereCanvas = styled.canvas`
  position: absolute;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation-duration: 3s;
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  animation-fill-mode: forwards;
  animation-name: ${AnimBackgroundFade};
`;

export default React.memo(DisplacementSphere);
