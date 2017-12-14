import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import DisplacementTerrain from '../components/DisplacementTerrain';
import NeoNoire from '../fonts/neonoire.woff2';

class RetroIntro extends Component {
  render() {
    return (
      <RetroIntroWrapper>
        <RetroIntroBackground innerRef={canvas => this.threeCanvas = canvas}/>
        <RetroIntroText>
          <RetroIntroTitle>
            <RetroIntroTitleWord>Designer</RetroIntroTitleWord>
            <RetroIntroTitleSub data-text="Developer">Developer</RetroIntroTitleSub>
          </RetroIntroTitle>
          <RetroIntroName>Hamish Williams</RetroIntroName>
        </RetroIntroText>
      </RetroIntroWrapper>
    );
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;
    const terrain = new DisplacementTerrain(threeCanvas, {});
    terrain.init();
  };
}

injectGlobal`
  @font-face {
    font-family: 'Neo Noire';
    font-weight: 400;
    src: url(${NeoNoire}) format('woff2');
  }
`;

const hotPink = opacity => `rgba(255, 18, 255, ${opacity})`;

const RetroIntroWrapper = styled.div`
  background: linear-gradient(
    to bottom,
    ${props => props.theme.colorBackground(1)} 0%,
    #040C4A 100%
  );
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RetroIntroBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  canvas {
    position: absolute;
  }
`;

const RetroIntroText = styled.div`
  text-align: center;
  position: relative;
`;

const RetroIntroTitle = styled.h1`
  margin: 0;
`;

const RetroIntroTitleWord = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 80px;
`;

const RetroIntroTitleSub = styled.div`
  font-weight: normal;
  text-transform: uppercase;
  font-family: 'Neo Noire', sans-serif;
  color: ${hotPink(1)};
  background: -webkit-linear-gradient(${hotPink(1)}, ${hotPink(1)});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 80px;
  transform: rotate(-4deg);
  position: relative;
  top: -40px;

  &:after {
    content: attr(data-text);
    background: -webkit-linear-gradient(#01FFDF, #22A7EA);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: ${props => props.theme.colorPrimary(1)};
    position: absolute;
    left: -2px;
    top: -4px;
  }
`;

const RetroIntroName = styled.h2`
  text-transform: uppercase;
  font-size: 24px;
  letter-spacing: 0.2em;
  color: ${props => props.theme.colorText(0.8)};
  margin: 0;
  font-weight: 500;
  text-align: center;
  position: relative;
  top: -20px;
`;

export default RetroIntro;
