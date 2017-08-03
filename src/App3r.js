import React, { Component } from 'react';
import * as THREE from 'three';
import VertShader from './Shaders/VertShader';
import FragmentShader from './Shaders/FragmentShader';
import React3 from 'react-three-renderer';

import './App.css';

const width = window.innerWidth;
const height = window.innerHeight;
const start = Date.now();

class App extends Component {
  constructor(props) {
    super(props);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);
    this.scenePosition = new THREE.Vector3(0, 0, 0);
    this.directionalLightPosition = new THREE.Vector3(0, 1, 0);

    this.state = {
      time: 0,
      sphereRotation: new THREE.Euler(),
    };
  }

  _onAnimate = () => {
    // we will get this callback every frame

    // pretend sphereRotation is immutable.
    // this helps with updates and pure rendering.
    // React will be sure that the rotation has now updated.
    this.setState({
      time: .00005 * (Date.now() - start),
      sphereRotation: new THREE.Euler(
        this.state.sphereRotation.x + 0.1,
        this.state.sphereRotation.y + 0.1,
        0
      ),
    });
  };

  _renderScene = () => {
    // Shaders
		let vertShader = VertShader;
		let fragShader = FragmentShader;
    let self = this;

    const uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib["ambient"],
      THREE.UniformsLib["lights"],
      {time: { type: "f", value: self.state.time }},
      THREE.ShaderLib.phong.uniforms
    ]);

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

    // THREE.UniformsLib["lights"],
    // {time: { type: "f", value: self.state.time }},
    // THREE.ShaderLib.phong.uniforms


    console.log(THREE.ShaderLib.phong.uniforms);

    return (
      <React3
      mainCamera="camera"
      width={width}
      height={height}
      alpha={true}
      antialias
      pixelRatio={window.devicePixelRatio}
      onAnimate={this._onAnimate}>
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.cameraPosition}
          />
          <ambientLight
            color={0x404040}
          />
          <directionalLight
            color={0xffffff}
            position={this.directionalLightPosition}
            lookAt={this.scenePosition}
          />
          <mesh rotation={this.state.sphereRotation}>
            <sphereGeometry
              radius={1}
              widthSegments={20}
              heightSegments={10}
            />
            <shaderMaterial
              opacity={1 * Math.random()}
              transparent={true}
              fragmentShader={fragShader}
              vertexShader={vertShader}>
              <uniforms>
                <uniform
                  name="time"
                  type="f"
                  value={this.state.time}>
                </uniform>
                <uniform
                  name="shader"
                  type="s">
                  <textureResource
                    resourceId="clothTexture"
                  />
                </uniform>
  	          </uniforms>
            </shaderMaterial>
          </mesh>
        </scene>
      </React3>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="Header">
          <nav className="Header__nav"></nav>
        </header>

        <div className="Background">
          { this._renderScene() }
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
