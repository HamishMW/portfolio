import {
  Vector2, WebGLRenderer, PerspectiveCamera, Scene, DirectionalLight, AmbientLight,
  UniformsUtils, UniformsLib, ShaderLib, SphereBufferGeometry, Mesh, Color, ShaderMaterial
} from 'three';
import { Easing, Tween, autoPlay } from 'es6-tween';
import innerHeight from 'ios-inner-height';
import VertShader from '../shaders/SphereVertShader';
import FragmentShader from '../shaders/SphereFragmentShader';
import { Media } from '../utils/StyleUtils';

const width = window.innerWidth;
const height = window.innerHeight;
const start = Date.now();

class DisplacementSphere {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.mouse = new Vector2(0.8, 0.5);

    this.renderer = new WebGLRenderer();
    this.camera = new PerspectiveCamera(55, width / height, 0.1, 5000);
    this.scene = new Scene();
    this.light = new DirectionalLight(0xffffff, 0.6);
    this.ambientLight = new AmbientLight(0xffffff, 0.1);

    this.uniforms = UniformsUtils.merge([
      UniformsLib['ambient'],
      UniformsLib['lights'],
      ShaderLib.phong.uniforms,
      { time: { type: 'f', value: 0 } },
    ]);

    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VertShader,
      fragmentShader: FragmentShader,
      lights: true,
    });

    this.geometry = new SphereBufferGeometry(32, 128, 128);
    this.sphere = new Mesh(this.geometry, this.material);

    autoPlay(true);
  }

  init = () => {
    const rand = Math.random();
    this.scene.background = new Color(0x111111);
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
    this.animating = true;

    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('mousemove', this.onMouseMove);
    this.onWindowResize();
    this.animate();
  }

  remove = () => {
    this.animating = false;
    cancelAnimationFrame(this.animate);
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.scene.remove(this.sphere);
    this.sphere.geometry.dispose();
    this.sphere.material.dispose();
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.scene = null;
    this.camera = null;
    this.light = null;
    this.sphere = null;
    this.ambientLight = null;
    this.uniforms = null;
    this.renderer.context = null;
    this.renderer.domElement = null;
  }

  onWindowResize = () => {
    const windowWidth = window.innerWidth;
    const fullHeight = innerHeight();

    this.container.style.height = fullHeight;
    this.renderer.setSize(windowWidth, fullHeight);
    this.camera.aspect = windowWidth / fullHeight;
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

  onMouseMove = (event) => {
    const mouseY = event.clientY / window.innerHeight;
    const mouseX = event.clientX / window.innerWidth;

    new Tween(this.sphere.rotation)
      .to({ x: mouseY / 2, y: mouseX / 2 }, 2000)
      .easing(Easing.Quartic.Out)
      .start();
  }

  animate = () => {
    if (this.animating) {
      requestAnimationFrame(this.animate);
      this.render();
    }
  }

  render = () => {
    this.uniforms.time.value = .00005 * (Date.now() - start);
    this.sphere.rotation.z += 0.001;
    this.renderer.render(this.scene, this.camera);
  }
}

export default DisplacementSphere;
