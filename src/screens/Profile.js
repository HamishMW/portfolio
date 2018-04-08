import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Transition } from 'react-transition-group';
import Anchor from '../components/Anchor';
import { RouterButton } from '../components/Button';
import DecoderText from '../components/DecoderText';
import ProgressiveImage from '../components/ProgressiveImage';
import Svg from '../utils/Svg';
import ProfileImg from '../assets/profile.jpg';
import ProfileImgLarge from '../assets/profile-large.jpg';
import ProfileImgPlaceholder from '../assets/profile-placeholder.jpg';
import { Media } from '../utils/StyleUtils';

const SparrowLink = 'https://www.smartsparrow.com';
const ModLink = 'https://www.nexusmods.com/skyrimspecialedition/mods/4806/';

const ProfileText = ({ status }) => (
  <React.Fragment>
    <ProfileTitle>
      <DecoderText
        text="Hi there"
        start={status === 'entering'}
        offset={200}
      />
    </ProfileTitle>
    <ProfileDescription>
      I’m Hamish, currently I live in Sydney, working as the lead product designer
      at <Anchor href={SparrowLink} target="_blank">Smart Sparrow</Anchor>. My projects
      include UX design, UI animations, and icon illustration. Being comfortable with
      code allows me to rapidly prototype and validate experiences.
    </ProfileDescription>
    <ProfileDescription>
      In my spare time I like to practice Brazilian Jiu Jitsu, play video games,
      and <Anchor href={ModLink} target="_blank">make mods</Anchor>. I’m always down
      for hearing about new projects, so feel free to drop me a line.
    </ProfileDescription>
  </React.Fragment>
);

const Profile = ({
  id,
  visible,
  sectionRef,
}) => (
  <ProfileSection id={id} innerRef={sectionRef}>
    <Transition in={visible} timeout={3000}>
      {(status) => (
        <ProfileContent>
          <ProfileColumn>
            <ProfileText status={status} />
            <RouterButton
              secondary
              to="/contact"
              style={{marginTop: 20}}
              icon="send"
            >
              Send me a message
            </RouterButton>
          </ProfileColumn>
          <ProfileColumn>
            <ProfileTag status={status}>
              <ProfileTagText status={status}>About Me</ProfileTagText>
            </ProfileTag>
            <ProfileImageContainer status={status}>
              <ProfileImage
                status={status}
                placeholder={ProfileImgPlaceholder}
                srcSet={`${ProfileImg} 1x, ${ProfileImgLarge} 2x`}
                alt="Me at the Torii on Miyajima, Japan"
              />
              <ProfileSvg icon="profile" />
            </ProfileImageContainer>
          </ProfileColumn>
        </ProfileContent>
      )}
    </Transition>
  </ProfileSection>
);

const ProfileSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  margin-top: 120px;
  margin-bottom: 120px;
  padding-top: 40px;
  padding-right: 80px;
  padding-bottom: 40px;
  padding-left: 220px;
  display: flex;
  justify-content: center;

  @media (min-width: 1440px) {
    padding-left: 120px;
  }

  @media (max-width: ${Media.tablet}) {
    padding-left: 160px;
    padding-right: 80px;
    height: auto;
    margin-top: 80px;
    margin-bottom: 80px;
  }

  @media (max-width: ${Media.mobile}) {
    padding-left: 25px;
    padding-right: 25px;
    overflow-x: hidden;
  }

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    padding: 0 ${props => props.theme.spacingOuter.mobile};
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 44% 48%;
  grid-column-gap: 8%;
  max-width: 1000px;
  width: 100%;

  @media (max-width: ${Media.tablet}) {
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
  font-size: 42px;
  margin: 0;
  font-weight: 500;
  margin-bottom: 40px;
`;

const ProfileDescription = styled.p`
  font-size: 22px;
  line-height: 1.4;
  margin: 0;
  margin-bottom: 30px;

  @media (max-width: ${Media.mobile}) {
    font-size: 18px;
  }
`;

const ProfileTag = styled.div`
  margin-top: 220px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;

  &:before {
    content: '';
    position: relative;
    display: block;
    height: 2px;
    top: -1px;
    background: ${props => props.theme.colorPrimary(1)};
    width: 96px;
    margin-right: 15px;
    transition: all 0.4s ${props => props.theme.curveFastoutSlowin} 1s;
    transform: scale3d(0, 1, 1);
    transform-origin: left;
  }

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    &:before {
      transform: scale3d(1, 1, 1);
    }
  `}

  @media (max-width: ${Media.tablet}) {
    margin-top: 30px;
  }
`;

const ProfileTagText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colorPrimary(1)};
  transform: translateX(-10px);
  opacity: 0;
  transition: all 0.4s ${props => props.theme.curveFastoutSlowin} 1.3s;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    transform: translateX(0);
    opacity: 1;
  `}
`;

const AnimProfileImage = keyframes`
  0% {
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

const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  transform: translate3d(0, 0, 0);

  &:before {
    content: '';
    background: ${props => props.theme.colorPrimary(1)};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scale3d(0, 1, 1);
    transform-origin: left;
    z-index: 16;
  }

  ${props => props.status === 'entering' &&`
    &:before {
      animation: ${AnimProfileImage} 1.8s ${props.theme.curveFastoutSlowin};
    }
  `}
`;

const ProfileImage = styled(ProgressiveImage)`
  max-width: 480px;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 0.4s ease 0.9s;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    opacity: 1;
  `}
`;

const ProfileSvg = styled(Svg)`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate3d(50%, -80px, 0);
  height: 620px;
  z-index: 32;

  @media (max-width: ${Media.tablet}) {
    height: 460px;
  }

  @media (max-width: ${Media.mobile}) {
    height: 400px;
  }
`;

export default Profile;
