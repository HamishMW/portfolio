import React from 'react';
import styled, { keyframes } from 'styled-components';
import HeadTag from 'react-head';
import ProgressiveImage from '../components/ProgressiveImage';
import { LinkButton } from '../components/Button';
import Footer from '../components/Footer';
import { Media } from '../utils/StyleUtils';
import backgroundSpr from '../assets/background-spr.jpg';
import backgroundSprLarge from '../assets/background-spr-large.jpg';
import backgroundSprPlaceholder from '../assets/background-spr-placeholder.jpg';
import imageSprBuilder from '../assets/image-spr-builder.png';
import imageSprBuilderLarge from '../assets/image-spr-builder-large.png';
import imageSprBuilderPlaceholder from '../assets/image-spr-builder-placeholder.png';

const ProjectSPR = () => (
  <React.Fragment>
    <ProjectContainer>
      <HeadTag tag="title">Hamish Williams | Smart Sparrow</HeadTag>
      <HeadTag
        tag="meta"
        name="description"
        content="I designed a web app that helps educators build better online courseware"
      />
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
            style={{paddingLeft: '3px'}}
            icon="chevronRight"
            href="https://www.smartsparrow.com"
            target="_blank"
            rel="noopener"
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
        <ProjectImage status="entered">
          <ProgressiveImage
            srcSet={`${imageSprBuilder} 800w, ${imageSprBuilderLarge} 1440w`}
            placeholder={imageSprBuilderPlaceholder}
            sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
            width="1280px"
            height="800px"
          />
        </ProjectImage>
      </ProjectSection>
      {false &&
        <React.Fragment>
        <ProjectSection center>
          <ProjectSectionHeading>The Challenge</ProjectSectionHeading>
          <ProjectSectionText>
            The goal of the new product design was to make creating online learning better for
            teams. As part of my role as lead product designer, I worked to create a consistent
            design system that allowed us to quickly design and build prototypes for user testing.
          </ProjectSectionText>
        </ProjectSection>
        <ProjectSection center>
          <ProjectSectionHeading>A living design system</ProjectSectionHeading>
          <ProjectSectionText>
            The goal of the new product design was to make creating online learning better for
            teams. As part of my role as lead product designer, I worked to create a consistent
            design system that allowed us to quickly design and build prototypes for user testing.
          </ProjectSectionText>
        </ProjectSection>
        <ProjectSection center>
          <ProjectSectionHeading>Designing for teams</ProjectSectionHeading>
          <ProjectSectionText>
            The goal of the new product design was to make creating online learning better for
            teams. As part of my role as lead product designer, I worked to create a consistent
            design system that allowed us to quickly design and build prototypes for user testing.
          </ProjectSectionText>
        </ProjectSection>
        </React.Fragment>
      }
    </ProjectContainer>
    <Footer />
  </React.Fragment>
);

const AnimFade = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`;

const AnimFadeSlide = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 60px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

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
  align-items: center;

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

  @media ${Media.mobileLS} {
    padding-left: 100px;
    padding-right: 100px;
  }
`;

const ProjectBackground = styled(ProgressiveImage)`
  z-index: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 640px;
  opacity: 0;
  animation: ${AnimFade} 2s ease forwards;

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
    z-index: 1;
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
  max-width: 980px;

  @media (min-width: ${Media.desktop}) {
    max-width: 1100px;
    grid-template-columns: 1fr 400px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 200px;
    grid-gap: 40px;
  }

  @media (max-width: ${Media.tablet}) {
    grid-template-columns: 100%;
    grid-gap: 30px;
  }
`;

const ProjectDetails = styled.div`
  opacity: 0;
  animation: ${AnimFadeSlide} 1.4s ${props => props.theme.curveFastoutSlowin} forwards;
`;

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
  opacity: 0;
  animation: ${AnimFadeSlide} 1.4s ${props => props.theme.curveFastoutSlowin} 0.2s forwards;
`;

const ProjectMetaItem = styled.li`
  padding: 30px 0;
  font-size: 16px;
  font-weight: 400;
  border-top: 1px solid ${props => props.theme.colorText(0.2)};

  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colorText(0.2)};
  }

  @media (max-width: ${Media.tablet}) {
    padding: 20px 0;
  }

  @media (max-width: ${Media.mobile}) {
    padding: 15px 0;
  }
`;

const AnimProjectImage = keyframes`
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

const ProjectImage = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

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

  div {
    opacity: 0;
    width: 100%;
  }

  ${props => props.status === 'entered' &&`
    &:before {
      animation: ${AnimProjectImage} 1.4s ${props.theme.curveFastoutSlowin} 0.6s;
    }

    div {
      animation: ${AnimFade} 0.8s ease 1.4s forwards;
    }
  `}
`;

const ProjectSection = styled.section`
  margin-top: 100px;
  max-width: 980px;
  width: 100%;

  @media (min-width: ${Media.desktop}) {
    max-width: 1100px;
  }

  @media (max-width: ${Media.mobile}) {
    margin-top: 60px;
  }

  ${props => props.center &&`
    max-width: 480px;
  `}
`;

const ProjectSectionHeading = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin: 0;

  @media (max-width: ${Media.tablet}) {
    font-size: 32px;
  }

  @media (max-width: ${Media.mobile}) {
    font-size: 24px;
  }
`;

const ProjectSectionText = styled.p`
  font-size: 18px;
  line-height: 1.4;
  margin: 0;
  margin-top: 22px;
  color: ${props => props.theme.colorText(0.7)};
`;

export default ProjectSPR;
