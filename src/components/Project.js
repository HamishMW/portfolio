import React from 'react';
import styled from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';
import { Media } from '../utils/StyleUtils';
import Button from '../components/Button';
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
}) => (
  <ProjectSection innerRef={sectionRef} id={id}>
    <Transition in={visible} timeout={400}>
      {(status) => (
        <Fragment>
          <ProjectDetails status={status}>
            <ProjectIndex>{index}</ProjectIndex>
            <ProjectTitle>{title}</ProjectTitle>
            <ProjectDescription>{description}</ProjectDescription>
            <Button iconRight="arrowRight">View Project</Button>
          </ProjectDetails>
          <ProjectPreview>
            {imageType === 'laptop' &&
              <ProjectPreviewContent>
                <ProjectImageLaptop status={status} srcSet={imageSrc[0]} alt={imageAlt[0]} />
                <ProjectImageLaptopSvg status={status} icon="projects" />
              </ProjectPreviewContent>
            }
            {imageType === 'phone' &&
              <ProjectPreviewContent>
                {imageSrc && imageSrc.map((src, index) => (
                  <ProjectPhone key={`img_${index}`}>
                    <ProjectPhoneImage status={status} srcSet={imageSrc[index]} alt={imageAlt[index]} />
                    <ProjectPhoneFrame srcSet={`${phone} 1x, ${phoneLarge} 2x`} />
                  </ProjectPhone>
                ))}

                <ProjectPhoneImageSvg status={status} icon="projects" />
              </ProjectPreviewContent>
            }
          </ProjectPreview>
        </Fragment>
      )}
    </Transition>
  </ProjectSection>
);


const ProjectSection = styled.section`
  height: 100vh;
  top: 100vh;
  margin-bottom: 20vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 43% 55%;
  grid-column-gap: 2%;
  padding-left: 220px;
  padding-right: 80px;

  &:nth-child(2n + 1) {
    grid-template-columns: 55% 40%;
  }

  @media (max-width: ${Media.tablet}) {
    grid-template-columns: 100%;
    padding-left: 160px;
    padding-right: 80px;
    flex-direction: column-reverse;
    height: auto;
    min-height: 100vh;
    padding: 10vh 0;
  }

  @media (max-width: ${Media.mobile}) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const ProjectDetails = styled.div`
  flex: 0 0 410px;
  max-width: 410px;
  opacity: 0;
  transition: opacity 0.4s ease;

  ${ProjectSection}:nth-child(2n + 1) & {
    order: 2;
  }

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
    order: 2;
    justify-self: center;
  }
`;

const ProjectPreview = styled.div`
  flex: 0 1 auto;
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  justify-self: center;
`;

const ProjectPreviewContent = styled.div`
  position: relative;

  @media (max-width: ${Media.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
  line-height: 1.2;
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
    width: 80%;
    margin-bottom: 60px;
  }

  @media (max-width: ${Media.mobile}) {
    width: 100%;
    margin-bottom: 30px;
  }
`;

const ProjectImageLaptopSvg = styled(Svg)`
  position: absolute;
  bottom: 0;
  right: -200px;
  width: 600px;
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
    width: 400px;
    right: 0;
    bottom: 30px;
  }

  @media (max-width: ${Media.mobile}) {
    width: 260px;
    bottom: -10px;
    right: 0px;
  }
`;

const ProjectPhone = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:nth-child(1) {
    left: 100px;
  }
`;

const ProjectPhoneFrame = styled.img`
  position: absolute;
`;

const ProjectPhoneImage = styled.img`
`;

const ProjectPhoneImageSvg = styled(Svg)`
  position: absolute;
`;

export default Project;
