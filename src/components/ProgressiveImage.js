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
    const { placeholder, className, style, width, height, ...props } = this.props;
    const { loaded } = this.state;

    return (
      <ImageContainer className={className} style={style}>
        <ImageActual
          onLoad={this.onLoad}
          decoding="async"
          loaded={loaded}
          width={width}
          height={height}
          {...props}
        />
        <ImagePlaceholder
          loaded={loaded}
          src={placeholder}
          width={width}
          height={height}
          alt=""
          role="presentation"
        />
      </ImageContainer>
    )
  }
}

const ImageContainer = styled.div`
  position: relative;
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
