import backgroundSprLarge from '~/assets/spr-background-large.jpg';
import backgroundSprPlaceholder from '~/assets/spr-background-placeholder.jpg';
import imageSprBackgroundVolcanismLarge from '~/assets/spr-background-volcanism-large.jpg';
import imageSprBackgroundVolcanismPlaceholder from '~/assets/spr-background-volcanism-placeholder.jpg';
import imageSprBackgroundVolcanism from '~/assets/spr-background-volcanism.jpg';
import backgroundSpr from '~/assets/spr-background.jpg';
import imageSprComponentsDarkLarge from '~/assets/spr-components-dark-large.png';
import imageSprComponentsDarkPlaceholder from '~/assets/spr-components-dark-placeholder.png';
import imageSprComponentsDark from '~/assets/spr-components-dark.png';
import imageSprComponentsLightLarge from '~/assets/spr-components-light-large.png';
import imageSprComponentsLightPlaceholder from '~/assets/spr-components-light-placeholder.png';
import imageSprComponentsLight from '~/assets/spr-components-light.png';
import imageSprDesignSystemDarkLarge from '~/assets/spr-design-system-dark-large.png';
import imageSprDesignSystemDarkPlaceholder from '~/assets/spr-design-system-dark-placeholder.png';
import imageSprDesignSystemDark from '~/assets/spr-design-system-dark.png';
import imageSprDesignSystemLightLarge from '~/assets/spr-design-system-light-large.png';
import imageSprDesignSystemLightPlaceholder from '~/assets/spr-design-system-light-placeholder.png';
import imageSprDesignSystemLight from '~/assets/spr-design-system-light.png';
import imageSprLessonBuilderDarkLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import imageSprLessonBuilderDarkPlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import imageSprLessonBuilderDark from '~/assets/spr-lesson-builder-dark.jpg';
import imageSprLessonBuilderLightLarge from '~/assets/spr-lesson-builder-light-large.jpg';
import imageSprLessonBuilderLightPlaceholder from '~/assets/spr-lesson-builder-light-placeholder.jpg';
import imageSprLessonBuilderLight from '~/assets/spr-lesson-builder-light.jpg';
import videoSprMotionLarge from '~/assets/spr-motion-large.mp4';
import videoSprMotionPlaceholder from '~/assets/spr-motion-placeholder.jpg';
import videoSprMotion from '~/assets/spr-motion.mp4';
import imageSprSchema1DarkLarge from '~/assets/spr-schema-1-dark-large.png';
import imageSprSchema1DarkPlaceholder from '~/assets/spr-schema-1-dark-placeholder.png';
import imageSprSchema1Dark from '~/assets/spr-schema-1-dark.png';
import imageSprSchema1LightLarge from '~/assets/spr-schema-1-light-large.png';
import imageSprSchema1LightPlaceholder from '~/assets/spr-schema-1-light-placeholder.png';
import imageSprSchema1Light from '~/assets/spr-schema-1-light.png';
import imageSprSchema2DarkLarge from '~/assets/spr-schema-2-dark-large.png';
import imageSprSchema2DarkPlaceholder from '~/assets/spr-schema-2-dark-placeholder.png';
import imageSprSchema2Dark from '~/assets/spr-schema-2-dark.png';
import imageSprSchema2LightLarge from '~/assets/spr-schema-2-light-large.png';
import imageSprSchema2LightPlaceholder from '~/assets/spr-schema-2-light-placeholder.png';
import imageSprSchema2Light from '~/assets/spr-schema-2-light.png';
import imageSprStoryboarderDarkLarge from '~/assets/spr-storyboarder-dark-large.png';
import imageSprStoryboarderDarkPlaceholder from '~/assets/spr-storyboarder-dark-placeholder.png';
import imageSprStoryboarderDark from '~/assets/spr-storyboarder-dark.png';
import imageSprStoryboarderLightLarge from '~/assets/spr-storyboarder-light-large.png';
import imageSprStoryboarderLightPlaceholder from '~/assets/spr-storyboarder-light-placeholder.png';
import imageSprStoryboarderLight from '~/assets/spr-storyboarder-light.png';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { SegmentedControl, SegmentedControlOption } from '~/components/segmented-control';
import { ThemeProvider, useTheme } from '~/components/theme-provider';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { Suspense, lazy, useMemo } from 'react';
import { media } from '~/utils/style';
import styles from './smart-sparrow.module.css';

const Earth = lazy(() => import('./earth').then(module => ({ default: module.Earth })));
const EarthSection = lazy(() =>
  import('./earth').then(module => ({ default: module.EarthSection }))
);

const title = 'Designing the future of education';
const description =
  'I worked as the design lead on a major iteration of Smart Sparrow’s product. We took the platform in a bold new direction, focusing on becoming the best tool for learning designers.';
const roles = [
  'Art Direction',
  'UX and UI Design',
  'Front End Development',
  'Motion Design',
];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const SmartSparrow = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    toggleTheme(themes[index]);
  };

  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={backgroundSpr}
          srcSet={`${backgroundSpr} 1080w, ${backgroundSprLarge} 2160w`}
          placeholder={backgroundSprPlaceholder}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.smartsparrow.com/"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprLessonBuilderDark} 1280w, ${imageSprLessonBuilderDarkLarge} 2560w`
                  : `${imageSprLessonBuilderLight} 1280w, ${imageSprLessonBuilderLightLarge} 2560w`
              }
              width={1280}
              height={800}
              placeholder={
                isDark
                  ? imageSprLessonBuilderDarkPlaceholder
                  : imageSprLessonBuilderLightPlaceholder
              }
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>
              In 2017, Smart Sparrow began a project to build an entirely new platform to
              from the ground up to serve as the most powerful tool for educators to
              create online learning experiences. The old platform was built in Flash, and
              there were a number of user experience problems to solve in the process of
              moving the platform to Javascript. The primary goals for the project were
              reducing barriers to collaboration, and making the platform both easier for
              new users, but with plenty of room to scale for advanced users.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light={isDark}>
          <ProjectSectionContent>
            <Image
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprComponentsDark} 1024w, ${imageSprComponentsDarkLarge} 2048w`
                  : `${imageSprComponentsLight} 1024w, ${imageSprComponentsLightLarge} 2048w`
              }
              width={1024}
              hright={800}
              placeholder={
                isDark
                  ? imageSprComponentsDarkPlaceholder
                  : imageSprComponentsLightPlaceholder
              }
              alt={`A set of ${theme} themed components for the aero design system`}
              sizes="100vw"
            />
            <ProjectTextRow>
              <SegmentedControl
                currentIndex={themes.indexOf(theme)}
                onChange={handleThemeChange}
              >
                <SegmentedControlOption>Dark theme</SegmentedControlOption>
                <SegmentedControlOption>Light theme</SegmentedControlOption>
              </SegmentedControl>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>The aero design system</ProjectSectionHeading>
              <ProjectSectionText>
                To streamline the design process across designers and engineers for such a
                large project, it was important to lay the foundations with a strong,
                flexible design system that could evolve during the product’s development
                cycle. This would inform both the aesthetics and user experience across
                the product itself as well as the website and marketing material.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprDesignSystemDark} 1280w, ${imageSprDesignSystemDarkLarge} 2560w`
                  : `${imageSprDesignSystemLight} 1280w, ${imageSprDesignSystemLightLarge} 2560w`
              }
              width={1280}
              height={800}
              placeholder={
                isDark
                  ? imageSprDesignSystemDarkPlaceholder
                  : imageSprDesignSystemLightPlaceholder
              }
              alt="The homepage of the aero design system docs website linking to principles and components."
              sizes="100vw"
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Design system docs</ProjectSectionHeading>
              <ProjectSectionText>
                A design system is useless if no one knows how to use it, so we put
                together a comprehensive documentation website to cover principles, ux,
                accessibility, and component guidelines for designers and engineers
                working with the system.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ThemeProvider theme="dark" data-invert>
          <ProjectSection
            backgroundOverlayOpacity={0.5}
            backgroundElement={
              <Image
                srcSet={`${imageSprBackgroundVolcanism} 1280w, ${imageSprBackgroundVolcanismLarge} 2560w`}
                width={1280}
                height={900}
                placeholder={imageSprBackgroundVolcanismPlaceholder}
                alt="A dramatic ocean scene with lava forming a new land mass."
                sizes="100vw"
              />
            }
          >
            <ProjectSectionColumns width="full">
              <ProjectSectionContent width="full">
                <ProjectTextRow width="s">
                  <ProjectSectionHeading>Motion design</ProjectSectionHeading>
                  <ProjectSectionText>
                    Animation was a core principle in making the authoring experience a
                    more understandable process. Elements animate in ways that indicate
                    the cause and effect of each interaction to improve the fluidity of
                    the overall experience.
                  </ProjectSectionText>
                </ProjectTextRow>
              </ProjectSectionContent>
              <Image
                raised
                className={styles.video}
                srcSet={`${videoSprMotion} 1280w, ${videoSprMotionLarge} 2560w`}
                width={1280}
                height={800}
                placeholder={videoSprMotionPlaceholder}
                alt="A learning designer building and deploying an interactive lesson on volcanism using the app."
                sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
              />
            </ProjectSectionColumns>
          </ProjectSection>
        </ThemeProvider>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Encouraging adaptivity</ProjectSectionHeading>
              <ProjectSectionText>
                A major part of solving for collaboration was being able to visualize the
                learner experience in the editor. This was especially beneficial for
                subject matter experts and instructors need to review and give feedback on
                the higher level structure without having to dig through all of the
                adaptivity scenarios screen by screen.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              raised
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprStoryboarderDark} 1280w, ${imageSprStoryboarderDarkLarge} 2560w`
                  : `${imageSprStoryboarderLight} 1280w, ${imageSprStoryboarderLightLarge} 2560w`
              }
              width={1280}
              height={800}
              placeholder={
                isDark
                  ? imageSprStoryboarderDarkPlaceholder
                  : imageSprStoryboarderLightPlaceholder
              }
              alt="A drag and drop storyboard style editor for creating an adaptive lesson."
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>
                  An extensible plugin ecosystem usable by everyone
                </ProjectSectionHeading>
                <ProjectSectionText>
                  The most powerful aspect of the platform is the ability to create custom
                  plugins for any content, whether it be a degree, course, lesson, screen,
                  or interactive component. Out of the box these can be made configurable
                  with minimal effort from developers. Learning designers can then edit
                  everything using a common configuration interface.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={
                  isDark
                    ? `${imageSprSchema2Dark} 260w, ${imageSprSchema2DarkLarge} 520w`
                    : `${imageSprSchema2Light} 260w, ${imageSprSchema2LightLarge} 520w`
                }
                width={260}
                height={660}
                placeholder={
                  isDark
                    ? imageSprSchema2DarkPlaceholder
                    : imageSprSchema2LightPlaceholder
                }
                alt="Configuration options for a component."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={
                  isDark
                    ? `${imageSprSchema1Dark} 260w, ${imageSprSchema1DarkLarge} 520w`
                    : `${imageSprSchema1Light} 260w, ${imageSprSchema1LightLarge} 520w`
                }
                width={260}
                height={660}
                placeholder={
                  isDark
                    ? imageSprSchema1DarkPlaceholder
                    : imageSprSchema1LightPlaceholder
                }
                alt="Configuration options for text."
                sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ThemeProvider theme="dark" data-invert>
          <Suspense>
            <Earth
              className={styles.earth}
              hideMeshes={useMemo(
                () => ['Atmosphere', 'EarthPartial', 'Chunk', 'EarthFull'],
                []
              )}
              position={useMemo(() => [0, 0, 0], [])}
              labels={useMemo(
                () => [
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
                ],
                []
              )}
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
                      <ProjectSectionHeading>
                        Next-generation learning experiences
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        The flexibility of the product allowed for developers to create
                        engaging interactive experiences as highly configurable plugins
                        that could then be used and manipulated by learning designers.
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
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="end" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Bringing 3D into learning
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        One really cool example is the 3D screen plugin. Learning
                        designers can load any model into it and then configure camera
                        positions to animate to for each section.
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
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="start" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Interactivity
                      </ProjectSectionHeading>
                      <ProjectSectionText>
                        Learners can then be directed to specific parts of the model and
                        shown labels. They’re also able to click and drag to orbit around
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
                  <ProjectSectionContent width="xl">
                    <ProjectTextRow justify="end" width="s">
                      <ProjectSectionHeading level={4} as="h3">
                        Animation
                      </ProjectSectionHeading>
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
          </Suspense>
        </ThemeProvider>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <svg
                width="141"
                height="43"
                viewBox="0 0 141 43"
                fill="currentColor"
                style={{ marginBottom: '2em' }}
              >
                <path d="M87.92 30.05a.3.3 0 0 0-.34-.18l-.04.02c-.42.08-.74.06-.97-.1-.32-.2-.47-.69-.47-1.47V21.3c0-2.75-1.66-4.14-4.94-4.14-2.93 0-5.23 1.37-5.23 3.12 0 .9.55 1.55 1.37 1.64a1.7 1.7 0 0 0 1.42-.56c.72-.75.63-1.64-.25-2.6a3.52 3.52 0 0 1 2.48-.85c1.7 0 2.43 1 2.43 3.33v1.78c-.4.12-.77.24-1.45.4a18.9 18.9 0 0 0-4.7 1.52 3.19 3.19 0 0 0-1.78 2.99c0 1.46.98 3.17 3.73 3.17 1.54 0 2.92-.72 4.33-2.26.12 1.6.74 2.2 2.24 2.2.72 0 1.3-.16 1.98-.49a.4.4 0 0 0 .2-.49Zm-4.54-2.15c-.33.46-1.42 1.83-2.78 1.83-1.84 0-2.23-1.27-2.23-2.34 0-1.75 1.37-2.57 5.01-3.46v3.97Zm35.23 3.25c-3.9 0-6.83-3-6.83-7 0-3.9 3.06-7.09 6.83-7.09 3.81 0 6.8 3.06 6.8 6.98 0 4.4-3.53 7.11-6.8 7.11Zm-.15-13.34c-1.68 0-3.61.72-3.61 6.28 0 4.25 1.27 6.31 3.88 6.31 2.5 0 3.61-1.94 3.61-6.3 0-4.23-1.27-6.29-3.88-6.29Zm-60.06-.5c0 3.24-.8 5.02-4.94 5.02h-2.2v-9.78h2.29c4.28 0 4.85 2.4 4.85 4.76Zm-7.14 11.01v-5.09h1.99c2.96 0 5.22-.61 6.7-1.83a5.06 5.06 0 0 0 1.88-4.03c0-4.65-4.55-5.63-8.37-5.63h.01-7.74a.32.32 0 0 0-.32.31v.03-.01c0 .16.1.3.25.36.69.25 2.56-.1 2.56 1.88v14.01c0 1.02-.46 1.74-2.55 1.94a.31.31 0 0 0-.3.3v.06c0 .17.15.3.33.3h8.27c.18 0 .32-.13.32-.3v-.05a.3.3 0 0 0-.3-.3c-2.27-.19-2.73-.88-2.73-1.95v-5.08 5.08ZM68.1 17.06c-3.6 0-6.53 3.21-6.53 7.17 0 4 2.75 6.9 6.53 6.9 3.18 0 4.73-1.87 5.62-3.28a.31.31 0 0 0-.09-.42l-.04-.03a.32.32 0 0 0-.44.07c-1.17 1.44-2.19 2.28-3.96 2.28-2.23 0-4.62-1.52-4.62-5.79v-.71h9.15c.03 0 .05-.02.05-.05v-.07a5.72 5.72 0 0 0-1.4-4.42 5.67 5.67 0 0 0-4.27-1.65Zm-3.47 5.29c.3-2.92 1.45-4.52 3.26-4.52.91 0 1.58.25 2.06.76.65.7.93 1.96.82 3.76h-6.14Zm41.39.15c-2.5-.69-3.48-1.39-3.48-2.5 0-1.26 1.01-2.17 2.4-2.17 1.65 0 2.36.77 4.1 3.64l.01.03.03.03h.25c.18 0 .32-.14.32-.32v-4.1c0-.03-.02-.05-.02-.05h-.34c-.1 0-.19.04-.25.11l-.55.66a6.64 6.64 0 0 0-2.98-.77c-2.87 0-4.88 1.75-4.88 4.25 0 2.36 1.58 3.24 4.31 3.97 2.66.71 3.6 1.46 3.6 2.85 0 1.54-1.51 2.23-2.59 2.23-2 0-2.84-.73-4.76-4.13l-.02-.04-.02-.02h-.26a.32.32 0 0 0-.32.31v4.6c0 .03.02.06.05.06h.32c.09 0 .17-.04.23-.1l.87-.86c1.03.63 2.56.96 3.56.96 1.5 0 2.72-.47 3.55-1.36a4.54 4.54 0 0 0 1.15-3.14c0-2.14-1.16-3.26-4.28-4.14Zm-15.14 6.78c0 .7-.18.94-1.33 1.01a.32.32 0 0 0-.3.31c0 .18.15.31.32.31h5.66a.3.3 0 0 0 .31-.3c0-.17-.13-.3-.3-.31-1.3-.07-1.65-.28-1.65-1.02v-8.2c.94-1.52 1.6-2.32 2.74-2.56-.06.2-.1.42-.1.6 0 1 .7 1.7 1.72 1.7.99 0 1.68-.7 1.68-1.7 0-.93-.6-2.03-2.28-2.03-1.37 0-2.69.78-3.82 2.64v-2.1a.39.39 0 0 0-.4-.39l-3.56.1a.3.3 0 0 0-.3.3v.05c0 .16.1.3.26.31 1.19.17 1.35.73 1.35 1.3v9.98Zm39.15-12.05c.08 0 .16.04.22.1.06.05.1.13.1.22v2.33s1.17-2.74 4.94-2.74h.04c2.35 0 3.7 1.48 3.7 4.06v8.06c0 .71.18.95 1.32 1.02.17 0 .3.14.3.31 0 .17-.14.31-.32.31h-5.08a.32.32 0 0 1-.03-.63c.92-.08 1.07-.3 1.07-1v-7.29c0-2.4-.7-3.33-2.47-3.33-1.2 0-2.19 1.03-2.8 1.9 0 0-.31.38-.65 1.12l.03 7.6c0 .7.15.92 1.05 1a.32.32 0 0 1-.03.63h-5.06a.32.32 0 0 1-.31-.31c0-.17.13-.3.3-.31 1.14-.08 1.32-.3 1.32-1.02v-9.95c0-.58-.16-1.14-1.36-1.31a.31.31 0 0 1-.26-.31v-.05c0-.17.13-.3.3-.31l3.68-.1Z" />
                <path
                  fillRule="evenodd"
                  d="M35.47 30.82c6.24-11.43 4.15-22.73-4.81-27.77C20.76-2.5 7.84.52 2.28 12.46c-3.84 8.2-2.1 22.48 6.82 27.6 8.92 5.1 20.9.81 26.37-9.23Zm-3.02-12.15c.3-2.3-.24-5.1-2-6.95l-.02-.02c-3.38-3.76-8.06-4-11.02-3.92a16.61 16.61 0 0 0-7.55 2.14c-1.68.86-3.2 2.35-3.81 3.08-.4.47-1.06 1.44-.7 2.31.29.73 1.4.68 1.81.37.22-.16.45-.37.7-.6l.72-.64c2.53-2.07 4.78-3.37 10-3.37 5.23 0 8.06 3.22 8.06 6.09 0 2.87-1.38 4.82-3.97 6.09a10.54 10.54 0 0 1-4.4 1.18c.13-2.78.2-5.41.2-5.41 0-.33.02-.65.03-.96.07-1.55.12-2.72-1.01-2.94-1.36-.27-3.86 0-3.9 1.52-.06-.23.25 12.51.31 12.77l.02.29c.03.32.15.6.35.83a1.38 1.38 0 0 0 .98.41c.28 0 .68-.05 1.09-.16.5-.15 1.02-.39 1.31-.77.15-.2.27-.38.34-.72.04-.24.13-1.72.15-2.15 2.75-.02 5.54-.53 7.67-1.8 2.68-1.62 4.29-4.04 4.64-6.67ZM18.23 32.41a2.12 2.12 0 0 1 1.69 1.99c0 .52-.22.99-.63 1.32-.35.28-.8.43-1.3.43h-.01c-.23 0-.46-.03-.69-.1-.39-.1-.7-.29-.9-.52-.19-.22-.31-.5-.37-.83-.08-.5.05-1.04.36-1.48a1.9 1.9 0 0 1 1.53-.84c.1 0 .22 0 .32.03Z"
                />
              </svg>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                Ultimately the project was successful after Smart Sparrow and the aero
                platform were{' '}
                <Link href="https://www.prnewswire.com/news-releases/pearson-acquires-interactive-learning-technology-from-smart-sparrow-300987673.html">
                  acquired by Pearson in 2020
                </Link>{' '}
                to become a foundation for their next generation learning platform.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
