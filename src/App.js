import React, { Component } from 'react';
import Header from './Components/Header';
import DisplacementSphere from './Components/DisplacementSphere';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div
          className="Background"
          ref={(canvas) => {this.threeCanvas = canvas;}}>
        </div>

        <div className="Intro">
          <div className="Intro__text">
            <h2 className="Intro__name">Hamish Williams</h2>
            <h1 className="Intro__title">
              <div className="Intro__title-word Intro__title-word--line">Designer</div>
              <div className="Intro__title-row">
                <div className="Intro__title-word Intro__title-word--plus">+</div>
                <div className="Intro__title-word">Developer</div>
              </div>
            </h1>
          </div>
        </div>

        <Header />
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

export default App;
