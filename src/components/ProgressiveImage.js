import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';

const prerender = navigator.userAgent === 'ReactSnap';

function ProgressiveImage(props) {
  const { className, style, reveal, delay = 0, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const [intersect, setIntersect] = useState(false);
  const containerRef = useRef();

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          setIntersect(true);
          observer.unobserve(image);
        }
      });
    });

    observer.observe(containerRef.current);

    return function cleanUp() {
      observer.disconnect();
    };
  }, []);

  return (
    <ImageContainer
      className={className}
      style={style}
      ref={containerRef}
      reveal={reveal}
      intersect={intersect}
      loaded={loaded}
      delay={delay}
    >
      {reveal &&
        <ImageFade intersect={intersect} delay={delay}>
          <ImageElements
            delay={delay}
            onLoad={onLoad}
            loaded={loaded}
            intersect={intersect}
            {...rest}
          />
        </ImageFade>
      }
      {!reveal &&
        <ImageElements
          onLoad={onLoad}
          loaded={loaded}
          intersect={intersect}
          {...rest}
        />
      }
    </ImageContainer>
  );
};

function ImageElements(props) {
  const { onLoad, loaded, intersect, srcSet, placeholder, delay, ...rest } = props;
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const placeholderRef = useRef();

  useEffect(() => {
    const purgePlaceholder = () => {
      setShowPlaceholder(false);
    };

    const placeholderElement = placeholderRef.current;
    placeholderElement.addEventListener('transitionend', purgePlaceholder);

    return function cleanUp() {
      if (placeholderElement) {
        placeholderElement.removeEventListener('transitionend', purgePlaceholder);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <ImageActual
        delay={delay}
        onLoad={onLoad}
        decoding="async"
        loaded={loaded}
        srcSet={!prerender && intersect ? srcSet : null}
        {...rest}
      />
      {showPlaceholder &&
        <ImagePlaceholder
          delay={delay}
          ref={placeholderRef}
          loaded={loaded}
          src={placeholder}
          alt=""
          role="presentation"
        />
      }
    </React.Fragment>
  );
}

const AnimImageReveal = keyframes`
  0% {
    transform: scale3d(0, 1, 1);
    transform-origin: left;
  }
  49% {
    transform: scale3d(1, 1, 1);
    transform-origin: left;
  }
  50% {
    transform: scale3d(1, 1, 1);
    transform-origin: right;
  }
  100% {
    transform: scale3d(0, 1, 1);
    transform-origin: right;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  transform: translate3d(0, 0, 0);
  display: grid;
  grid-template-columns: 100%;

  ${props => props.reveal && css`
    &::before {
      content: '';
      background: ${props => props.theme.colorAccent};
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: scale3d(0, 1, 1);
      transform-origin: left;
      z-index: 16;
      animation: ${props.intersect && !prerender && css`
        ${AnimImageReveal} 1.8s ${props.theme.curveFastoutSlowin} ${props.delay + 200}ms
      `};
    }
  `}
`;

const ImageFade = styled.div`
  opacity: ${props => props.intersect ? 1 : 0};
  transition: opacity 0.4s ease ${props => props.delay + 1000}ms;
  transform: translate3d(0, 0, 0);
  position: relative;
  display: grid;
  grid-template-columns: 100%;
`;

const ImagePlaceholder = styled.img`
  width: 100%;
  height: auto;
  transition: opacity 0.4s ease;
  pointer-events: none;
  display: block;
  position: relative;
  z-index: 1;
  opacity: ${props => props.loaded ? 0 : 1};
  grid-column: 1;
  grid-row: 1;
`;

const ImageActual = styled.img`
  width: 100%;
  height: auto;
  display: block;
  opacity: ${props => props.loaded ? 1 : 0};
  grid-column: 1;
  grid-row: 1;
`;

export default ProgressiveImage;
