import React, { Suspense, lazy, useMemo, useContext, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { TransitionGroup, Transition } from 'react-transition-group';
import { media, AnimFade, rgba, sectionPadding } from '../utils/styleUtils';
import DecoderText from '../components/DecoderText';
import Svg from '../components/Svg';
import { AppContext } from '../app/App';
import { useInterval, usePrevious, useWindowSize } from '../utils/hooks';

const DisplacementSphere = lazy(() => import('../components/DisplacementSphere'));
const prerender = navigator.userAgent === 'ReactSnap';

function Intro(props) {
  const { currentTheme } = useContext(AppContext);
  const { id, sectionRef, disciplines, scrollIndicatorHidden } = props;
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const windowSize = useWindowSize();
  const prevTheme = usePrevious(currentTheme);
  const introLabel = useMemo(() => [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(', and '), [disciplines]);
  const currentDisciplines = useMemo(() => disciplines.filter((item, index) => index === disciplineIndex), [disciplineIndex, disciplines]);
  const titleId = `${id}-title`;

  useInterval(() => {
    const index = (disciplineIndex + 1) % disciplines.length;
    setDisciplineIndex(index);
  }, 5000, currentTheme.id);

  useEffect(() => {
    if (prevTheme && prevTheme.id !== currentTheme.id) {
      setDisciplineIndex(0);
    }
  }, [currentTheme.id, prevTheme]);

  return (
    <IntroContent 
      ref={sectionRef} 
      id={id} 
      aria-labelledby={titleId} 
      tabIndex={-1}
    >
      <Transition
        key={currentTheme.id}
        appear={!prerender}
        in={!prerender}
        timeout={3000}
      >
        {status => (
          <React.Fragment>
            <Suspense fallback={<React.Fragment />}>
              <DisplacementSphere />
            </Suspense>
            <IntroText>
              <IntroName status={status} id={titleId}>
                <DecoderText text="Hamish Williams" start={!prerender} offset={120} />
              </IntroName>
              <IntroTitle>
                <IntroTitleLabel>{`Designer + ${introLabel}`}</IntroTitleLabel>
                <IntroTitleRow aria-hidden prerender={prerender}>
                  <IntroTitleWord status={status} delay="0.2s">Designer</IntroTitleWord>
                  <IntroTitleLine status={status} />
                </IntroTitleRow>
                <TransitionGroup component={IntroTitleRow} prerender={prerender}>
                  {currentDisciplines.map((item, index) => (
                    <Transition
                      appear
                      timeout={{ enter: 3000, exit: 2000 }}
                      key={`${item}_${index}`}
                    >
                      {status => (
                        <IntroTitleWord plus aria-hidden delay="0.5s" status={status}>
                          {item}
                        </IntroTitleWord>
                      )}
                    </Transition>
                  ))}
                </TransitionGroup>
              </IntroTitle>
            </IntroText>
            {windowSize.width > media.numTablet &&
              <MemoizedScrollIndicator
                isHidden={scrollIndicatorHidden}
                status={status}
              />
            }
            {windowSize.width <= media.numTablet &&
              <MemoizedMobileScrollIndicator
                isHidden={scrollIndicatorHidden}
                status={status}
              >
                <Svg icon="arrowDown" />
              </MemoizedMobileScrollIndicator>
            }
          </React.Fragment>
        )}
      </Transition>
    </IntroContent>
  );
};

const IntroContent = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${sectionPadding}
`;

const IntroText = styled.header`
  max-width: 780px;
  width: 100%;
  position: relative;
  top: -20px;

  @media (min-width: ${media.desktop}) {
    max-width: 920px;
  }

  @media (max-width: ${media.mobile}) {
    top: -30px;
  }

  @media (max-width: ${media.mobileLS}) {
    top: -16px;
  }
`;

const IntroName = styled.h1`
  text-transform: uppercase;
  font-size: 24px;
  letter-spacing: 0.3em;
  color: ${props => rgba(props.theme.colorText, 0.8)};
  margin-bottom: 40px;
  margin-top: 0;
  font-weight: 500;
  line-height: 1;
  opacity: 0;

  ${props => props.status === 'entering' && css`
    animation: ${css`${AnimFade} 0.6s ease 0.2s forwards`};
  `}

  ${props => props.status === 'entered' && css`
    opacity: 1;
  `}

  @media (min-width: ${media.desktop}) {
    font-size: 28px;
    margin-bottom: 40px;
  }

  @media (max-width: ${media.tablet}) {
    font-size: 18px;
    margin-bottom: 40px;
  }

  @media (max-width: ${media.mobile}) {
    margin-bottom: 20px;
    letter-spacing: 0.2em;
    white-space: nowrap;
    overflow: hidden;
  }

  @media ${media.mobileLS} {
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
  font-weight: ${props => props.theme.id === 'light' ? 600 : 500};

  @media (min-width: ${media.desktop}) {
    font-size: 120px;
  }

  @media (max-width: 860px) {
    font-size: 80px;
  }

  @media (max-width: 600px) {
    font-size: 42px;
  }
`;

const IntroTitleLabel = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
`;

const IntroTitleRow = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  ${props => props.prerender && css`
    opacity: 0;
  `}
`;

const AnimTextReveal = props => keyframes`
  0% { color: ${rgba(props.theme.colorTitle, 0)}; }
  50% { color: ${rgba(props.theme.colorTitle, 0)}; }
  60% { color: ${props.theme.colorTitle}; }
  100% { color: ${props.theme.colorTitle}; }
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
  color: ${props => rgba(props.theme.colorTitle, 0)};
  transition: opacity 0.5s ease 0.4s;

  ${props => props.status === 'entering' && css`
    animation-name: ${AnimTextReveal(props)};
  `}

  ${props => props.status === 'entered' && css`
    color: ${props.theme.colorTitle};
  `}

  ${props => props.status === 'exiting' && css`
    color: ${props.theme.colorTitle};
    opacity: 0;
    position: absolute;
    top: 0;
    z-index: 0;
  `}

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colorAccent};
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
  background: ${props => rgba(props.theme.colorText, 0.3)};
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
  border: 2px solid ${props => rgba(props.theme.colorText, 0.4)};
  border-radius: 20px;
  width: 26px;
  height: 38px;
  position: fixed;
  bottom: 64px;
  transition-property: opacity, transform;
  transition-duration: 0.6s;
  transition-timing-function: ease;
  opacity: ${props => props.status === 'entered' && !props.isHidden ? 1 : 0};
  transform: translate3d(0, ${props => props.isHidden ? '20px' : 0}, 0);

  &:before {
    content: '';
    height: 7px;
    width: 2px;
    background: ${props => rgba(props.theme.colorText, 0.4)};
    border-radius: 4px;
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-1px);
    animation: ${css`${AnimScrollIndicator} 2s ease infinite`};
  }

  @media ${media.mobileLS} {
    display: none;
  }
`;

const AnimMobileScrollIndicator = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const MobileScrollIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  opacity: ${props => props.status === 'entered' && !props.isHidden ? 1 : 0};
  transform: translate3d(0, ${props => props.isHidden ? '20px' : 0}, 0);
  animation-name: ${AnimMobileScrollIndicator};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(.8,.1,.27,1);
  transition-duration: 0.4s;

  @media ${media.mobileLS} {
    display: none;
  }

  svg {
    stroke: ${props => rgba(props.theme.colorText, 0.5)};
  }
`;

const MemoizedScrollIndicator = React.memo(ScrollIndicator);
const MemoizedMobileScrollIndicator = React.memo(MobileScrollIndicator);

export default React.memo(Intro);
