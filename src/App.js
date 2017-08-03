import React, { Component } from 'react';
import * as THREE from 'three';
import VertShader from './Shaders/VertShader';
import FragmentShader from './Shaders/FragmentShader';
import { Renderer, Scene, PerspectiveCamera, Mesh, AmbientLight } from 'react-three';

import './App.css';

const width = window.innerWidth;
const height = window.innerHeight;
const start = Date.now();

class App extends Component {
  constructor(props) {
    super(props)

    this.uniforms = THREE.UniformsUtils.merge([
	    THREE.UniformsLib["ambient"],
	    THREE.UniformsLib["lights"],
	    {time: { type: "f", value: 0 }},
	    THREE.ShaderLib.phong.uniforms,
	  ]);

    this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: VertShader,
			fragmentShader: FragmentShader,
			lights: true,
		});
  }

  // Make this a sub comp so it gets time prop
  componentWillReceiveProps(nextProps) {
    console.log(this.uniforms.time.value);
    this.uniforms.time.value = .00005 * ( Date.now() - start );
  }

  _renderScene = () => {
		// Renderer
		// let renderer = new THREE.WebGLRenderer({canvas:document.getElementById('main'),antialiasing:true});
		// renderer.setClearColor(0x000000);
		// renderer.setSize(window.innerWidth,window.innerHeight);

		// Camera
		// let camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 5000 );
		// camera.position.z = 200;

		// Scene
		// let scene = new THREE.Scene();

		// Light
		// let light = new THREE.DirectionalLight(0xffffff,0.4);
		// light.position.z = 200;
		// light.position.x = 100;
		// light.position.y = 100;
		// scene.add(light);
    //
		// let ambientLight = new THREE.AmbientLight(0xffffff,0.1);
  	// 	scene.add(ambientLight);

		// Shader Materials
		// const uniforms = THREE.UniformsUtils.merge([
	//     THREE.UniformsLib["ambient"],
	//     THREE.UniformsLib["lights"],
	//     {time: { type: "f", value: 0 }},
	//     THREE.ShaderLib.phong.uniforms
	//   ]);
    //
		// let material = new THREE.ShaderMaterial( {
		// 	uniforms:uniforms,
		// 	vertexShader : vertShader,
		// 	fragmentShader : fragShader,
		// 	lights: true
		// } );
    //
		// let geometry = new THREE.SphereGeometry( 30,200,200);
		// let planet = new THREE.Mesh( geometry, material );
		// scene.add( planet );
		// planet.position.x = 20;
		// planet.position.y = 20;
		// planet.position.z = 0;
		// planet.modifier = Math.random();
		// planet.material.transparent = true;
		// planet.material.opacity = 1*Math.random();
    //
		// // Render
		// let start = Date.now();
		// function render(){
		// 	uniforms.time.value = .00005 * ( Date.now() - start );
    //
		// 	planet.rotation.y += 0.001;
		// 	planet.rotation.z += 0.001;
		// 	planet.rotation.x += 0.001;
    //
		// 	camera.position.z =  52;
    //
		// 	renderer.render(scene,camera);
		// 	window.requestAnimationFrame(render);
		// }
    //
		// window.requestAnimationFrame(render);
    const cameraprops = {
      fov: 55, aspect: width / height,
      near: 0.1, far: 5000,
      position: new THREE.Vector3(0,0,600),
      lookat: new THREE.Vector3(0,0,0)
    };

    const geometry = new THREE.SphereGeometry(30, 200, 200);

    return (
      <Renderer width={width} height={height} antialias pixelRatio={window.devicePixelRatio}>
        <Scene width={width} height={height} camera="maincamera">
          <PerspectiveCamera name="maincamera" {...cameraprops} />
          <AmbientLight color={0xffffff} />
          <Mesh geometry={geometry} material={this.material} />
        </Scene>
      </Renderer>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="Header">
          <nav className="Header__nav"></nav>
        </header>

        <div className="Background">
          { false && this._renderScene() }
        </div>

        <div className="Intro">
          <div className="Intro__text">
            <h2 className="Intro__name">Hamish Williams</h2>
            <h1 className="Intro__title">
              <div className="Intro__title-word Intro__title-word--line">Designer</div>
              <div className="Intro__title-row">
                <div className="Intro__title-word Intro__title-word--plus">+</div>
                <div className="Intro__title-word">Developer</div>
              </div>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
