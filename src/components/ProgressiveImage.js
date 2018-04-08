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
    const { src, srcSet, alt, placeholder, className, style } = this.props;
    const { loaded } = this.state;

    return (
      <ImageContainer className={className} style={style}>
        <ImagePlaceholder loaded={loaded} src={placeholder} />
        <ImageActual
          onLoad={this.onLoad}
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
  transform: translate3d(0, 0, 0);
  display: flex;
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

  ${props => props.loaded &&`
    opacity: 0;
  `}
`;

const ImageActual = styled.img`

`;
