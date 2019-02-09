import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Vector2, WebGLRenderer, PerspectiveCamera, Scene, DirectionalLight, AmbientLight,
  UniformsUtils, UniformsLib, ShaderLib, SphereBufferGeometry, Mesh, Color, ShaderMaterial
} from 'three';
import { Easing, Tween, autoPlay } from 'es6-tween';
import innerHeight from 'ios-inner-height';
import VertShader from '../shaders/SphereVertShader';
import FragmentShader from '../shaders/SphereFragmentShader';
import { Media } from '../utils/StyleUtils';

function DisplacementSphere() {
  const width = useRef(window.innerWidth);
  const height = useRef(window.innerHeight);
  const start = useRef(Date.now());
  const container = useRef();
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
  const animating = useRef(false);

  useEffect(() => {
    mouse.current = new Vector2(0.8, 0.5);
    renderer.current = new WebGLRenderer();
    camera.current = new PerspectiveCamera(55, width.current / height.current, 0.1, 5000);
    scene.current = new Scene();
    light.current = new DirectionalLight(0xffffff, 0.6);
    ambientLight.current = new AmbientLight(0xffffff, 0.1);

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

    autoPlay(true);
    init();

    return function cleanUp() {
      animating.current = false;
      cancelAnimationFrame(animate);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      scene.current.remove(sphere.current);
      sphere.current.geometry.dispose();
      sphere.current.material.dispose();
      geometry.current.dispose();
      material.current.dispose();
      renderer.current.dispose();
      renderer.current.forceContextLoss();
      scene.current = null;
      camera.current = null;
      light.current = null;
      sphere.current = null;
      ambientLight.current = null;
      uniforms.current = null;
      renderer.current.context = null;
      renderer.current.domElement = null;
    }
  }, [])

  const init = () => {
    const rand = Math.random();
    scene.current.background = new Color(0x111111);
    renderer.current.setSize(width.current, height.current);
    camera.current.position.z = 52;

    light.current.position.z = 200;
    light.current.position.x = 100;
    light.current.position.y = 100;
    scene.current.add(light.current);
    scene.current.add(ambientLight.current);

    scene.current.add(sphere.current);
    sphere.current.position.z = 0;

    sphere.current.modifier = rand;
    animating.current = true;

    container.current.appendChild(renderer.current.domElement);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);
    onWindowResize();
    animate();
  }

  const onWindowResize = () => {
    const windowWidth = window.innerWidth;
    const fullHeight = innerHeight();

    container.current.style.height = fullHeight;
    renderer.current.setSize(windowWidth, fullHeight);
    camera.current.aspect = windowWidth / fullHeight;
    camera.current.updateProjectionMatrix();

    if (windowWidth <= Media.numMobile) {
      sphere.current.position.x = 16;
      sphere.current.position.y = 8;
    } else if (windowWidth <= Media.numTablet) {
      sphere.current.position.x = 20;
      sphere.current.position.y = 12;
    } else {
      sphere.current.position.x = 25;
      sphere.current.position.y = 10;
    }
  }

  const onMouseMove = (event) => {
    const mouseY = event.clientY / window.innerHeight;
    const mouseX = event.clientX / window.innerWidth;

    new Tween(sphere.current.rotation)
      .to({ x: mouseY / 2, y: mouseX / 2 }, 2000)
      .easing(Easing.Quartic.Out)
      .start();
  }

  const animate = () => {
    if (animating.current) {
      requestAnimationFrame(animate);
      render();
    }
  }

  const render = () => {
    uniforms.current.time.value = .00005 * (Date.now() - start.current);
    sphere.current.rotation.z += 0.001;
    renderer.current.render(scene.current, camera.current);
  }

  return (
    <SphereContainer ref={container} aria-hidden="true" />
  );
}

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const SphereContainer = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  canvas {
    position: absolute;
    animation-duration: 3s;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    animation-fill-mode: forwards;
    opacity: 0;
    animation-name: ${AnimBackgroundFade};
  }
`;

export default DisplacementSphere;
