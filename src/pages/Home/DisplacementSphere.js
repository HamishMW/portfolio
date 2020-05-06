import React, { useEffect, useRef, memo } from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { Vector2 } from 'three/src/math/Vector2';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { Scene } from 'three/src/scenes/Scene';
import { DirectionalLight } from 'three/src/lights/DirectionalLight';
import { AmbientLight } from 'three/src/lights/AmbientLight';
import { UniformsUtils } from 'three/src/renderers/shaders/UniformsUtils';
import { UniformsLib } from 'three/src/renderers/shaders/UniformsLib';
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial';
import { SphereBufferGeometry } from 'three/src/geometries/SphereGeometry';
import { Mesh } from 'three/src/objects/Mesh';
import { Color } from 'three/src/math/Color';
import { Easing, Tween, update as updateTween, remove as removeTween } from 'es6-tween';
import innerHeight from 'ios-inner-height';
import vertShader from './shaders/sphereVertShader';
import fragShader from './shaders/sphereFragShader';
import { Transition } from 'react-transition-group';
import { usePrefersReducedMotion } from 'hooks';
import { reflow, isVisible } from 'utils/transition';
import { media } from 'utils/style';

function DisplacementSphere(props) {
  const { rgbBackground, id: themeId, colorWhite } = useTheme();
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
  const tweenRef = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const rand = Math.random();
    mouse.current = new Vector2(0.8, 0.5);
    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      powerPreference: 'high-performance',
    });
    camera.current = new PerspectiveCamera(55, width.current / height.current, 0.1, 200);
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
      scene.current.dispose();
      camera.current = null;
      sphere.current = null;
      uniforms.current = null;
      renderer.current.domElement = null;
    };
  }, []);

  useEffect(() => {
    light.current = new DirectionalLight(colorWhite, 0.6);
    light.current.position.z = 200;
    light.current.position.x = 100;
    light.current.position.y = 100;
    ambientLight.current = new AmbientLight(colorWhite, themeId === 'light' ? 0.8 : 0.1);
    scene.current.background = new Color(`rgb(${rgbBackground.split(' ').join(', ')})`);
    scene.current.add(light.current);
    scene.current.add(ambientLight.current);

    return function cleanup() {
      scene.current.remove(light.current);
      scene.current.remove(ambientLight.current);
      light.current = null;
      ambientLight.current = null;
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

    return function cleanup() {
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    let ticking = false;
    let animationFrame = null;

    const onMouseMove = event => {
      const animate = () => {
        const position = {
          x: event.clientX / window.innerWidth,
          y: event.clientY / window.innerHeight,
        };

        tweenRef.current = new Tween(sphere.current.rotation)
          .to({ x: position.y / 2, y: position.x / 2 }, 2000)
          .easing(Easing.Quartic.Out)
          .start();

        ticking = false;
      };

      if (!ticking) {
        animationFrame = requestAnimationFrame(animate);
        ticking = true;
      }
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', onMouseMove);
    }

    return function cleanup() {
      window.removeEventListener('mousemove', onMouseMove);
      removeTween(tweenRef.current);
      cancelAnimationFrame(animationFrame);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);
      if (uniforms.current !== undefined) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current);
      }
      sphere.current.rotation.z += 0.001;
      renderer.current.render(scene.current, camera.current);
      updateTween();
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
    <Transition appear in onEnter={reflow} timeout={3000}>
      {status => <SphereCanvas aria-hidden status={status} ref={canvasRef} {...props} />}
    </Transition>
  );
}

const SphereCanvas = styled.canvas`
  position: absolute;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: ${props => (isVisible(props.status) ? 1 : 0)};
  transition-property: opacity;
  transition-duration: 3s;
  transition-timing-function: var(--curveFastoutSlowin);
`;

export default memo(DisplacementSphere);
