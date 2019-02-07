import React from 'react';
import {
  WebGLRenderer, OrthographicCamera, Scene, Mesh, Color, ShaderMaterial,
  LinearFilter, TextureLoader, PlaneBufferGeometry
} from 'three';
import styled from 'styled-components/macro';
import { Easing, Tween, autoPlay } from 'es6-tween';
import Swipe from 'react-easy-swipe';
import Icon from '../utils/Icon';
import { Media } from '../utils/StyleUtils';

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
  uniform float direction;

  void main() {
    vec2 uv = vUv;
    vec4 _currentImage;
    vec4 _nextImage;
    float intensity = 0.6;

    vec4 orig1 = texture2D(currentImage, uv);
    vec4 orig2 = texture2D(nextImage, uv);

    vec2 distortedPosition = vec2(
      uv.x + direction * (dispFactor * (orig2.r * intensity)),
      uv.y + direction * (dispFactor * (orig2 * intensity))
    );

    vec2 distortedPosition2 = vec2(
      uv.x - direction * ((1.0 - dispFactor) * (orig1.r * intensity)),
      uv.y - direction * ((1.0 - dispFactor) * (orig1 * intensity))
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
    this.renderer = new WebGLRenderer({ antialias: false });
    this.scene = new Scene();
    this.renderWidth = props.width;
    this.renderHeight = props.height;
    this.animating = false;
    this.camera = new OrthographicCamera(
      this.renderWidth / -2,
      this.renderWidth / 2,
      this.renderHeight / 2,
      this.renderHeight / -2,
      1,
      1000
    );
    autoPlay(true);

    this.state = {
      imageIndex: 0,
    }
  }

  componentDidMount() {
    const { images } = this.props;
    this.scheduledAnimationFrame = null;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x111111, 1.0);
    this.renderer.setSize(this.renderWidth, this.renderHeight);
    this.container.current.appendChild(this.renderer.domElement);
    this.scene.background = new Color(0x111111);
    this.camera.position.z = 1;
    this.sliderImages = this.loadImages(images);
    this.addObjects(this.sliderImages);
    this.animate();
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = 'auto';
  }

  loadImages = (images) => {
    const loader = new TextureLoader();

    return images.map(item => {
      const image = loader.load(item.src);
      image.magFilter = image.minFilter = LinearFilter;
      image.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      return image;
    });
  }

  addObjects = (sliderImages) => {
    this.material = new ShaderMaterial({
      uniforms: {
        dispFactor: { type: "f", value: 0.0 },
        direction: { type: "f", value: 1.0 },
        currentImage: { type: "t", value: sliderImages[0] },
        nextImage: { type: "t", value: sliderImages[1] },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: false,
      opacity: 1.0
    });

    const geometry = new PlaneBufferGeometry(
      this.container.current.offsetWidth,
      this.container.current.offsetHeight,
      1
    );

    const object = new Mesh(geometry, this.material);
    object.position.set(0, 0, 0);
    this.scene.add(object);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  nextImage = () => {
    const { imageIndex } = this.state;

    if (this.animating) {
      cancelAnimationFrame(this.scheduledAnimationFrame);
      this.scheduledAnimationFrame = requestAnimationFrame(this.nextImage);
      return;
    }

    this.animating = true;
    const nextIndex = imageIndex < this.sliderImages.length - 1
      ? imageIndex + 1
      : 0

    this.goToIndex(nextIndex, 1);
  }

  prevImage = () => {
    const { imageIndex } = this.state;

    if (this.animating) {
      cancelAnimationFrame(this.scheduledAnimationFrame);
      this.scheduledAnimationFrame = requestAnimationFrame(this.prevImage);
      return;
    }

    this.animating = true;
    const prevIndex = imageIndex > 0
      ? imageIndex - 1
      : this.sliderImages.length - 1

    this.goToIndex(prevIndex, -1);
  }

  goToIndex = (index, direction = 1) => {
    this.setState({ imageIndex: index });
    this.material.uniforms.nextImage.value = this.sliderImages[index];
    this.material.uniforms.nextImage.needsUpdate = true;
    this.material.uniforms.direction.value = direction;

    new Tween(this.material.uniforms.dispFactor)
      .to({ value: 1 }, 1200)
      .easing(Easing.Exponential.InOut)
      .on('complete', () => {
        this.material.uniforms.currentImage.value = this.sliderImages[index];
        this.material.uniforms.currentImage.needsUpdate = true;
        this.material.uniforms.dispFactor.value = 0.0;
        this.animating = false;
      })
      .start();
  }

  onNavClick = (index) => {
    const { imageIndex } = this.state;

    if (this.animating) {
      cancelAnimationFrame(this.scheduledAnimationFrame);
      this.scheduledAnimationFrame = requestAnimationFrame(() => this.onNavClick(index));
      return;
    }

    this.animating = true;
    const direction = index > imageIndex ? 1 : -1;
    this.goToIndex(index, direction);
  }

  render() {
    const { imageIndex } = this.state;
    const { images } = this.props;

    return (
      <Swipe
        allowMouseEvents
        onSwipeRight={this.prevImage}
        onSwipeLeft={this.nextImage}
      >
        <SliderContainer>
          {images.map((image, index) => (
            index === imageIndex && <SliderImage key={image.src} src={image.src} alt={image.alt} />
          ))}
          <SliderCanvasWrapper ref={this.container} />
          <SliderButton
            left
            aria-label="Previous slide"
            onClick={this.prevImage}
          >
            <Icon icon="slideLeft" />
          </SliderButton>
          <SliderButton
            right
            aria-label="Next slide"
            onClick={this.nextImage}
          >
            <Icon icon="slideRight" />
          </SliderButton>
        </SliderContainer>
        <SliderNav>
          {images.map((image, index) => (
            <SliderNavButton
              key={image.src}
              onClick={() => this.onNavClick(index)}
              active={index === imageIndex}
              aria-label={`Slide ${index + 1}`}
              aria-pressed={index === imageIndex}
            />
          ))}
        </SliderNav>
      </Swipe>
    )
  }
}

const SliderContainer = styled.div`
  position: relative;
  object-fit: cover;
  cursor: grab;

  canvas {
    position: relative;
  }
`;

const SliderCanvasWrapper = styled.div`
  position: relative;
`;

const SliderImage = styled.img`
  position: absolute;
  pointer-events: none;
  visibility: hidden;
  width: 100%;
  display: block;
`;

const SliderButton = styled.button`
  border: 0;
  margin: 0;
  background: none;
  padding: 16px 32px;
  position: absolute;
  top: 50%;
  right: ${props => props.right ? 0 : 'unset'};
  left: ${props => props.left ? 0 : 'unset'};
  transform: translate3d(0, -50%, 0);
  transition-property: background, box-shadow;
  transition-duration: 0.4s;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  z-index: 32;
  cursor: pointer;

  @media (max-width: ${Media.mobile}) {
    display: none;
  }

  &:hover,
  &:focus {
    background: ${props => props.theme.colorWhite(0.1)};
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 3px ${props => props.theme.colorWhite(0.2)};
  }

  svg {
    fill: ${props => props.theme.colorWhite(1)};
    display: block;
  }
`;

const SliderNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

const SliderNavButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  padding: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:focus::after {
    box-shadow: 0 0 0 4px ${props => props.theme.colorWhite(0.2)};
    background: ${props => props.active ? props.theme.colorWhite(1) : props.theme.colorWhite(0.6)};
  }

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    background: ${props => props.active ? props.theme.colorWhite(1) : props.theme.colorWhite(0.2)};
    transition-property: background, box-shadow;
    transition-duration: 0.5s;
    transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  }
`;
