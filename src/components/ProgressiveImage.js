import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import 'intersection-observer';

const prerender = navigator.userAgent === 'ReactSnap';

const ProgressiveImage = React.memo((props) => {
  const { placeholder, className, style, srcSet, ...restProps } = props;
  const [loaded, setLoaded] = useState(false);
  const [intersect, setIntersect] = useState(false);
  const containerRef = useRef();

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
  }, []);

  const onLoad = () => {
    setLoaded(true);
  }

  return (
    <ImageContainer className={className} style={style} ref={containerRef}>
      <ImageActual
        onLoad={onLoad}
        decoding="async"
        loaded={loaded}
        srcSet={!prerender && intersect ? srcSet : null}
        {...restProps}
      />
      <ImagePlaceholder
        loaded={loaded}
        src={placeholder}
        alt=""
        role="presentation"
      />
    </ImageContainer>
  )
});

const ImageContainer = styled.div`
  position: relative;
  transform: translate3d(0, 0, 0);
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
`;

const ImageActual = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  opacity: ${props => props.loaded ? 1 : 0};
`;

export default ProgressiveImage;
