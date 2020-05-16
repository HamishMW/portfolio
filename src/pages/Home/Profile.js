import React, { Fragment, memo } from 'react';
import styled, { css } from 'styled-components/macro';
import { Transition } from 'react-transition-group';
import { Link } from 'components/Link';
import Anchor from 'components/Anchor';
import { RouterButton } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Divider from 'components/Divider';
import Image from 'components/Image';
import ProfileImg from 'assets/profile.jpg';
import ProfileImgLarge from 'assets/profile-large.jpg';
import ProfileImgPlaceholder from 'assets/profile-placeholder.jpg';
import { sectionPadding } from 'utils/style';
import { reflow } from 'utils/transition';
import { media } from 'utils/style';
import { ReactComponent as KatakanaProfile } from 'assets/katakana-profile.svg';

const ProfileText = ({ status, titleId }) => (
  <Fragment>
    <ProfileTitle status={status} id={titleId}>
      <DecoderText text="Hi there" start={status !== 'exited'} offset={140} />
    </ProfileTitle>
    <ProfileDescription status={status}>
      I’m Hamish, currently I live in Sydney working as a senior product designer at{' '}
      <Anchor href="https://www.qwilr.com" target="_blank">
        Qwilr
      </Anchor>
      . My projects include UX design, UI animations, and icon illustration. Being
      comfortable with code allows me to rapidly prototype and validate experiences.
    </ProfileDescription>
    <ProfileDescription status={status}>
      In my spare time I like to practice Brazilian Jiu Jitsu, play video games, and{' '}
      <Anchor as={Link} to="/projects/volkihar-knight">
        make mods
      </Anchor>
      . I’m always down for hearing about new projects, so feel free to drop me a line.
    </ProfileDescription>
  </Fragment>
);

function Profile(props) {
  const { id, visible, sectionRef } = props;
  const titleId = `${id}-title`;

  return (
    <ProfileSection id={id} ref={sectionRef} aria-labelledby={titleId} tabIndex={-1}>
      <Transition in={visible} timeout={0} onEnter={reflow}>
        {status => (
          <ProfileContent>
            <ProfileColumn>
              <ProfileText status={status} titleId={titleId} />
              <ProfileButton secondary status={status} to="/contact" icon="send">
                Send me a message
              </ProfileButton>
            </ProfileColumn>
            <ProfileColumn>
              <ProfileTag aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={status !== 'entered'}
                  collapseDelay={1000}
                />
                <ProfileTagText status={status}>About Me</ProfileTagText>
              </ProfileTag>
              <ProfileImage
                reveal
                delay={100}
                visible={visible}
                placeholder={ProfileImgPlaceholder}
                srcSet={`${ProfileImg} 480w, ${ProfileImgLarge} 960w`}
                sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                alt="Me at the Torii (gate) on Miyajima, an island off the coast of Hiroshima in Japan"
                width={480}
                height={560}
              />
              <ProfileSvg svg="profile" status={status} />
            </ProfileColumn>
          </ProfileContent>
        )}
      </Transition>
    </ProfileSection>
  );
}

const ProfileSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  margin-top: 60px;
  margin-bottom: 40px;
  padding-top: 60px;
  padding-right: 80px;
  padding-bottom: 40px;
  padding-left: 220px;
  display: flex;
  justify-content: center;
  ${sectionPadding}

  &:focus {
    outline: none;
  }

  @media (min-width: ${media.desktop}px) {
    padding-left: 120px;
  }

  @media (max-width: ${media.tablet}px) {
    padding-top: 50px;
    padding-right: 80px;
    padding-left: 160px;
    height: auto;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  @media (max-width: ${media.mobile}px) {
    margin-top: 0;
    padding-top: 90px;
    padding-left: 25px;
    padding-right: 25px;
    overflow-x: hidden;
  }

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    padding-right: var(--spaceOuter);
    padding-left: var(--spaceOuter);
  }

  @media ${media.mobileLS} {
    padding-right: var(--space4XL);
    padding-left: var(--space4XL);
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 44% 48%;
  grid-column-gap: 8%;
  max-width: var(--maxWidthL);
  width: 100%;

  @media (max-width: ${media.tablet}px) {
    max-width: 600px;
  }

  @media (max-width: ${media.tablet}px) {
    grid-template-columns: 100%;
  }
`;

const ProfileColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
  transform: translate3d(0, 0, 0);
`;

const ProfileTitle = styled.h2`
  font-size: var(--fontSizeH2);
  font-weight: var(--fontWeightMedium);
  color: var(--colorTextTitle);
  white-space: nowrap;
  margin: 0 0 var(--spaceL) 0;
  opacity: ${props => (props.status === 'entered' ? 1 : 0)};
  transition: opacity 0.8s ease 0.4s;

  @media (max-width: ${media.mobile}px) {
    margin-bottom: var(--spaceXL);
  }
`;

const ProfileDescription = styled.p`
  font-size: var(--fontSizeBodyL);
  line-height: var(--lineHeightBody);
  margin: 0 0 var(--spaceXL) 0;
  opacity: 0;
  transition: opacity 0.8s ease 0.6s;

  ${props =>
    props.status === 'entered' &&
    css`
      opacity: 1;
    `}
`;

const ProfileTag = styled.div`
  margin-top: 220px;
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: var(--space4XL) 1fr;
  grid-gap: 12px;
  align-items: center;

  @media (max-width: ${media.tablet}px) {
    margin-top: 30px;
  }
`;

const ProfileTagText = styled.div`
  font-size: var(--fontSizeBodyS);
  font-weight: var(--fontWeightMedium);
  color: rgb(var(--rgbPrimary));
  transform: translateX(calc(var(--spaceM) * -1));
  opacity: 0;
  transition-property: opacity, transform;
  transition-timing-function: var(--curveFastoutSlowin);
  transition-duration: 0.4s;
  transition-delay: 1.3s;

  ${props =>
    props.status === 'entered' &&
    css`
      transform: translateX(0);
      opacity: 1;
    `}
`;

const ProfileImage = styled(Image)`
  max-width: 100%;
  width: 960px;
  height: auto;
`;

const ProfileSvg = styled(KatakanaProfile)`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate3d(50%, -80px, 0);
  height: 620px;
  z-index: 32;
  opacity: ${props => (props.status === 'entered' ? 1 : 0)};
  transition: opacity 0.4s ease 0.6s;
  fill: var(--colorTextTitle);

  @media (max-width: ${media.tablet}px) {
    height: 460px;
  }

  @media (max-width: ${media.mobile}px) {
    height: 400px;
  }
`;

const ProfileButton = styled(RouterButton)`
  opacity: 0;
  transition: opacity 0.8s ease 0.6s;

  ${props =>
    props.status === 'entered' &&
    css`
      opacity: 1;
    `}
`;

export default memo(Profile);
