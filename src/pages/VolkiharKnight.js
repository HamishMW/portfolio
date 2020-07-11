import React, { useEffect, useMemo, useRef, lazy, Suspense, Fragment } from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import Image from 'components/Image';
import { useScrollRestore, useAppContext, useRouteTransition } from 'hooks';
import { Button } from 'components/Button';
import Footer from 'components/Footer';
import {
  ProjectContainer,
  ProjectSection,
  ProjectSectionContent,
  ProjectImage,
  ProjectBackground,
  ProjectHeader,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'components/ProjectLayout';
import volkiharBackground from 'assets/volkihar-background.jpg';
import volkiharBackgroundLarge from 'assets/volkihar-background-large.jpg';
import volkiharBackgroundPlaceholder from 'assets/volkihar-background-placeholder.jpg';
import volkiharBanner from 'assets/volkihar-banner.jpg';
import volkiharBannerLarge from 'assets/volkihar-banner-large.jpg';
import volkiharBannerPlaceholder from 'assets/volkihar-banner-placeholder.jpg';
import volkiharArmor from 'assets/volkihar-armor.png';
import volkiharArmorLarge from 'assets/volkihar-armor-large.png';
import volkiharArmorPlaceholder from 'assets/volkihar-armor-placeholder.png';
import volkiharBook from 'assets/volkihar-book.png';
import volkiharBookLarge from 'assets/volkihar-book-large.png';
import volkiharBookPlaceholder from 'assets/volkihar-book-placeholder.png';
import volkiharEnderal from 'assets/volkihar-enderal.jpg';
import volkiharEnderalLarge from 'assets/volkihar-enderal-large.jpg';
import volkiharEnderalPlaceholder from 'assets/volkihar-enderal-placeholder.jpg';
import volkiharEnderalLogo from 'assets/volkihar-enderal-logo.png';
import volkiharEnderalLogoLarge from 'assets/volkihar-enderal-logo-large.png';
import volkiharEnderalLogoPlaceholder from 'assets/volkihar-enderal-logo-placeholder.png';
import volkiharSlide1 from 'assets/volkihar-slide-1.jpg';
import volkiharSlide1Large from 'assets/volkihar-slide-1-large.jpg';
import volkiharSlide2 from 'assets/volkihar-slide-2.jpg';
import volkiharSlide2Large from 'assets/volkihar-slide-2-large.jpg';
import volkiharSlide3 from 'assets/volkihar-slide-3.jpg';
import volkiharSlide3Large from 'assets/volkihar-slide-3-large.jpg';
import volkiharSlidePlaceholder from 'assets/volkihar-slide-placeholder.jpg';
import { ReactComponent as VolkiharKnightLogo } from 'assets/volkihar-logo.svg';
import prerender from 'utils/prerender';
import { media } from 'utils/style';

const Carousel = lazy(() => import('components/Carousel'));

const title = 'Volkihar Knight';
const description =
  'A lore-friendly armor mod for The Elder Scrolls V: Skyrim. Released on PC and Xbox One with over 700,000 downloads across both platforms.';
const roles = ['3D Modelling', 'Texturing', 'Graphic Design'];

function ProjectVolkihar() {
  const { status } = useRouteTransition();
  const { dispatch } = useAppContext();
  const theme = useTheme();
  const themeRef = useRef(theme);
  useScrollRestore();

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    if (status === 'entered' || status === 'exiting') {
      dispatch({
        type: 'updateTheme',
        value: {
          rgbPrimary:
            theme.themeId === 'dark' ? '240 211 150' : themeRef.current.rgbPrimary,
          rgbAccent: '240 211 150',
        },
      });
    }

    return function cleanUp() {
      if (status !== 'entered') {
        dispatch({ type: 'updateTheme' });
      }
    };
  }, [dispatch, status, theme.themeId]);

  return (
    <Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description }]}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${volkiharBackground} 1000w, ${volkiharBackgroundLarge} 1600w`}
          placeholder={volkiharBackgroundPlaceholder}
          opacity={0.5}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          linkLabel="Get the mod"
          url="https://www.nexusmods.com/skyrimspecialedition/mods/4806/"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <Image
                reveal
                srcSet={`${volkiharBanner} 800w, ${volkiharBannerLarge} 1100w`}
                placeholder={volkiharBannerPlaceholder}
                alt="A dark elf wearing the Volkihar Knight armor with the logo overlaid on the image."
                sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              srcSet={`${volkiharBook} 480w, ${volkiharBookLarge} 960w`}
              placeholder={volkiharBookPlaceholder}
              alt="A book containing a sketch depicting the logo and armor"
              sizes={`(max-width: ${media.mobile}px) 90vw, (max-width: ${media.tablet}px) 80vw, 70vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <Image
              srcSet={`${volkiharArmor} 400w, ${volkiharArmorLarge} 800w`}
              placeholder={volkiharArmorPlaceholder}
              alt="A 3D render of the full suit of armor."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
            />
            <VolkiharTextSection>
              <ProjectSectionHeading>Armor design</ProjectSectionHeading>
              <ProjectSectionText>
                As a player I noticed there weren’t any heavy armor options for the
                Volkihar faction. This kinda sucks when you’ve specialised in heavy armor
                and decide to join the faction and discover they all wear light armor.
              </ProjectSectionText>
              <ProjectSectionText>
                My solution was to create a mod that combines meshes from the Volkihar
                faction armor with heavy plate armor. The mod builds upon textures and
                meshes from the base game, so it unifies with Skyrim’s overall aesthetic.
                I combined and modified the meshes in 3DS Max. To establish a cohesive
                design across the set, I edited existing textures, and designed custom
                textures in Photoshop.
              </ProjectSectionText>
            </VolkiharTextSection>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <VolkiharLogoContainer>
              <VolkiharKnightLogo
                role="img"
                aria-label="The Volkihar Knight logo, a monogram using the letters 'V' and 'K"
              />
            </VolkiharLogoContainer>
            <ProjectTextRow center noMargin>
              <ProjectSectionHeading>Identity design</ProjectSectionHeading>
              <ProjectSectionText>
                The monogram uses custom designed typography to get the right balance of
                weight and angularity. I combined this with Trajan for the text, which is
                also used for Skyrim's game title wordmark.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionSlider>
            <Suspense fallback={null}>
              <Carousel
                placeholder={volkiharSlidePlaceholder}
                images={useMemo(
                  () => [
                    {
                      src: volkiharSlide1,
                      srcset: `${volkiharSlide1} 960w, ${volkiharSlide1Large} 1920w`,
                      alt: 'A female character wearing the black coloured armor set.',
                    },
                    {
                      src: volkiharSlide2,
                      srcset: `${volkiharSlide2} 960w, ${volkiharSlide2Large} 1920w`,
                      alt: 'A close up of the custom gauntlets design.',
                    },
                    {
                      src: volkiharSlide3,
                      srcset: `${volkiharSlide3} 960w, ${volkiharSlide3Large} 1920w`,
                      alt:
                        'A female character weilding a sword and wearing the red coloured armor.',
                    },
                  ],
                  []
                )}
                width={useMemo(() => 1920, [])}
                height={useMemo(() => 1080, [])}
              />
            </Suspense>
          </ProjectSectionSlider>
        </ProjectSection>
        <ProjectBackgroundSection>
          <ProjectSectionBackgroundImage
            srcSet={`${volkiharEnderal} 1280w, ${volkiharEnderalLarge} 1920w`}
            placeholder={volkiharEnderalPlaceholder}
            alt="A promotional image from Enderal showing several characters in the game overlooking a distant city."
            sizes={`100vw`}
          />
          <ProjectSection as="div">
            <ProjectSectionContent>
              <ProjectTextRow center centerMobile noMargin>
                <Image
                  srcSet={`${volkiharEnderalLogo} 180w, ${volkiharEnderalLogoLarge} 320w`}
                  placeholder={volkiharEnderalLogoPlaceholder}
                  alt="The Enderal game logo"
                  sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 220px`}
                  style={{ maxWidth: 220, width: '100%', marginBottom: 30 }}
                />
                <ProjectSectionHeading>Featured in Enderal</ProjectSectionHeading>
                <ProjectSectionText>
                  I was super stoked to have my work featured in the major standalone mod
                  Enderal, which won best fan creation at the game awards in 2016. Within
                  the game my armor design can be found being used for the Wandering Mage
                  armor set.
                </ProjectSectionText>
                <Button
                  secondary
                  iconHoverShift
                  as="a"
                  icon="chevronRight"
                  target="_blank"
                  href="https://store.steampowered.com/app/933480/Enderal_Forgotten_Stories/"
                >
                  View on Steam
                </Button>
              </ProjectTextRow>
            </ProjectSectionContent>
          </ProjectSection>
        </ProjectBackgroundSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}

const ProjectSectionSlider = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 70px;
  margin: 0;
`;

const ProjectSectionColumns = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 0;

  @media (max-width: ${media.tablet}px) {
    grid-template-columns: 1fr;
  }
`;

const VolkiharTextSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const VolkiharLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111111;
  padding: ${props => (props.theme.themeId === 'light' ? '60px' : 0)} 80px;
  margin-bottom: 80px;
  width: 100%;

  @media (max-width: ${media.mobile}px) {
    padding: ${props => (props.theme.themeId === 'light' ? '30px' : 0)} 40px;
    margin-bottom: 40px;
  }

  svg {
    max-width: 400px;
  }
`;

const ProjectBackgroundSection = styled.section`
  display: grid;
  grid-template-columns: 100%;

  ${ProjectSection} {
    grid-column: 1;
    grid-row: 1;
  }

  ${ProjectSectionContent} {
    padding: var(--space5XL) 0 calc(var(--space5XL) + var(--spaceL));

    @media (max-width: ${media.laptop}px) {
      padding: var(--space2XL) 0 var(--space4XL);
    }

    @media (max-width: ${media.tablet}px) {
      padding: var(--spaceXL) 0 var(--space2XL);
    }

    @media (max-width: ${media.mobile}px) {
      padding: var(--spaceL) 0 var(--space2XL);
    }
  }
`;

const ProjectSectionBackgroundImage = styled(Image)`
  grid-column: 1;
  grid-row: 1;

  img {
    object-fit: cover;
    justify-self: stretch;
    align-self: stretch;
  }

  div::after {
    content: '';
    grid-column: 1;
    grid-row: 1;
    z-index: 1;
    position: relative;
    background: linear-gradient(
        rgb(var(--rgbBackground) / 1) 0%,
        rgb(var(--rgbBackground) / 0.9) 20%,
        rgb(var(--rgbBackground) / 0) 100%
      ),
      linear-gradient(
        rgb(var(--rgbBackground) / 0) 0%,
        rgb(var(--rgbBackground) / 0.9) 80%,
        rgb(var(--rgbBackground) / 1) 100%
      );
  }
`;

export default ProjectVolkihar;
