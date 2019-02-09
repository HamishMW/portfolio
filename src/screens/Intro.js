import React from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { TransitionGroup, Transition } from 'react-transition-group';
import { Media, AnimFade } from '../utils/StyleUtils';
import DecoderText from '../components/DecoderText';

const prerender = navigator.userAgent === 'ReactSnap';

const Intro = React.memo((props) => {
  const {
    id, sectionRef, threeCanvas, disciplines, disciplineIndex,
    scrollIndicatorHidden, backgroundLoaded,
  } = props;

  return (
    <IntroContent ref={sectionRef} id={id}>
      <Transition
        appear
        in={!prerender}
        timeout={3000}
      >
        {(appearStatus) => (
          <React.Fragment>
            <IntroBackground
              aria-hidden="true"
              ref={threeCanvas}
              isLoaded={backgroundLoaded}
            />
            <IntroText>
              <IntroName aria-label="Hamish Williams">
                <DecoderText text="Hamish Williams" start={!prerender} offset={120} />
              </IntroName>
              <IntroTitle aria-label={`Designer + ${[
                disciplines.slice(0, -1).join(', '),
                disciplines.slice(-1)[0],
              ].join(', and ')}`}>
                <IntroTitleRow>
                  <IntroTitleWord status={appearStatus} delay="0.2s">Designer</IntroTitleWord>
                  <IntroTitleLine status={appearStatus} />
                </IntroTitleRow>
                <TransitionGroup component={IntroTitleRow}>
                  {!prerender && disciplines.map((item, index) => (
                    <Transition
                      appear
                      timeout={{ enter: 3000, exit: 2000 }}
                      key={`${item}_${index}`}
                      mountOnEnter
                      unmountOnExit
                    >
                      {status => (
                        <IntroTitleWord plus delay="0.5s" status={status}>
                          {item}
                        </IntroTitleWord>
                      )}
                    </Transition>
                  )).filter((item, index) => index === disciplineIndex)}
                </TransitionGroup>
              </IntroTitle>
            </IntroText>
            <ScrollIndicator isHidden={scrollIndicatorHidden} status={appearStatus} />

          </React.Fragment>
        )}
      </Transition>
    </IntroContent>
  );
});

const IntroContent = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 120px;

  @media (min-width: ${Media.desktop}) {
    padding-right: 80px;
  }

  @media (max-width: ${Media.tablet}) {
    padding-left: 60px;
  }

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    padding-left: 0;
  }
`;

const AnimBackgroundFade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const IntroBackground = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  canvas {
    position: absolute;
    animation-duration: 3s;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};
    animation-fill-mode: forwards;
    opacity: 0;

    ${props => props.isLoaded && css`
      animation-name: ${AnimBackgroundFade};
    `}
  }
`;

const IntroText = styled.header`
  max-width: 860px;
  width: 100%;
  position: relative;
  top: -20px;
  padding: 0 ${props => props.theme.spacingOuter.desktop};

  @media (min-width: ${Media.desktop}) {
    padding: 0;
    max-width: 920px;
  }

  @media (max-width: ${Media.tablet}) {
    padding: 0 100px;
  }

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    padding: 0 ${props => props.theme.spacingOuter.mobile};
    top: 0;
  }

  @media ${Media.mobileLS} {
    padding: 0 100px;
  }
`;

const IntroName = styled.h1`
  text-transform: uppercase;
  font-size: 24px;
  letter-spacing: 0.3em;
  color: ${props => props.theme.colorText(0.8)};
  margin-bottom: 60px;
  margin-top: 0;
  font-weight: 500;
  line-height: 1;
  opacity: 0;
  animation: ${css`${AnimFade} 0.4s ease 0.6s forwards`};

  @media (min-width: ${Media.desktop}) {
    font-size: 28px;
    margin-bottom: 40px;
  }

  @media (max-width: ${Media.tablet}) {
    font-size: 18px;
    margin-bottom: 40px;
  }

  @media (max-width: ${Media.mobile}) {
    margin-bottom: 25px;
    margin-top: -30px;
    letter-spacing: 0.2em;
    white-space: nowrap;
    overflow: hidden;
  }

  @media ${Media.mobileLS} {
    margin-bottom: 20px;
    margin-top: 30px;
  }
`;

const IntroTitle = styled.h2`
  display: flex;
  flex-direction: column;
  font-size: 100px;
  margin: 0;
  letter-spacing: -0.005em;
  font-weight: 500;

  @media (min-width: ${Media.desktop}) {
    font-size: 120px;
  }

  @media (max-width: 860px) {
    font-size: 80px;
  }

  @media (max-width: 600px) {
    font-size: 42px;
  }
`;

const IntroTitleRow = styled.span`
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

const IntroTitleWord = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.curveFastoutSlowin};
  color: ${props => props.theme.colorText(0)};
  transition: opacity 0.5s ease 0.4s;

  ${props => props.status === 'entering' && css`
    animation-name: ${AnimTextReveal(props)};
  `}

  ${props => props.status === 'entered' && css`
    color: ${props.theme.colorText(1)};
  `}

  ${props => props.status === 'exiting' && css`
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

    ${props => props.status === 'entering' && css`
      animation-name: ${AnimTextRevealMask};
    `}

    ${props => props.status === 'entered' && css`
      opacity: 1;
      transform: scaleX(0);
      transform-origin: right;
    `}
  }

  ${props => props.delay && css`
    animation-delay: ${props.delay};

    &:after {
      animation-delay: ${props.delay};
    }
  `}

  ${props => props.plus && css`
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

const IntroTitleLine = styled.span`
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

  ${props => props.status === 'entering' && css`
    animation-name: ${AnimLineIntro};
  `}

  ${props => props.status === 'entered' && css`
    transform: scaleX(1);
    opacity: 1;
  `}
`;

const AnimScrollIndicator = keyframes`
  0% {
    transform: translate3d(-1px, 0, 0);
    opacity: 0;
  }
  20% {
    transform: translate3d(-1px, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(-1px, 8px, 0);
    opacity: 0;
  }
`;

const ScrollIndicator = styled.div`
  border: 2px solid ${props => props.theme.colorWhite(0.4)};
  border-radius: 20px;
  width: 26px;
  height: 38px;
  position: fixed;
  bottom: 64px;
  transition: all 0.4s ease;
  opacity: 0;

  ${props => props.status === 'entered' && css`
    opacity: 1;
  `}

  ${props => props.isHidden && css`
    opacity: 0;
    transform: translateY(20px);
  `}

  &:before {
    content: '';
    height: 7px;
    width: 2px;
    background: ${props => props.theme.colorWhite(0.4)};
    border-radius: 4px;
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-1px);
    animation: ${css`${AnimScrollIndicator} 2s ease infinite`};
  }

  @media ${Media.mobileLS} {
    display: none;
  }

  @media (max-width: ${Media.mobile}) {
    display: none;
  }
`;

export default Intro;
