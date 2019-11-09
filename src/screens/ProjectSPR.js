import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from 'components/ProgressiveImage';
import { useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectSectionHeading, ProjectSectionText, ProjectBackground, ProjectHeader
} from 'components/Project';
import backgroundSpr from 'assets/spr-background.jpg';
import backgroundSprLarge from 'assets/spr-background-large.jpg';
import backgroundSprPlaceholder from 'assets/spr-background-placeholder.jpg';
import imageSprBuilder from 'assets/spr-builder.png';
import imageSprBuilderLarge from 'assets/spr-builder-large.png';
import imageSprBuilderPlaceholder from 'assets/spr-builder-placeholder.png';

const prerender = navigator.userAgent === 'ReactSnap';

const title = 'Designing the future of education';
const description = 'I worked as the design lead on a major iteration of Smart Sparrow’s product. We took the platform in a bold new direction, focusing on becoming the best tool for learning designers.';
const roles = [
  'Art Direction',
  'UX and UI Design',
  'Front End Development',
];

function ProjectSPR() {
  const { mobile, tablet } = useContext(ThemeContext);
  useScrollRestore();

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${backgroundSpr} 1000w, ${backgroundSprLarge} 1920w`}
          placeholder={backgroundSprPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.smartsparrow.com/aero/"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <ProgressiveImage
                reveal
                srcSet={`${imageSprBuilder} 800w, ${imageSprBuilderLarge} 1440w`}
                placeholder={imageSprBuilderPlaceholder}
                sizes={`(max-width: ${mobile}px) 500px, (max-width: ${tablet}px) 800px, 1000px`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionHeading>Full project coming soon...</ProjectSectionHeading>
        </ProjectSection>
        {false &&
          <ProjectSection center>
            <ProjectSectionHeading>The Challenge</ProjectSectionHeading>
            <ProjectSectionText>
              The goal of the new product design was to make creating online learning better for
              teams. As part of my role as lead product designer, I worked to create a consistent
              design system that allowed us to quickly design and build prototypes for user testing.
            </ProjectSectionText>
          </ProjectSection>
        }
      </ProjectContainer>
      {false && <Footer />}
    </React.Fragment>
  );
}

export default ProjectSPR;
