import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';
import DisplacementSphere from '../components/DisplacementSphere';
import DecoderText from '../components/DecoderText';
import Button from '../components/Button';
import { Media } from '../utils/StyleUtils';
import projectSpr from '../assets/project-spr.png';
import projectSprLarge from '../assets/project-spr-large.png';
const disciplines = ['Developer', 'Animator', 'Illustrator', 'Modder'];
const Fragment = React.Fragment;

class Intro extends Component {
  state = {
    disciplineIndex: 0,
    hideScrollIndicator: false,
    scrollY: 0,
    currentSection: null,
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;
    const sphere = new DisplacementSphere(threeCanvas);
    requestAnimationFrame(() => sphere.init());
    this.switchDiscipline();
    window.addEventListener('scroll', this.handleScroll);
    this.setState({currentSection: this.intro});
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const scrollY = window.scrollY;
    const revealSections = [this.intro, this.projectOne, this.projectTwo];

    if (scrollY >= 50) {
      this.setState({hideScrollIndicator: true});
    } else {
      this.setState({hideScrollIndicator: false});
    }

    for (const section of revealSections) {
      const showSection = this.isInViewport(section);
      if (showSection) this.setState({currentSection: section});
    }

    this.setState({scrollY});
  }

  isInViewport = (elem) => {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top <= window.innerHeight * 0.8 && bounding.top >= 0
    );
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
    const { disciplineIndex, hideScrollIndicator, currentSection } = this.state;

    return (
      <Container>
        <IntroContent innerRef={(section) => this.intro = section}>
          <Transition
            in={true}
            appear
            timeout={3000}
          >
            {(appearStatus) => (
              <Fragment>
                <IntroBackground
                  innerRef={canvas => this.threeCanvas = canvas}
                  status={appearStatus}
                />
                <IntroText>
                  <IntroName>
                    <DecoderText text="Hamish Williams" />
                  </IntroName>
                  <IntroTitle>
                    <IntroTitleRow>
                      <IntroTitleWord status={appearStatus} delay="0.2s">Designer</IntroTitleWord>
                      <IntroTitleLine status={appearStatus} />
                    </IntroTitleRow>
                    <TransitionGroup component={IntroTitleRow}>
                      {disciplines.map((item, index) => (
                        <Transition
                          appear
                          timeout={{enter: 3000, exit: 2000}}
                          key={`${item}_${index}`}
                          mountOnEnter
                          unmountOnExit
                        >
                          {(status) => (
                            <IntroTitleWord
                              plus
                              delay="0.5s"
                              status={status}
                            >
                              {item}
                            </IntroTitleWord>
                          )}
                        </Transition>
                      )).filter((item, index) => index === disciplineIndex)}
                    </TransitionGroup>
                  </IntroTitle>
                </IntroText>
                <ScrollIndicator isHidden={hideScrollIndicator} status={appearStatus} />
              </Fragment>
            )}
          </Transition>
        </IntroContent>
        <ProjectSection innerRef={(project) => this.projectOne = project}>
          <Transition
            in={currentSection === this.projectOne}
            timeout={400}
          >
            {(status) => (
              <Fragment>
                <ProjectDetails status={status}>
                  <ProjectIndex>01</ProjectIndex>
                  <ProjectTitle>Designing the future of education</ProjectTitle>
                  <ProjectDescription>
                    A description for this work example to prompt
                    clicking a link to learn more
                  </ProjectDescription>
                  <Button icon="arrowRight">View Project</Button>
                </ProjectDetails>
                <ProjectPreview>
                  <ProjectImageLaptop
                    status={status}
                    srcSet={`${projectSpr} 1x, ${projectSprLarge} 2x`}
                    alt="Smart Sparrow Lesson author"
                  />
                </ProjectPreview>
              </Fragment>
            )}
          </Transition>
        </ProjectSection>
        <ProjectSection innerRef={(project) => this.projectTwo = project}>
          Ayy lmao
        </ProjectSection>
      </Container>
    );
  }
}

const Container = styled.main`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const IntroContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 120px;

  @media (max-width: ${Media.tablet}) {
    padding-left: 60px;
  }

  @media (max-width: ${Media.mobile}) {
    padding-left: 0;
  }
`;

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const IntroBackground = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  canvas {
    position: absolute;
    animation-duration: 3s;
    animation-delay: 0.5s;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    animation-fill-mode: forwards;
    opacity: 0;

    ${props => props.status === 'entering' &&`
      animation-name: ${AnimBackgroundFade};
    `}

    ${props => props.status === 'entered' &&`
      opacity: 1;
    `}
  }
`;

const IntroText = styled.section`
  max-width: 860px;
  width: 100%;
  position: relative;
  top: -20px;
  padding: 0 ${props => props.theme.spacingOuter.desktop};

  @media (max-width: ${Media.tablet}) {
    padding: 0 100px;
  }

  @media (max-width: ${Media.mobile}) {
    padding: 0 ${props => props.theme.spacingOuter.mobile};
    top: 0;
  }
`;

const Fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const IntroName = styled.h2`
  text-transform: uppercase;
  font-size: 24px;
  letter-spacing: 0.3em;
  color: ${props => props.theme.colorText(0.8)};
  margin-bottom: 60px;
  margin-top: 0;
  font-weight: 500;
  line-height: 1;
  opacity: 0;
  animation: ${Fade} 0.5s ease 0.2s forwards;

  @media (max-width: 860px) {
    font-size: 18px;
    margin-bottom: 40px;
  }

  @media (max-width: 600px) {
    margin-bottom: 25px;
    letter-spacing: 0.2em;
    white-space: nowrap;
    overflow: hidden;
  }

  .code {
    opacity: 0.8;
    font-weight: 400;
    font-family: 'Hiragino Sans', sans-serif;
    line-height: 0;
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

const IntroTitleWord = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  color: ${props => props.theme.colorText(0)};
  transition: opacity 0.5s ease 0.4s;

  ${props => props.status === 'entering' &&`
    animation-name: ${AnimTextReveal(props)};
  `}

  ${props => props.status === 'entered' &&`
    color: ${props.theme.colorText(1)};
  `}

  ${props => props.status === 'exiting' &&`
    color: ${props.theme.colorText(1)};
    opacity: 0;
    position: absolute;
    top: 0;
    z-index: 0;
  `}

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colorPrimary(1)};
    opacity: 0;
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

    ${props => props.status === 'entering' &&`
      animation-name: ${AnimTextRevealMask};
    `}

    ${props => props.status === 'entered' &&`
      opacity: 1;
      transform: scaleX(0);
      transform-origin: right;
    `}
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
  animation-duration: 0.8s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  transform-origin: left;
  opacity: 0;

  ${props => props.status === 'entering' &&`
    animation-name: ${AnimLineIntro};
  `}

  ${props => props.status === 'entered' &&`
    transform: scaleX(1);
    opacity: 1;
  `}
`;

const AnimScrollIndicator = keyframes`
  0% {
    transform: translate3d(-1px, 0, 0);
  }
  40% {
    transform: translate3d(-1px, 8px, 0);
  }
  60% {
    transform: translate3d(-1px, 0, 0);
  }
  100% {
    transform: translate3d(-1px, 0, 0);
  }
`;

const ScrollIndicator = styled.div`
  border: 2px solid ${props => props.theme.colorWhite(0.4)};
  border-radius: 20px;
  width: 22px;
  height: 32px;
  position: fixed;
  bottom: 64px;
  transition: all 0.4s ease;
  opacity: 0;

  ${props => props.status === 'entered' &&`
    opacity: 1;
  `}

  ${props => props.isHidden &&`
    opacity: 0;
    transform: translateY(20px);
  `}

  &:before {
    content: '';
    height: 6px;
    width: 2px;
    background: ${props => props.theme.colorWhite(0.4)};
    border-radius: 4px;
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-1px);
    animation: ${AnimScrollIndicator} 1.2s ease infinite;
  }
`;

const ProjectSection = styled.section`
  height: 100vh;
  top: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 220px;

  @media (max-width: ${Media.tablet}) {
    padding-left: 160px;
    padding-right: 80px;
    flex-direction: column-reverse;
    height: auto;
    min-height: 100vh;
  }

  @media (max-width: ${Media.mobile}) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const ProjectDetails = styled.div`
  flex: 0 0 410px;
  opacity: 0;
  transition: opacity 0.4s ease;

  ${props => props.status === 'entering' &&`
    transition-delay: 0.2s;
    opacity: 1;
  `}

  ${props => props.status === 'entered' &&`
    opacity: 1;
  `}

  @media (max-width: ${Media.tablet}) {
    flex: 0 0 auto;
    max-width: 410px;
  }
`;

const ProjectPreview = styled.div`
  flex: 0 1 auto;
  overflow: hidden;
`;

const ProjectIndex = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${props => props.theme.colorPrimary(1)};
  position: relative;
  display: flex;
  margin-bottom: 32px;

  &:before {
    content: '';
    position: relative;
    display: block;
    height: 2px;
    background: ${props => props.theme.colorPrimary(1)};
    width: 96px;
    top: 6px;
    margin-right: 15px;
  }
`;

const ProjectTitle = styled.h2`
  font-size: 42px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 16px;
  padding: 0;
  color: ${props => props.theme.colorText(1)};

  @media (max-width: ${Media.mobile}) {
    font-size: 28px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 18px;
  line-height: 1.4;
  color: ${props => props.theme.colorText(0.8)};
  margin-bottom: 38px;

  @media (max-width: ${Media.mobile}) {
    font-size: 16px;
  }
`;

const ProjectImageLaptop = styled.img`
  width: 140%;
  transition: all 0.4s ${props => props.theme.curveFastoutSlowin};
  transform: translate3d(10%, 0, 0);
  opacity: 0;

  ${props => props.status === 'entering' &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition-delay: 0.4s;
    transition-duration: 1s;
  `}

  ${props => props.status === 'entered' &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  @media (max-width: ${Media.tablet}) {
    width: 100%;
    margin-bottom: 60px;
  }

  @media (max-width: ${Media.mobile}) {
    margin-bottom: 30px;
  }
`;

export default Intro;
