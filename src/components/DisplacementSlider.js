import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  WebGLRenderer, OrthographicCamera, Scene, Mesh, Color, ShaderMaterial,
  LinearFilter, TextureLoader, PlaneBufferGeometry, LoadingManager
} from 'three';
import styled from 'styled-components/macro';
import 'intersection-observer';
import { Easing, Tween, autoPlay } from 'es6-tween';
import Swipe from 'react-easy-swipe';
import Icon from '../utils/Icon';
import { media } from '../utils/StyleUtils';

const prerender = navigator.userAgent === 'ReactSnap';

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

function determineIndex(imageIndex, index, images, direction) {
  if (index !== null) return index;
  const length = images.length;
  const prevIndex = (imageIndex - 1 + length) % length;
  const nextIndex = (imageIndex + 1) % length;
  const finalIndex = direction > 0 ? nextIndex : prevIndex;
  return finalIndex;
};

export default function DispalcementSlider(props) {
  const { width, height, images, placeholder } = props;
  const [imageIndex, setImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const container = useRef();
  const imagePlane = useRef();
  const geometry = useRef();
  const material = useRef();
  const sliderImages = useRef();
  const scene = useRef();
  const camera = useRef();
  const renderer = useRef();
  const animating = useRef(false);
  const scheduledAnimationFrame = useRef();
  const currentImage = images[imageIndex];

  const goToIndex = useCallback((index, direction = 1) => {
    animating.current = true;
    setImageIndex(index);
    const uniforms = material.current.uniforms;
    uniforms.nextImage.value = sliderImages.current[index];
    uniforms.nextImage.needsUpdate = true;
    uniforms.direction.value = direction;

    new Tween(uniforms.dispFactor)
      .to({ value: 1 }, 1200)
      .easing(Easing.Exponential.InOut)
      .on('complete', () => {
        uniforms.currentImage.value = sliderImages.current[index];
        uniforms.currentImage.needsUpdate = true;
        uniforms.dispFactor.value = 0.0;
        animating.current = false;
      })
      .start();
  }, []);

  const navigate = useCallback((direction, index = null) => {
    if (!loaded) return;

    if (animating.current) {
      cancelAnimationFrame(scheduledAnimationFrame.current);
      scheduledAnimationFrame.current = requestAnimationFrame(() => navigate(direction, index));
      return;
    }

    const finalIndex = determineIndex(imageIndex, index, sliderImages.current, direction);
    goToIndex(finalIndex, direction);
  }, [goToIndex, imageIndex, loaded]);

  const onNavClick = useCallback(index => {
    if (index === imageIndex) return;
    const direction = index > imageIndex ? 1 : -1;
    navigate(direction, index);
  }, [imageIndex, navigate]);

  useEffect(() => {
    const containerElement = container.current;
    const cameraOptions = [width / -2, width / 2, height / 2, height / -2, 1, 1000];
    renderer.current = new WebGLRenderer({ antialias: false });
    camera.current = new OrthographicCamera(...cameraOptions);
    scene.current = new Scene();
    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.setClearColor(0x111111, 1.0);
    renderer.current.setSize(width, height);
    renderer.current.domElement.style.width = '100%';
    renderer.current.domElement.style.height = 'auto';
    renderer.current.domElement.setAttribute('aria-hidden', true);
    scene.current.background = new Color(0x111111);
    camera.current.position.z = 1;
    containerElement.appendChild(renderer.current.domElement);

    const addObjects = textures => {
      material.current = new ShaderMaterial({
        uniforms: {
          dispFactor: { type: 'f', value: 0 },
          direction: { type: 'f', value: 1 },
          currentImage: { type: 't', value: textures[0] },
          nextImage: { type: 't', value: textures[1] },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: false,
        opacity: 1,
      });

      geometry.current = new PlaneBufferGeometry(width, height, 1);
      imagePlane.current = new Mesh(geometry.current, material.current);
      imagePlane.current.position.set(0, 0, 0);
      scene.current.add(imagePlane.current);
      autoPlay(true);
      goToIndex(0, 0);
    };

    const loadImages = async () => {
      const manager = new LoadingManager();

      manager.onLoad = function () {
        setLoaded(true);
      };

      const loader = new TextureLoader(manager);

      const results = images.map(async item => {
        return new Promise((resolve, reject) => {
          const tempImage = new Image();
          tempImage.src = item.src;
          tempImage.srcset = item.srcset;

          const onLoad = () => {
            tempImage.removeEventListener('load', onLoad);
            const source = tempImage.currentSrc;
            const image = loader.load(source);
            image.magFilter = image.minFilter = LinearFilter;
            image.anisotropy = renderer.current.capabilities.getMaxAnisotropy();
            resolve(image);
          };

          tempImage.addEventListener('load', onLoad);
        });
      });

      const imageResults = await Promise.all(results);
      sliderImages.current = imageResults;
      addObjects(imageResults);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImages();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(containerElement);

    return function cleanUp() {
      animating.current = false;
      renderer.current.dispose();
      renderer.current.forceContextLoss();
      renderer.current.context = null;
      renderer.current.domElement = null;
      observer.disconnect();
      containerElement.innerHTML = '';

      if (imagePlane.current) {
        scene.current.remove(imagePlane.current);
        imagePlane.current.geometry.dispose();
        imagePlane.current.material.dispose();
      }

      scene.current.dispose();

      if (geometry.current) {
        geometry.current.dispose();
      }

      if (material.current) {
        material.current.dispose();
      }
    };
  }, [goToIndex, height, images, width]);

  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);
      if (animating.current) {
        renderer.current.render(scene.current, camera.current);
      }
    };

    animate();

    return function cleanup() {
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <SliderContainer>
      <SliderContainer>
        <SliderImage src={currentImage.src} srcSet={currentImage.srcset} alt={currentImage.alt} />
        <Swipe
          allowMouseEvents
          onSwipeRight={() => navigate(-1)}
          onSwipeLeft={() => navigate(1)}
        >
          <SliderCanvasWrapper ref={container} />
        </Swipe>
        <SliderPlaceholder src={placeholder} alt="" loaded={!prerender && loaded} />
        <SliderButton
          left
          aria-label="Previous slide"
          onClick={() => navigate(-1)}
        >
          <Icon icon="slideLeft" />
        </SliderButton>
        <SliderButton
          right
          aria-label="Next slide"
          onClick={() => navigate(1)}
        >
          <Icon icon="slideRight" />
        </SliderButton>
      </SliderContainer>
      <SliderNav>
        {images.map((image, index) => (
          <SliderNavButton
            key={image.src}
            onClick={() => onNavClick(index)}
            active={index === imageIndex}
            aria-label={`Jump to slide ${index + 1}`}
            aria-pressed={index === imageIndex}
          />
        ))}
      </SliderNav>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  position: relative;
`;

const SliderCanvasWrapper = styled.div`
  position: relative;
  cursor: grab;

  canvas {
    position: relative;
    display: block;
  }
`;

const SliderImage = styled.img`
  position: absolute;
  pointer-events: none;
  opacity: 0.001;
  width: 100%;
  display: block;
`;

const SliderPlaceholder = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: opacity 1s ease;
  opacity: ${props => props.loaded ? 0 : 1};
  pointer-events: none;
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

  @media (max-width: ${media.mobile}) {
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
    fill: ${props => props.theme.colorWhite()};
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

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    background: ${props => props.active ? props.theme.colorText() : props.theme.colorText(0.2)};
    transition-property: background, box-shadow;
    transition-duration: 0.5s;
    transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  }

  &:focus::after {
    box-shadow: 0 0 0 4px ${props => props.theme.colorText(0.2)};
    background: ${props => props.active ? props.theme.colorText() : props.theme.colorText(0.6)};
  }
`;
