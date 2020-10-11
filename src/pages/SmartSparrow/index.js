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
import ThemeProvider from 'components/ThemeProvider';
import backgroundSpr from 'assets/spr-background.jpg';
import backgroundSprLarge from 'assets/spr-background-large.jpg';
import backgroundSprPlaceholder from 'assets/spr-background-placeholder.jpg';
import imageSprBuilder from 'assets/spr-builder.jpg';
import imageSprBuilderLarge from 'assets/spr-builder-large.jpg';
import imageSprBuilderPlaceholder from 'assets/spr-builder-placeholder.jpg';
import prerender from 'utils/prerender';
import { media } from 'utils/style';
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
        <ThemeProvider themeId="dark">
          <Earth
            className="spr__earth"
            hideMeshes={['Atmosphere', 'EarthPartial', 'Chunk', 'EarthFull']}
            position={[0, 0, 0]}
            labels={[
              {
                position: [0.54, 0.19, 0.18],
                text: 'Pacific ring of fire',
                hidden: true,
              },
              {
                position: [0.47, -0.38, 0.04],
                text: 'Ruapehu',
                hidden: true,
              },
              {
                position: [0.22, 0.44, -0.35],
                text: 'St. Helens',
                hidden: true,
              },
            ]}
            scale={0.6}
          >
            <EarthSection
              scrim
              animations={['0:loop']}
              camera={[0, 0, 1.5]}
              meshes={['Atmosphere', 'EarthFull']}
            >
              <ProjectSection>
                <ProjectSectionContent>
                  <ProjectTextRow center>
                    <ProjectSectionHeading>The result</ProjectSectionHeading>
                    <ProjectSectionText>
                      The flexibility of the product allowed for developers to create
                      engaging interactive experiences as highly configurable plugins that
                      could then be used and manipulated by learning designers.
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[0, 0, 2.4]}
              meshes={['Atmosphere', 'EarthFull']}
            />
            <EarthSection
              animations={['0:loop']}
              camera={[1.14, -1.39, 0.94]}
              meshes={['Atmosphere', 'EarthFull']}
            >
              <ProjectSection>
                <ProjectSectionContent>
                  <ProjectSectionHeading level={4}>
                    Bringing 3D into learning
                  </ProjectSectionHeading>
                  <ProjectSectionText>
                    One really cool example is the 3D screen plugin. Learning desiners can
                    load any model into it and then configure camera positions to animate
                    to for each section.
                  </ProjectSectionText>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.17, 0.69, -1.47]}
              meshes={['Atmosphere', 'EarthFull']}
            >
              <ProjectSection>
                <ProjectSectionContent>
                  <ProjectSectionHeading level={4}>Interactivity</ProjectSectionHeading>
                  <ProjectSectionText>
                    Learners can then be directed to specific parts of the model and shown
                    labels. They're also able to click and drag to orbit around and freely
                    explore at any time.
                  </ProjectSectionText>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.81, 0.51, 0.43]}
              meshes={['Atmosphere', 'EarthFull']}
              labels={['Pacific ring of fire', 'Ruapehu', 'St. Helens']}
            >
              Section 5
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[0.37, 1.02, 1.84]}
              meshes={['EarthPartial', 'Chunk']}
            >
              Section 6
            </EarthSection>
            <EarthSection
              scrimReverse
              animations={['0:loop']}
              camera={[0.37, 1.02, 1.84]}
              meshes={['EarthPartial', 'Chunk']}
            >
              Section 7
            </EarthSection>
          </Earth>
        </ThemeProvider>
        <div style={{ height: '100vh' }} />
        <div style={{ height: '100vh' }} />
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default ProjectSPR;
