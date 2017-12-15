import * as THREE from 'three';
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
    this.mouse = {x: 0, y: 0};

    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera( 55, width / height, 0.1, 5000 );
    this.scene = new THREE.Scene();
    this.light = new THREE.DirectionalLight(0xffffff, 0.6);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

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
    // window.addEventListener('mousemove', this.onMouseMove, false);
    this.onWindowResize();
    this.animate();
  }

  onWindowResize = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    this.camera.aspect = windowWidth / windowHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(windowWidth, windowHeight);

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
    const speed = 0.005;
    // this.camera.position.x += Math.max(Math.min((e.clientX - this.mouse.x) * 0.01, speed), -speed);
    // this.camera.position.y += Math.max(Math.min((this.mouse.y - e.clientY) * 0.01, speed), -speed);
    this.sphere.rotation.y += Math.max(Math.min((e.clientX - this.mouse.x) * 0.001, speed), -speed);
    this.sphere.rotation.x += Math.max(Math.min((this.mouse.y - e.clientY) * 0.001, speed), -speed);

    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  }

  render = () => {
    this.uniforms.time.value = .00005 * (Date.now() - start);
  	this.sphere.rotation.y += 0.001;
  	this.sphere.rotation.z += 0.001;
  	this.sphere.rotation.x += 0.001;

    this.renderer.render(this.scene, this.camera);
  }
}

export default DisplacementSphere;
