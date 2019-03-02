import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import 'intersection-observer';

const prerender = navigator.userAgent === 'ReactSnap';

function ProgressiveImage(props) {
  const { placeholder, className, style, srcSet, ...restProps } = props;
  const [loaded, setLoaded] = useState(false);
  const [intersect, setIntersect] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const containerRef = useRef();
  const placeholderRef = useRef();

  useEffect(() => {
    placeholderRef.current.addEventListener('transitionend', purgePlaceholder);

    return function cleanUp() {
      if (placeholderRef.current) {
        placeholderRef.current.removeEventListener('transitionend', purgePlaceholder);
      }
    };
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

  const onLoad = () => {
    setLoaded(true);
  };

  const purgePlaceholder = () => {
    setShowPlaceholder(false);
  };

  return (
    <ImageContainer className={className} style={style} ref={containerRef}>
      <ImageActual
        onLoad={onLoad}
        decoding="async"
        loaded={loaded}
        srcSet={!prerender && intersect ? srcSet : null}
        {...restProps}
      />
      {showPlaceholder &&
        <ImagePlaceholder
          ref={placeholderRef}
          loaded={loaded}
          src={placeholder}
          alt=""
          role="presentation"
        />
      }
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  position: relative;
  transform: translate3d(0, 0, 0);
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

export default React.memo(ProgressiveImage);
