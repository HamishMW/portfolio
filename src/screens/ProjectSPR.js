import React from 'react';
import HeadTag from 'react-head';
import ProgressiveImage from '../components/ProgressiveImage';
import Footer from '../components/Footer';
import { ProjectContainer, ProjectSection, ProjectImage, ProjectSectionHeading,
  ProjectSectionText, ProjectBackground, ProjectHeader } from '../components/Project';
import { Media } from '../utils/StyleUtils';
import backgroundSpr from '../assets/background-spr.jpg';
import backgroundSprLarge from '../assets/background-spr-large.jpg';
import backgroundSprPlaceholder from '../assets/background-spr-placeholder.jpg';
import imageSprBuilder from '../assets/image-spr-builder.png';
import imageSprBuilderLarge from '../assets/image-spr-builder-large.png';
import imageSprBuilderPlaceholder from '../assets/image-spr-builder-placeholder.png';

const title = 'Designing the future of education';
const description = 'I worked as the design lead on a major iteration of Smart Sparrow’s product. We took the platform in a bold new direction, focusing on becoming the best tool for learning designers.';
const roles = [
  'Art Direction',
  'UX and UI Design',
  'Front End Development',
];

const ProjectSPR = () => (
  <React.Fragment>
    <ProjectContainer>
      <HeadTag tag="title">{title}</HeadTag>
      <HeadTag
        tag="meta"
        name="description"
        content={description}
      />
      <ProjectBackground
        srcSet={`${backgroundSpr} 1000w, ${backgroundSprLarge} 1920w`}
        placeholder={backgroundSprPlaceholder}
      />
      <ProjectHeader
        title={title}
        description={description}
        url="https://www.smartsparrow.com"
        roles={roles}
      />
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

export default ProjectSPR;
