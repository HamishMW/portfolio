import * as THREE from 'three';
import { Easing, Tween, autoPlay } from 'es6-tween';
import innerHeight from 'ios-inner-height';
import VertShader from '../shaders/SphereVertShader';
import FragmentShader from '../shaders/SphereFragmentShader';
import { Media } from '../utils/StyleUtils';
import Theme from '../utils/Theme';

const width = window.innerWidth;
const height = window.innerHeight;
const start = Date.now();

class DisplacementSphere {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.mouse = new THREE.Vector2(0.8, 0.5);

    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera( 55, width / height, 0.1, 5000 );
    this.scene = new THREE.Scene();

    if (Theme.name === 'light') {
      this.light = new THREE.DirectionalLight(0xffffff, 0.8);
      this.ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    } else {
      this.light = new THREE.DirectionalLight(0xffffff, 0.6);
      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    }

    this.uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib["ambient"],
      THREE.UniformsLib["lights"],
      THREE.ShaderLib.phong.uniforms,
      {time: { type: "f", value: 0 }},
    ]);

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VertShader,
      fragmentShader: FragmentShader,
      lights: true,
    });

    this.geometry = new THREE.SphereGeometry(32, 140, 140);
    this.sphere = new THREE.Mesh(this.geometry, this.material);

    autoPlay(true);
  }

  init = () => {
    const rand = Math.random();
    this.scene.background = new THREE.Color(0x111111);
    this.renderer.setSize(width, height);
    this.camera.position.z = 52;

    this.light.position.z = 200;
    this.light.position.x = 100;
    this.light.position.y = 100;
    this.scene.add(this.light);
    this.scene.add(this.ambientLight);

    this.scene.add(this.sphere);
    this.sphere.position.z = 0;

    this.sphere.modifier = rand;

    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize, false);
    window.addEventListener('mousemove', this.onMouseMove, false);
    this.onWindowResize();
    this.animate();
  }

  onWindowResize = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const ua = window.navigator.userAgent;
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    const webkit = !!ua.match(/WebKit/i);
    const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

    if (iOSSafari) {
      const fullHeight = innerHeight();
      this.container.style.height = fullHeight;
      this.renderer.setSize(windowWidth, fullHeight);
      this.camera.aspect = windowWidth / fullHeight;
    } else {
      this.renderer.setSize(windowWidth, windowHeight);
      this.camera.aspect = windowWidth / windowHeight;
    }

    this.camera.updateProjectionMatrix();

    if (windowWidth <= Media.numMobile) {
      this.sphere.position.x = 16;
      this.sphere.position.y = 8;
    } else if (windowWidth <= Media.numTablet) {
      this.sphere.position.x = 20;
      this.sphere.position.y = 12;
    } else {
      this.sphere.position.x = 25;
      this.sphere.position.y = 10;
    }
  }

  onMouseMove = (e) => {
    this.mouse.y = e.clientY / window.innerHeight;
    this.mouse.x = e.clientX / window.innerWidth;

    new Tween(this.sphere.rotation)
      .to({x: this.mouse.y / 2, y: this.mouse.x / 2}, 2000)
      .easing(Easing.Quartic.Out)
      .start();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  }

  render = () => {
    this.uniforms.time.value = .00005 * (Date.now() - start);
    this.sphere.rotation.z += 0.001;
    this.renderer.render(this.scene, this.camera);
  }
}

export default DisplacementSphere;
