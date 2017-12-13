import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import DisplacementTerrain from '../components/DisplacementTerrain';
import NeoNoire from '../fonts/neonoire.woff2';
import './RetroIntro.css';

class RetroIntro extends Component {
  render() {
    return (
      <div className="RetroIntro">
        <div className="RetroIntro__background" ref={(canvas) => {this.threeCanvas = canvas;}}/>
        <div className="RetroIntro__text">
          <h1 className="RetroIntro__title">
            <div className="RetroIntro__title-word">Designer</div>
            <div className="RetroIntro__title-sub" data-text="Developer">Developer</div>
          </h1>
          <h2 className="RetroIntro__name">Hamish Williams</h2>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;
    const props = {video: this.video};
    const terrain = new DisplacementTerrain(threeCanvas, props);
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

export default RetroIntro;
