import React, { Fragment, useState } from 'react';
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
import ThemeProvider, { useTheme } from 'components/ThemeProvider';
import Image from 'components/Image';
import SegmentedControl, { SegmentedControlOption } from 'components/SegmentedControl';
import prerender from 'utils/prerender';
import { media } from 'utils/style';
import backgroundSpr from 'assets/spr-background.jpg';
import backgroundSprLarge from 'assets/spr-background-large.jpg';
import backgroundSprPlaceholder from 'assets/spr-background-placeholder.jpg';
import imageSprBuilder from 'assets/spr-builder.jpg';
import imageSprBuilderLarge from 'assets/spr-builder-large.jpg';
import imageSprBuilderPlaceholder from 'assets/spr-builder-placeholder.jpg';
import imageSprComponentsDark from 'assets/spr-components-dark.png';
import imageSprComponentsDarkLarge from 'assets/spr-components-dark-large.png';
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
  const { themeId } = useTheme();
  const [componentSectionTheme, setComponentSectionTheme] = useState(themeId);
  useScrollRestore();

  const handleThemeChange = index => {
    if (index === 0) {
      setComponentSectionTheme('dark');
    } else {
      setComponentSectionTheme('light');
    }
  };

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
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>
              In 2017, Smart Sparrow began a project to build an entirely new platform to
              from the ground up to serve as the most powerful tool for educators to
              create online learning experiences. The old platofrm was built in Flash, and
              there were a number of user experience problems to solve in the process of
              moving the platform to Javascript. The primary goals for the project were
              reducing barriers to collaboration, and making the platform both easier for
              new users, but with plenty of room to scale for advanced users.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ThemeProvider themeId={componentSectionTheme}>
          <ProjectSection light>
            <ProjectSectionContent>
              <Image
                srcSet={`${imageSprComponentsDark} 300w, ${imageSprComponentsDarkLarge} 700w`}
                placeholder={imageSprComponentsDark}
                alt="Multiple user annotations on a shared layer."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <ProjectTextRow>
                <SegmentedControl
                  currentIndex={componentSectionTheme === 'dark' ? 0 : 1}
                  onChange={handleThemeChange}
                >
                  <SegmentedControlOption>Dark theme</SegmentedControlOption>
                  <SegmentedControlOption>Light theme</SegmentedControlOption>
                </SegmentedControl>
              </ProjectTextRow>
              <ProjectTextRow>
                <ProjectSectionHeading>The aero design system</ProjectSectionHeading>
                <ProjectSectionText>
                  To streamline the design process across designers and engineers for such
                  a large project, it was important to lay the foundations with a strong,
                  flexible design system that could evolve during the product’s
                  development cycle. This would inform both the aesthetics and user
                  experience across the product itself as well as the website and
                  marketing material.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
          </ProjectSection>
        </ThemeProvider>
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
              {
                position: [0.16, -0.06, 0.58],
                text: 'Krakatoa',
                hidden: true,
              },
              {
                position: [0.11, 0.2, -0.56],
                text: 'Parícutin',
                hidden: true,
              },
              {
                position: [0.52, 0.2, -0.23],
                text: 'Kīlauea',
                hidden: true,
              },
              {
                position: [-0.24, 0.75, 0.24],
                text: 'Mantle',
                delay: 800,
                hidden: true,
              },
              {
                position: [-0.24, 0.55, 0.24],
                text: 'Outer core',
                delay: 800,
                hidden: true,
              },
              {
                position: [-0.24, 0.35, 0.24],
                text: 'Inner core',
                delay: 800,
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
                <ProjectSectionContent wide>
                  <ProjectTextRow justify="end">
                    <ProjectSectionHeading level={4}>
                      Bringing 3D into learning
                    </ProjectSectionHeading>
                    <ProjectSectionText>
                      One really cool example is the 3D screen plugin. Learning desiners
                      can load any model into it and then configure camera positions to
                      animate to for each section.
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.17, 0.69, -1.47]}
              meshes={['Atmosphere', 'EarthFull']}
              labels={[
                'Pacific ring of fire',
                'Ruapehu',
                'St. Helens',
                'Krakatoa',
                'Parícutin',
                'Kīlauea',
              ]}
            >
              <ProjectSection>
                <ProjectSectionContent wide>
                  <ProjectTextRow justify="start">
                    <ProjectSectionHeading level={4}>Interactivity</ProjectSectionHeading>
                    <ProjectSectionText>
                      Learners can then be directed to specific parts of the model and
                      shown labels. They're also able to click and drag to orbit around
                      and freely explore at any time.
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              animations={['0:loop']}
              camera={[1.81, 0.51, 0.43]}
              meshes={['Atmosphere', 'EarthFull']}
              labels={[
                'Pacific ring of fire',
                'Ruapehu',
                'St. Helens',
                'Krakatoa',
                'Parícutin',
                'Kīlauea',
              ]}
            />
            <EarthSection
              animations={['0:loop']}
              camera={[0.37, 1.02, 1.84]}
              meshes={['EarthPartial', 'Chunk']}
              labels={['Mantle', 'Outer core', 'Inner core']}
            >
              <ProjectSection>
                <ProjectSectionContent wide>
                  <ProjectTextRow justify="end">
                    <ProjectSectionHeading level={4}>Animation</ProjectSectionHeading>
                    <ProjectSectionText>
                      Learning designers can pick an animation included in the model to
                      play or loop for any section without having to use any complex
                      animation tools.
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
              </ProjectSection>
            </EarthSection>
            <EarthSection
              scrimReverse
              animations={['0:loop']}
              camera={[0.37, 1.02, 1.84]}
              meshes={['Atmosphere', 'EarthFull']}
            />
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
