import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import DisplacementSphere from '../Components/DisplacementSphere';
import './Intro.css';
const disciplines = ['Developer', 'Animator', 'Illustrator'];

class Intro extends Component {
  state = {
    index: 1,
    discipline: disciplines[0],
  }

  switchDiscipline() {
    setInterval(() => {
      let index = this.state.index >= disciplines.length - 1 ? 0 : this.state.index + 1;

      this.setState({
        discipline: disciplines[this.state.index],
        index: index,
      });
    }, 5000);
  }

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
              <div
                ref={(element) => {this.disciplineElement = element;}}>
                <CSSTransitionGroup
                  transitionName="example"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                  <div className="Intro__title-word Intro__title-word--plus">{this.state.discipline}</div>
                </CSSTransitionGroup>
              </div>
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
    // this.switchDiscipline();
  };
}

export default Intro;
