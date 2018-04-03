import React from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { Media } from '../utils/StyleUtils';
import Button, { LinkButton } from '../components/Button';
import Svg from '../utils/Svg';
import phone from '../assets/phone.png';
import phoneLarge from '../assets/phone-large.png';
const Fragment = React.Fragment;

const Project = ({
  id,
  visible,
  sectionRef,
  index,
  title,
  description,
  imageSrc,
  imageAlt,
  imageType,
  buttonText,
  buttonLink,
}) => (
  <ProjectSection index={index} innerRef={sectionRef} id={id}>
    <ProjectContent>
      <Transition in={visible} timeout={1200}>
        {(status) => (
          <Fragment>
            <ProjectDetails>
              <ProjectIndex status={status}>
                <ProjectIndexNumber status={status}>{index}</ProjectIndexNumber>
              </ProjectIndex>
              <ProjectTitle status={status}>{title}</ProjectTitle>
              <ProjectDescription status={status}>{description}</ProjectDescription>
              <ProjectButton status={status}>
                {buttonLink ?
                  <LinkButton
                    href={buttonLink}
                    target="_blank"
                    iconRight="arrowRight"
                  >
                    {buttonText}
                  </LinkButton>
                  : <Button iconRight="arrowRight">{buttonText}</Button>
                }
              </ProjectButton>
            </ProjectDetails>
            <ProjectPreview>
              {imageType === 'laptop' &&
                <ProjectPreviewContentLaptop>
                  <ProjectImageLaptop status={status} srcSet={imageSrc[0]} alt={imageAlt[0]} />
                  <ProjectImageLaptopSvg status={status} icon="projects" />
                </ProjectPreviewContentLaptop>
              }
              {imageType === 'phone' &&
                <ProjectPreviewContentPhone>
                  <ProjectPhoneImageSvg status={status} icon="projects" />
                  {imageSrc && imageSrc.map((src, index) => (
                    <ProjectPhone first={index === 0} status={status} key={`img_${index}`}>
                      <ProjectPhoneFrame
                        srcSet={`${phone} 1x, ${phoneLarge} 2x`}
                        alt=""
                        role="presentation"
                      />
                      <ProjectPhoneImage
                        srcSet={imageSrc[index]}
                        alt={imageAlt[index]}
                      />
                    </ProjectPhone>
                  ))}
                </ProjectPreviewContentPhone>
              }
            </ProjectPreview>
          </Fragment>
        )}
      </Transition>
    </ProjectContent>
  </ProjectSection>
);


const ProjectSection = styled.section`
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  padding-right: 80px;
  padding-bottom: 40px;
  padding-left: 220px;
  margin-top: ${props => props.index === '01' ? '0' : '120px'};
  margin-bottom: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:nth-child(2n + 1) {
    grid-template-columns: 55% 40%;
  }

  @media (min-width: 1440px) {
    padding-left: 120px;
  }

  @media (max-width: ${Media.tablet}) {
    padding-left: 160px;
    padding-right: 80px;
    height: auto;
    margin-top: ${props => props.index === '01' ? '0' : '60px'};
    margin-bottom: 60px;
  }

  @media (max-width: ${Media.mobile}) {
    padding-left: 25px;
    padding-right: 25px;
    overflow-x: hidden;
  }
`;

const ProjectContent = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 43% 55%;
  grid-column-gap: 2%;

  ${ProjectSection}:nth-child(2n + 1) & {
    grid-template-columns: 55% 40%;
  }

  @media (max-width: ${Media.tablet}) {
    grid-template-columns: 100%;
    flex-direction: column-reverse;
    height: auto;

    ${ProjectSection}:nth-child(2n + 1) & {
      grid-template-columns: 100%;
    }
  }
`;

const ProjectDetails = styled.div`
  flex: 0 0 410px;
  max-width: 410px;

  ${ProjectSection}:nth-child(2n + 1) & {
    order: 2;
  }

  @media (max-width: ${Media.tablet}) {
    flex: 0 0 auto;
    max-width: 410px;
    order: 2;
    justify-self: center;
  }
`;

const ProjectPreview = styled.div`
  flex: 0 1 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-self: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ProjectPreviewContentPhone = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const ProjectPreviewContentLaptop = styled.div`
  position: relative;

  @media (max-width: ${Media.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;


const ProjectIndex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 32px;

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
`;

const ProjectIndexNumber = styled.span`
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

const ProjectTitle = styled.h2`
  font-size: 42px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
  margin-bottom: 16px;
  padding: 0;
  color: ${props => props.theme.colorText(1)};
  transition: all 0.6s ${props => props.theme.curveFastoutSlowin} 0.4s;
  transform: translate3d(0, 10px, 0);
  opacity: 0;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  @media (max-width: ${Media.mobile}) {
    font-size: 28px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 18px;
  line-height: 1.4;
  color: ${props => props.theme.colorText(0.8)};
  margin-bottom: 38px;
  transition: all 0.6s ${props => props.theme.curveFastoutSlowin} 0.6s;
  transform: translate3d(0, 10px, 0);
  opacity: 0;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  @media (max-width: ${Media.mobile}) {
    font-size: 16px;
  }
`;

const ProjectButton = styled.div`
  transition: all 0.6s ${props => props.theme.curveFastoutSlowin} 0.8s;
  transform: translate3d(0, 10px, 0);
  opacity: 0;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ProjectImageLaptop = styled.img`
  width: 160%;
  transition: all 0.4s ${props => props.theme.curveFastoutSlowin};
  transform: translate3d(40px, 0, 0);
  opacity: 0;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition-delay: 0.4s;
    transition-duration: 1s;
  `}

  @media (max-width: ${Media.tablet}) {
    width: 80%;
    margin-bottom: 120px;
  }

  @media (max-width: ${Media.mobile}) {
    width: 120%;
    margin-bottom: 60px;
  }
`;

const ProjectImageLaptopSvg = styled(Svg)`
  position: absolute;
  bottom: -40px;
  right: -200px;
  width: 600px;
  opacity: 0;
  transition: opacity 0.4s ease 0.6s;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    opacity: 1;
  `}

  @media (max-width: ${Media.tablet}) {
    width: 400px;
    right: 0;
    bottom: 64px;
  }

  @media (max-width: ${Media.mobile}) {
    width: 260px;
    bottom: 10px;
  }
`;

const ProjectPhone = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ${props => props.theme.curveFastoutSlowin};
  width: 100%;
  max-width: 100%;
  flex: 1 0 100%;

  ${props => props.first ?`
    left: calc(50% - 140px);
    top: -120px;
    transform: translate3d(0, -80px, 0);

    @media (max-width: ${Media.tablet}) {
      left: calc(50% - 48px);
      top: -60px;
    }
  `:`
    left: calc(-50% + 20px);
    top: 120px;
    transform: translate3d(0, 80px, 0);

    @media (max-width: ${Media.tablet}) {
      left: calc(-50% + 40px);
      top: 60px;
    }
  `}

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition-delay: 0.4s;
    transition-duration: 1s;

    @media (max-width: ${Media.tablet}) {
      transform: translate3d(0, 0, 0);
    }
  `}
`;

const ProjectPhoneFrame = styled.img`
  position: absolute;

  @media (max-width: ${Media.tablet}) {
    width: 248px;
  }
`;

const ProjectPhoneImage = styled.img`
  box-shadow: 0 0 0 2px #1C1C1C;
  position: relative;
  top: -14px;

  @media (max-width: ${Media.tablet}) {
    box-shadow: 0 0 0 1px #1C1C1C;
    width: 152px;
    top: -9px;
  }
`;

const ProjectPhoneImageSvg = styled(Svg)`
  position: absolute;
  transform: translateY(260px);
  width: 600px;
  transition: opacity 0.6s ease 0.6s;
  opacity: 0;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    opacity: 1;
  `}

  @media (max-width: ${Media.tablet}) {
    width: 400px;
    transform: translateY(180px);
  }

  @media (max-width: ${Media.mobile}) {
    width: 320px;
    transform: translateY(160px);
  }
`;

export default Project;
