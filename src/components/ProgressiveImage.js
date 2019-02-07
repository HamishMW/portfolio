import React, { useState } from 'react';
import styled from 'styled-components/macro';

export default function ProgressiveImage(props) {
  const { placeholder, className, style, srcSet, visible, ...restProps } = props;
  const [loaded, setLoaded] = useState();

  const onLoad = () => {
    setLoaded(true);
  }

  const getSrcSet = (visible, srcSet) => {
    const lazyLoad = typeof visible !== 'undefined';

    if (lazyLoad && !visible) {
      return null;
    }

    if (lazyLoad && visible) {
      return srcSet;
    }

    return srcSet;
  }

  const actualSrcSet = getSrcSet(visible, srcSet);

  return (
    <ImageContainer className={className} style={style}>
      <ImageActual
        onLoad={onLoad}
        decoding="async"
        loaded={loaded}
        srcSet={actualSrcSet}
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
}

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
