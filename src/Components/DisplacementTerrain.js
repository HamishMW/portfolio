import * as THREE from 'three';
import VertShader from '../Shaders/TerrainVertShader';
import FragmentShader from '../Shaders/TerrainFragmentShader';

const width = window.innerWidth;
const height = window.innerHeight;

class DisplacementTerrain {
  constructor(container, props) {
    this.container = container;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100000);
    this.camera.position.z = 7;
    this.camera.position.y = 1;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      pixelRatio: window.devicePixelRatio,
      alpha: true,
    });

    this.terrain = new Terrain(this.scene);
  }

  init = () => {
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000);
    this.camera.lookAt(new THREE.Vector3());
    this.scene.add(this.terrain.plane_mesh);

    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize, false);
    this.animate();
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  }

  render = () => {
    this.terrain.update();
    this.renderer.render(this.scene, this.camera);
  }
}

class Terrain {
  constructor(scene) {
    this.clock = new THREE.Clock(true);

    this.options = {
      elevation: 0.5,
      noise_range: 0.5,
      sombrero_amplitude: 0,
      sombrero_frequency: 0,
      speed: 0.8,
      segments: 50,
      wireframe_color: '#3031FF',
      perlin_passes: 1,
      wireframe: true,
    }

    this.scene = scene;
    this.init();
  }

  init = () => {
    this.uniforms = {
      time: {
        type: "f",
        value: 0.0
      },
      speed: {
        type: "f",
        value: this.options.speed
      },
      elevation: {
        type: "f",
        value: this.options.elevation
      },
      noise_range: {
        type: "f",
        value: this.options.noise_range
      },
      offset: {
        type: "f",
        value: this.options.elevation
      },
      perlin_passes: {
        type: "f",
        value: this.options.perlin_passes
      },
      sombrero_amplitude: {
        type: "f",
        value: this.options.sombrero_amplitude
      },
      sombrero_frequency: {
        type: "f",
        value: this.options.sombrero_frequency
      },
      line_color: {
        type: "c",
        value: new THREE.Color(this.options.wireframe_color)
      }
    }

    this.buildPlanes(this.options.segments);
  }

  buildPlanes = (segments) => {
    this.plane_geometry = new THREE.PlaneBufferGeometry(20,20,segments,segments);
    this.plane_material = new THREE.ShaderMaterial({
      vertexShader: VertShader,
      fragmentShader: FragmentShader,
      wireframe: this.options.wireframe,
      wireframeLinewidth: 1,
      transparent: true,
      uniforms: this.uniforms,
    });

    this.materials = [
      this.plane_material,
    ];

    this.plane_mesh = THREE.SceneUtils.createMultiMaterialObject(this.plane_geometry, this.materials);
    this.plane_mesh.rotation.x = - Math.PI / 2;
    this.plane_mesh.position.y = -0.5;
  }

  update = () => {
    this.plane_material.uniforms['time'].value = this.clock.getElapsedTime();
  }
}

export default DisplacementTerrain;
