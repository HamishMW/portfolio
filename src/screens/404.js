import React from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { Transition } from 'react-transition-group';
import { Helmet } from 'react-helmet-async';
import { RouterButton } from 'components/Button';
import DecoderText from 'components/DecoderText';
import { media, rgba } from 'utils/styleUtils';
import Notfound from 'assets/notfound.mp4';
import NotfoundPoster from 'assets/notfound.jpg';

function NotFound() {
  return (
    <NotFoundSection>
      <Helmet>
        <title tag="title">404 | Not Found</title>
        <meta name="description" content="404 page not found. This page doesn't exist" />
      </Helmet>
      <Transition
        appear
        in={true}
        timeout={0}
        onEnter={node => node && node.offsetHeight}
      >
        {status => (
          <React.Fragment>
            <NotfoundDetails>
              <NotFoundText>
                <NotFoundTitle status={status}>404</NotFoundTitle>
                <NotFoundSubHeading status={status} aria-hidden>
                  <DecoderText text="Error: Redacted" start={status !== 'exited'} offset={100} />
                </NotFoundSubHeading>
                <NotFoundDescription status={status}>
                  This page could not be found. It either doesn’t exist or was deleted.
                  Or perhaps you don’t exist.
                </NotFoundDescription>
                <NotFoundButton
                  secondary
                  iconHoverShift
                  status={status}
                  to="/"
                  icon="chevronRight"
                >
                  Back to homepage
                </NotFoundButton>
              </NotFoundText>
            </NotfoundDetails>

            <NotFoundVideoContainer status={status}>
              <NotFoundVideo
                autoPlay
                muted
                loop
                playsInline
                poster={NotfoundPoster}
                status={status}
              >
                <source src={Notfound} type="video/mp4" />
              </NotFoundVideo>
              <NotFoundCredit status={status}
                href="https://twitter.com/ruinergame"
                target="_blank"
                rel="noopener noreferrer"
              >
                Animation from Ruiner
              </NotFoundCredit>
            </NotFoundVideoContainer>
          </React.Fragment>
        )}
      </Transition>
    </NotFoundSection>
  );
}

const NotFoundSection = styled.section`
  display: grid;
  grid-template-columns: 45% 55%;
  height: 100vh;
  padding-left: 140px;

  @media(max-width: ${media.tablet}) {
    padding-top: 80px;
    padding-bottom: 80px;
    padding-left: 80px;
    grid-template-columns: 100%;
    min-height: 100vh;
    height: auto;
  }

  @media(max-width: ${media.mobile}) {
    padding-left: 0;
  }
`;

const AnimVideo = keyframes`
  0% {
    opacity: 0;
    transform: scale3d(0, 1, 1);
    transform-origin: left;
  }
  49% {
    transform: scale3d(1, 1, 1);
    transform-origin: left;
  }
  50% {
    transform: scale3d(1, 1, 1);
    transform-origin: right;
  }
  100% {
    transform: scale3d(0, 1, 1);
    transform-origin: right;
  }
`;

const NotFoundVideoContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border: 30px solid transparent;

  @media (max-width: ${media.mobile}) {
    min-height: 240px;
    grid-row: 1;
  }

  &::after {
    content: '';
    background: ${props => props.theme.colorAccent};
    animation-name: ${props => props.status === 'entered' && css`${AnimVideo}`};
    animation-duration: 1.8s;
    animation-timing-function: ${props => props.theme.curveFastoutSlowin};

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scale3d(0, 1, 1);
    transform-origin: left;
    z-index: 16;
  }
`;

const NotFoundVideo = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: relative;
  opacity: 0;
  transition-property: opacity;
  transition-delay: 1s;
  transition-duration: 0.4s;

  ${props => props.status === 'entered' && css`
    opacity: 1;
  `}

  @media(max-width: ${media.mobile}) {
    left: 0;
  }
`;

const NotFoundCredit = styled.a`
  color: ${props => rgba(props.theme.colorWhite, 0.4)};
  background: ${props => rgba(props.theme.colorBlack, 0.6)};
  padding: 4px 8px;
  font-size: 14px;
  position: absolute;
  bottom: 16px;
  left: 16px;
  transform: translate3d(0, 0, 0);
  text-decoration: none;
  transition-property: all;
  transition-delay: 0.4s;
  transition-duration: 0.4s;
  opacity: 0;

  ${props => props.status === 'entered' && css`
    opacity: 1;
  `}

  &:hover,
  &:focus {
    color: ${props => props.theme.colorWhite};
  }
`;

const NotfoundDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  height: 100%;

  @media(max-width: ${media.mobile}) {
    padding: 0 30px;
    grid-row: 2;
  }
`;

const NotFoundText = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  width: 100%;
`;

const NotFoundTitle = styled.h1`
  margin: 0;
  margin-bottom: 16px;
  font-size: 86px;
  font-weight: 500;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: 0.1s;
  transform: translate3d(0, 40px, 0);
  opacity: 0;
  color: ${props => props.theme.colorTitle};

  @media (max-width: ${media.mobile}) {
    font-size: 64px;
  }

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const NotFoundSubHeading = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${props => rgba(props.theme.colorText, 0.4)};
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: 0.2s;
  transform: translate3d(0, 40px, 0);
  opacity: 0;
  max-width: 100%;
  white-space: nowrap;
  flex: 0 0 auto;

  @media (max-width: ${media.mobile}) {
    font-size: 18px;
  }

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const NotFoundDescription = styled.p`
  color: ${props => rgba(props.theme.colorText, 0.9)};
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  font-size: 18px;
  line-height: 1.4;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: 0.3s;
  transform: translate3d(0, 40px, 0);
  opacity: 0;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const NotFoundButton = styled(RouterButton)`
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: 0.4s;
  transform: translate3d(0, 40px, 0);
  opacity: 0;
  align-self: flex-start;
  padding-left: 3px;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

export default NotFound;
