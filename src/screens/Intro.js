import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';
import DisplacementSphere from '../components/DisplacementSphere';
import { Media } from '../utils/StyleUtils';
const disciplines = ['Developer', 'Animator', 'Illustrator'];

class Intro extends Component {
  state = {
    disciplineIndex: 0,
    disciplineWord: disciplines[0],
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;
    const props = {};
    const sphere = new DisplacementSphere(threeCanvas, props);
    sphere.init();
    this.switchDiscipline();
  };

  switchDiscipline = () => {
    setInterval(() => {
      const { disciplineIndex } = this.state;
      const index = disciplineIndex >= disciplines.length - 1 ? 0 : disciplineIndex + 1;

      this.setState({
        disciplineIndex: index,
      });
    }, 5000);
  }

  render() {
    const { disciplineIndex, disciplineWord } = this.state;

    return (
      <IntroWrapper>
        <IntroBackground innerRef={canvas => this.threeCanvas = canvas} />
        <IntroText>
          <IntroName>Hamish Williams</IntroName>
          <IntroTitle>
            <IntroTitleRow>
              <IntroTitleWord>Designer</IntroTitleWord>
              <IntroTitleLine />
            </IntroTitleRow>
            <IntroTitleRow>
              <TransitionGroup>
                {disciplines.map((item, index) => (
                  <Transition
                    timeout={{enter: 1200, exit: 1000}}
                    key={`${item}_${index}`}
                    mountOnEnter
                    unmountOnExit
                  >
                    {(status) => (
                      <IntroTitleWord
                        plus
                        delay="0.3s"
                        status={status}
                      >
                        {item}
                      </IntroTitleWord>
                    )}
                  </Transition>
                )).filter((item, index) => index === disciplineIndex)}
              </TransitionGroup>
            </IntroTitleRow>
          </IntroTitle>
        </IntroText>
      </IntroWrapper>
    );
  }
}

const IntroWrapper = styled.main`
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

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const IntroBackground = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  canvas {
    position: absolute;
    animation-name: ${AnimBackgroundFade};
    animation-duration: 3s;
    animation-delay: 0.5s;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    animation-fill-mode: forwards;
    opacity: 0;
  }
`;

const IntroText = styled.section`
  max-width: 800px;
  width: 100%;
  position: relative;
  top: -20px;
  padding: 0 ${props => props.theme.spacingOuter.desktop};

  @media (max-width: ${Media.tablet}) {
    padding: 0 ${props => props.theme.spacingOuter.mobile};
  }

  @media (max-width: ${Media.mobile}) {
    padding: 0 ${props => props.theme.spacingOuter.mobile};
    top: 0;
  }
`;

const IntroName = styled.h2`
  text-transform: uppercase;
  font-size: 24px;
  letter-spacing: 0.2em;
  color: ${props => props.theme.colorText(0.8)};
  margin-bottom: 60px;
  margin-top: 0;
  font-weight: 500;

  @media (max-width: 860px) {
    font-size: 18px;
    margin-bottom: 40px;
  }

  @media (max-width: 600px) {
    margin-bottom: 25px;
  }
`;

const IntroTitle = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: 100px;
  margin: 0;
  letter-spacing: -0.005em;
  font-weight: 500;

  @media (max-width: 860px) {
    font-size: 80px;
  }

  @media (max-width: 600px) {
    font-size: 42px;
  }
`;

const IntroTitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const AnimTextReveal = props => keyframes`
  0% { color: ${props.theme.colorText(0)}; }
  50% { color: ${props.theme.colorText(0)}; }
  60% { color: ${props.theme.colorText(1)}; }
  100% { color: ${props.theme.colorText(1)}; }
`;

const AnimTextRevealMask = keyframes`
  0% {
    opacity: 1;
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: left;
  }
  51% {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: right;
  }
  100% {
    opacity: 1;
    transform: scaleX(0);
    transform-origin: right;
  }
`;

const AnimFade = props => keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const IntroTitleWord = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  animation-name: ${AnimTextReveal};
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  color: ${props => props.theme.colorText(0)};

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colorPrimary(1)};
    opacity: 0;
    animation-name: ${AnimTextRevealMask};
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    transform-origin: left;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }

  ${props => props.delay &&`
    animation-delay: ${props.delay};

    &:after {
      animation-delay: ${props.delay};
    }
  `}

  ${props => props.plus &&`
    &:before {
      content: '+';
      margin-right: 10px;
      opacity: 0.4;
    }
  `}

  ${props => props.status === 'exiting' &&`
    transition: opacity 0.5s ease 0.4s;
    opacity: 0;
    position: absolute;
    top: 0;
    z-index: 0;
  `}
`;

const AnimLineIntro = keyframes`
  0% {
    transform: scaleX(0);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
`;

const IntroTitleLine = styled.div`
  content: '';
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  width: 120%;
  display: flex;
  margin-left: 20px;
  animation-name: ${AnimLineIntro};
  animation-duration: 0.8s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  transform-origin: left;
  opacity: 0;
`;

export default Intro;
