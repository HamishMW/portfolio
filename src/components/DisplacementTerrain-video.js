import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import VertShader from '../shaders/TerrainVertShader';
import FragmentShader from '../shaders/TerrainFragmentShader';
import BadTVShader from '../shaders/BadTVShader';
import vhs from '../assets/vhs.mp4';

const width = window.innerWidth;
const height = window.innerHeight;

class DisplacementTerrain {
  constructor(container, props) {
    this.container = container;
    this.props = props;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100000);
    this.camera.position.z = 7;
    this.camera.position.y = 1;
    this.tetraGeo = new THREE.TetrahedronGeometry(1, 0);
    this.tetraMaterial = new THREE.MeshPhongMaterial({color: 0x333333, shading: THREE.FlatShading});
    this.tetraMesh = new THREE.Mesh(this.tetraGeo, this.tetraMaterial);

    this.directionalLight = new THREE.DirectionalLight(0x3031FF, 1);
    this.pointLightPink = new THREE.PointLight(0xFF12FF, 0.2, 100);
    this.light = new THREE.AmbientLight(0x404040);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      pixelRatio: window.devicePixelRatio,
      alpha: true,
    });

    const video = document.createElement('video');
    video.loop = true;
    video.muted = true;
    video.src = vhs;
    video.play();

    this.videoTexture = new THREE.VideoTexture(video);
    this.videoTexture.minFilter = THREE.LinearFilter;
    this.videoTexture.magFilter = THREE.LinearFilter;
    this.videoTexture.format = THREE.RGBFormat;
    this.videoMaterial = new THREE.MeshBasicMaterial({
      map: this.videoTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    this.videoPlaneGeometry = new THREE.PlaneGeometry(width / 600, height / 600, 1, 1);
    this.videoPlane = new THREE.Mesh(this.videoPlaneGeometry, this.videoMaterial);
    this.terrain = new Terrain(this.scene);
  }

  init = () => {
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000);
    // this.camera.lookAt(new THREE.Vector3());
    this.videoPlane.position.z = this.camera.position.z - 1;
    this.videoPlane.position.y = this.camera.position.y;
    this.videoPlane.lookAt(this.camera.position);
    this.scene.add(this.terrain.plane_mesh);
    this.scene.add(this.tetraMesh);

    this.directionalLight.position.set(1, 1, 5);
    // var helper = new THREE.DirectionalLightHelper( this.directionalLight, 1);
    // this.scene.add( helper );
    this.directionalLight.target.position.set(this.tetraMesh);
    this.pointLightPink.position.set(0, 0.9, 5.6);
    // var helper2 = new THREE.PointLightHelper( this.pointLightPink, 1);
    // this.scene.add( helper2 );
    this.scene.add(this.directionalLight);
    this.scene.add(this.pointLightPink);
    this.scene.add(this.light);

    this.scene.add(this.videoPlane);

    this.tetraPosition = {z: -2, y: 0.8};
    this.tetraTarget = {z: 4.8, y: 0.8};
    this.tetraMesh.position.z = this.tetraPosition.z;
    this.tetraMesh.position.y = this.tetraPosition.y;
    this.tetraTween = new TWEEN.Tween(this.tetraPosition).to(this.tetraTarget, 2000);
    this.tetraTween.easing(TWEEN.Easing.Quartic.InOut);

    this.tetraTween.onUpdate(() => {
      this.tetraMesh.position.z = this.tetraPosition.z;
    });

    this.tetraTween.delay(500);
    this.tetraTween.start();

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
    TWEEN.update();
    this.terrain.update();
    this.tetraMesh.rotation.x += 0.005;
    this.tetraMesh.rotation.y += 0.005;
    // this.videoTexture.needsUpdate = true;
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
