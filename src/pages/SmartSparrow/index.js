import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import {
  ProjectContainer,
  ProjectSection,
  ProjectSectionContent,
  ProjectTextRow,
  ProjectImage,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectBackground,
  ProjectHeader,
} from 'components/ProjectLayout';
import backgroundSpr from 'assets/spr-background.jpg';
import backgroundSprLarge from 'assets/spr-background-large.jpg';
import backgroundSprPlaceholder from 'assets/spr-background-placeholder.jpg';
import imageSprBuilder from 'assets/spr-builder.jpg';
import imageSprBuilderLarge from 'assets/spr-builder-large.jpg';
import imageSprBuilderPlaceholder from 'assets/spr-builder-placeholder.jpg';
import prerender from 'utils/prerender';
import { media } from 'utils/style';
import { theme, createThemeStyleObject } from 'app/theme';
import Earth, { EarthSection } from './Earth';
import './index.css';

const title = 'Designing the future of education';
const description =
  'I worked as the design lead on a major iteration of Smart Sparrow’s product. We took the platform in a bold new direction, focusing on becoming the best tool for learning designers.';
const roles = [
  'Art Direction',
  'UX and UI Design',
  'Front End Development',
  'Motion Design',
];

const ProjectSPR = () => {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet>
        <title>{`Projects | ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <ProjectContainer className="smart-sparrow">
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
            <ProjectImage
              srcSet={`${imageSprBuilder} 800w, ${imageSprBuilderLarge} 1440w`}
              placeholder={imageSprBuilderPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The Challenge</ProjectSectionHeading>
            <ProjectSectionText>
              The goal of the new product design was to make creating online learning
              better for teams. As part of my role as lead product designer, I worked to
              create a consistent design system that allowed us to quickly design and
              build prototypes for user testing.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <div style={{ height: '100vh' }} />
        <div style={{ height: '100vh' }} />
        <div className="spr__earth-section" style={createThemeStyleObject(theme.dark)}>
          <Earth
            className="spr__earth"
            hideMeshes={['Atmosphere']}
            position={[0, 0, 0]}
            scale={0.6}
          >
            <EarthSection
              scrim
              animations={['0:loop']}
              camera={[0, 0, 1.5]}
              meshes={['Atmosphere']}
              className="spr__earth-section"
            >
              Section 1
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[0, 0, 2.4]}
              meshes={['Atmosphere']}
              className="spr__earth-section"
            >
              Section 2
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.14, -1.39, 0.94]}
              meshes={['Atmosphere']}
              className="spr__earth-section"
            >
              Section 3
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.17, 0.69, -1.47]}
              meshes={['Atmosphere']}
              className="spr__earth-section"
            >
              Section 4
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.81, 0.51, 0.43]}
              meshes={['Atmosphere']}
              className="spr__earth-section"
            >
              Section 5
            </EarthSection>
            <EarthSection
              animations={['0:loop', '1']}
              camera={[0.37, 1.02, 1.84]}
              className="spr__earth-section"
            >
              Section 6
            </EarthSection>
            <EarthSection
              animations={['0:loop', '1']}
              camera={[0.37, 1.02, 1.84]}
              className="spr__earth-section"
            >
              Section 7
            </EarthSection>
          </Earth>
        </div>
        <div style={{ height: '100vh' }} />
        <div style={{ height: '100vh' }} />
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default ProjectSPR;
