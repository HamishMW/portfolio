import React, { Component } from 'react';
import DisplacementSphere from '../Components/DisplacementSphere';
import './Intro.css';

class Intro extends Component {
  render() {
    return (
      <div className="Intro">
        <div className="Intro__background" ref={(canvas) => {this.threeCanvas = canvas;}}/>
        <div className="Intro__text">
          <h2 className="Intro__name">Hamish Williams</h2>
          <h1 className="Intro__title">
            <div className="Intro__title-row">
              <div className="Intro__title-word">Designer</div>
              <div className="Intro__title-line" />
            </div>
            <div className="Intro__title-row">
              <div className="Intro__title-word Intro__title-word--plus">Developer</div>
            </div>
          </h1>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;
    const props = {};
    const sphere = new DisplacementSphere(threeCanvas, props);
    sphere.init();
  };
}

export default Intro;
