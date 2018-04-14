import React from 'react';
import styled from 'styled-components';
import ProgressiveImage from '../components/ProgressiveImage';
import { LinkButton } from '../components/Button';
import { Media } from '../utils/StyleUtils';
import backgroundSpr from '../assets/background-spr.jpg';
import backgroundSprLarge from '../assets/background-spr-large.jpg';
import backgroundSprPlaceholder from '../assets/background-spr-placeholder.jpg';
import imageSprBuilder from '../assets/image-spr-builder.png';
import imageSprBuilderLarge from '../assets/image-spr-builder-large.png';
import imageSprBuilderPlaceholder from '../assets/image-spr-builder-placeholder.png';

const ProjectSPR = () => (
  <ProjectContainer>
    <ProjectBackground
      alt=""
      role="presentation"
      srcSet={`${backgroundSpr} 1000w, ${backgroundSprLarge} 1920w`}
      placeholder={backgroundSprPlaceholder}
    />
    <ProjectHeader>
      <ProjectDetails>
        <ProjectTitle>Designing the future of education</ProjectTitle>
        <ProjectDescription>
          I worked as the design lead on a major iteration of Smart Sparrow’s product.
          We took the platform in a bold new direction, focusing on becoming
          the best tool for learning design.
        </ProjectDescription>
        <LinkButton
          secondary
          style={{position: 'relative', left: '-5px'}}
          icon="chevronRight"
          href="https://www.smartsparrow.com"
        >
          Visit website
        </LinkButton>
      </ProjectDetails>
      <ProjectMeta>
        <ProjectMetaItem>Art Direction</ProjectMetaItem>
        <ProjectMetaItem>UX and UI Design</ProjectMetaItem>
        <ProjectMetaItem>Front End Development</ProjectMetaItem>
      </ProjectMeta>
    </ProjectHeader>
    <ProjectSection>
      <ProgressiveImage
        srcSet={`${imageSprBuilder} 800w, ${imageSprBuilderLarge} 1440w`}
        placeholder={imageSprBuilderPlaceholder}
        sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
      />
    </ProjectSection>
  </ProjectContainer>
);

const ProjectContainer = styled.div`
  position: relative;
  width: 100vw;
  padding-top: 120px;
  padding-right: 120px;
  padding-bottom: 40px;
  padding-left: 210px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: ${Media.desktop}) {
    padding-left: 120px;
  }

  @media (max-width: ${Media.tablet}) {
    padding-top: 100px;
    padding-right: 80px;
    padding-left: 160px;
    height: auto;
  }

  @media (max-width: ${Media.mobile}) {
    padding-top: 130px;
    padding-left: 25px;
    padding-right: 25px;
    overflow-x: hidden;
  }

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    padding-left: ${props => props.theme.spacingOuter.mobile};
    padding-right: ${props => props.theme.spacingOuter.mobile};
  }
`;

const ProjectBackground = styled(ProgressiveImage)`
  z-index: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 600px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,
      ${props => props.theme.colorBackground(0.7)} 0%,
      ${props => props.theme.colorBackground(1)} 100%
    );
  }
`;

const ProjectHeader = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 100px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 200px;
    grid-gap: 40px;
  }

  @media (max-width: ${Media.tablet}) {
    grid-template-columns: 100%;
    grid-gap: 30px;
  }
`;

const ProjectDetails = styled.div``;

const ProjectTitle = styled.h1`
  margin: 0;
  font-size: 54px;
  font-weight: 500;
  line-height: 1.1;

  @media (max-width: ${Media.tablet}) {
    font-size: 48px;
  }

  @media (max-width: ${Media.mobile}) {
    font-size: 34px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 22px;
  line-height: 1.4;

  @media (max-width: ${Media.mobile}) {
    font-size: 18px;
  }
`;

const ProjectMeta = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
`;

const ProjectMetaItem = styled.li`
  padding: 30px 0;
  font-size: 16px;
  font-weight: 400;
  border-top: 1px solid ${props => props.theme.colorText(0.2)};

  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colorText(0.2)};
  }

  @media (max-width: ${Media.mobile}) {
    padding: 15px 0;
  }
`;

const ProjectSection = styled.section`
  margin-top: 100px;

  @media (max-width: ${Media.mobile}) {
    margin-top: 60px;
  }
`;

export default ProjectSPR;
