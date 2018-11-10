import React from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import { Easing, Tween, autoPlay } from 'es6-tween';

const vertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

const fragment = `
  varying vec2 vUv;
  uniform sampler2D currentImage;
  uniform sampler2D nextImage;
  uniform float dispFactor;

  void main() {
    vec2 uv = vUv;
    vec4 _currentImage;
    vec4 _nextImage;
    float intensity = 0.6;

    vec4 orig1 = texture2D(currentImage, uv);
    vec4 orig2 = texture2D(nextImage, uv);

    vec2 distortedPosition = vec2(
      uv.x + dispFactor * (orig2.r * intensity),
      uv.y + dispFactor * (orig2 * intensity)
    );

    vec2 distortedPosition2 = vec2(
      uv.x - (1.0 - dispFactor) * (orig1.r * intensity),
      uv.y - (1.0 - dispFactor) * (orig1 * intensity)
    );

    _currentImage = texture2D(currentImage, distortedPosition);
    _nextImage = texture2D(nextImage, distortedPosition2);

    vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);
    gl_FragColor = finalTexture;
  }
`;

export default class DispalcementSlider extends React.Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.scene = new THREE.Scene();
    this.renderWidth = 500;
    this.renderHeight = 300;
    this.imageIndex = 0;
    this.animating = false;
    this.camera = new THREE.OrthographicCamera(
      this.renderWidth / -2,
      this.renderWidth / 2,
      this.renderHeight / 2,
      this.renderHeight / -2,
      1,
      1000
    );
    autoPlay(true);
  }

  componentDidMount() {
    const { images } = this.props;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x111111, 1.0);
    this.renderer.setSize(this.renderWidth, this.renderHeight);
    this.container.current.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color(0x111111);
    this.camera.position.z = 1;
    this.sliderImages = this.loadImages(images);
    this.addObjects(this.sliderImages);
    this.animate();
  }

  loadImages = (images) => {
    const loader = new THREE.TextureLoader();

    return images.map(imgSrc => {
      console.log(imgSrc)
      const image = loader.load(imgSrc);
      image.magFilter = image.minFilter = THREE.LinearFilter;
      image.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      return image;
    });
  }

  addObjects = (sliderImages) => {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        dispFactor: { type: "f", value: 0.0 },
        currentImage: { type: "t", value: sliderImages[0] },
        nextImage: { type: "t", value: sliderImages[1] },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: false,
      opacity: 1.0
    });

    const geometry = new THREE.PlaneBufferGeometry(
      this.container.current.offsetWidth,
      this.container.current.offsetHeight,
      1
    );

    const object = new THREE.Mesh(geometry, this.material);
    object.position.set(0, 0, 0);
    this.scene.add(object);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  nextImage = () => {
    if (this.animating) return;
    this.animating = true;
    const nextIndex = this.imageIndex < this.sliderImages.length - 1
      ? this.imageIndex + 1
      : 0

    this.imageIndex = nextIndex;
    this.material.uniforms.nextImage.value = this.sliderImages[nextIndex];
    this.material.uniforms.nextImage.needsUpdate = true;

    new Tween(this.material.uniforms.dispFactor)
      .to({value: 1}, 1400)
      .easing(Easing.Exponential.InOut)
      .on('complete', () => {
        this.material.uniforms.currentImage.value = this.sliderImages[nextIndex];
        this.material.uniforms.currentImage.needsUpdate = true;
        this.material.uniforms.dispFactor.value = 0.0;
        this.animating = false;
      })
      .start();
  }

  render() {
    const { images } = this.props;
    return (
      <Container ref={this.container} onClick={this.nextImage}>
        {images.map(image => (
          <img src={image} alt="A thing" />
        ))}
      </Container>
    )
  }
}

const Container = styled.div`
  position: relative;
  object-fit: cover;

  img {
    position: absolute;
    pointer-events: none;
    visibility: hidden;
  }
`;