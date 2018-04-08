import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default class ProgressiveImage extends PureComponent {
  state = {
    loaded: false,
  };

  onLoad = () => {
    this.setState({loaded: true});
  }

  render() {
    const { src, srcSet, alt, placeholder, className, style, blur } = this.props;
    const { loaded } = this.state;

    return (
      <ImageContainer className={className} style={style}>
        <ImagePlaceholder
          blur={blur}
          loaded={loaded}
          src={placeholder}
          alt=""
        />
        <ImageActual
          onLoad={this.onLoad}
          loaded={loaded}
          src={src}
          srcSet={srcSet}
          alt={alt}
        />
      </ImageContainer>
    )
  }
}

const ImageContainer = styled.div`
  position: relative;
`;

const ImagePlaceholder = styled.img`
  opacity: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.4s ease;
  pointer-events: none;
  display: block;

  ${props => props.blur &&`
    filter: blur(${props.blur}px);
  `}

  ${props => props.loaded &&`
    opacity: 0;
  `}
`;

const ImageActual = styled.img`
  width: 100%;
  height: auto;
  display: block;
  opacity: 0;

  ${props => props.loaded &&`
    opacity: 1;
  `}
`;
