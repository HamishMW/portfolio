import React from 'react';
import styled from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';
import { Media } from '../utils/StyleUtils';
import Button from '../components/Button';
import Svg from '../utils/Svg';
const Fragment = React.Fragment;

const Project = ({
  visible,
  sectionRef,
  index,
  title,
  description,
  imageSrc,
  imageAlt,
  imageType,
}) => (
  <ProjectSection innerRef={sectionRef}>
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
                <ProjectImageLaptop status={status} srcSet={imageSrc} alt={imageAlt} />
                <ProjectImageLaptopSvg status={status} icon="projects" />
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 220px;
  overflow: hidden;

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
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

const ProjectPreviewContent = styled.div`
  position: relative;
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

const ProjectImageLaptopSvg = styled(Svg)`
  position: absolute;
  bottom: 0;
  right: -240px;
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
    transform: scale(0.8);
    bottom: 60px;
  }

  @media (max-width: ${Media.mobile}) {
    transform: scale(0.5);
    bottom: 0;
  }
`;

export default Project;
