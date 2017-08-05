import React, { Component } from 'react';
import DisplacementTerrain from '../Components/DisplacementTerrain';
import './RetroIntro.css';

class RetroIntro extends Component {
  render() {
    return (
      <div className="RetroIntro">
        <div className="RetroIntro__background" ref={(canvas) => {this.threeCanvas = canvas;}}/>
        <div className="RetroIntro__text">
          <h1 className="RetroIntro__title">
            <div className="RetroIntro__title-word">Designer</div>
            <div className="RetroIntro__title-sub">Robot Ninja</div>
          </h1>
          <h2 className="RetroIntro__name">Hamish Williams</h2>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;
    const props = {};
    const terrain = new DisplacementTerrain(threeCanvas, props);
    terrain.init();
  };
}

export default RetroIntro;
