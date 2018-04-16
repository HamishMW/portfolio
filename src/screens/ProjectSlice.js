import React from 'react';
import HeadTag from 'react-head';
import ProgressiveImage from '../components/ProgressiveImage';
import Footer from '../components/Footer';
import { ProjectContainer, ProjectSection, ProjectImage, ProjectSectionHeading,
  ProjectSectionText, ProjectBackground, ProjectHeader } from '../components/Project';
import { Media } from '../utils/StyleUtils';
import backgroundSlice from '../assets/background-slice.jpg';
import backgroundSliceLarge from '../assets/background-slice-large.jpg';
import backgroundSlicePlaceholder from '../assets/background-slice-placeholder.jpg';
import imageSliceApp from '../assets/image-slice-app.jpg';
import imageSliceAppLarge from '../assets/image-slice-app-large.jpg';
import imageSliceAppPlaceholder from '../assets/image-slice-app-placeholder.jpg';

const title = 'Biomedical image collaboration';
const description = 'I designed a better way for biomedical professionals and learners to collaboratively annotate digital slides.';
const roles = [
  'User Research',
  'UX Design',
  'Interface Design',
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
        srcSet={`${backgroundSlice} 1000w, ${backgroundSliceLarge} 1920w`}
        placeholder={backgroundSlicePlaceholder}
        opacity={0.8}
      />
      <ProjectHeader
        title={title}
        description={description}
        url="https://www.best.edu.au/s/q2yjjvl7?data=8%404!9%4020303!10%40-15087&version=1"
        roles={roles}
      />
      <ProjectSection>
        <ProjectImage status="entered">
          <ProgressiveImage
            srcSet={`${imageSliceApp} 800w, ${imageSliceAppLarge} 1440w`}
            placeholder={imageSliceAppPlaceholder}
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
