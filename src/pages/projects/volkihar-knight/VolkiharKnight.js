import VolkiharKnightLogo from 'assets/volkihar-logo.svg';
import { Button } from 'components/Button';
import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
import { useRouteTransition } from 'hooks';
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
} from 'layouts/Project';
import Head from 'next/head';
import { Fragment, Suspense, lazy } from 'react';
import { media } from 'utils/style';
import styles from './VolkiharKnight.module.css';

const volkiharBackgroundLarge = '/assets/volkihar-background-large.jpg';
const volkiharBackgroundPlaceholder = '/assets/volkihar-background-placeholder.jpg';
const volkiharBackground = '/assets/volkihar-background.jpg';
const volkiharBannerLarge = '/assets/volkihar-banner-large.jpg';
const volkiharBannerPlaceholder = '/assets/volkihar-banner-placeholder.jpg';
const volkiharBanner = '/assets/volkihar-banner.jpg';
const volkiharBookLarge = '/assets/volkihar-book-large.png';
const volkiharBookPlaceholder = '/assets/volkihar-book-placeholder.png';
const volkiharBook = '/assets/volkihar-book.png';
const volkiharEnderalLarge = '/assets/volkihar-enderal-large.jpg';
const volkiharEnderalLogoLarge = '/assets/volkihar-enderal-logo-large.png';
const volkiharEnderalLogoPlaceholder = '/assets/volkihar-enderal-logo-placeholder.png';
const volkiharEnderalLogo = '/assets/volkihar-enderal-logo.png';
const volkiharEnderalPlaceholder = '/assets/volkihar-enderal-placeholder.jpg';
const volkiharEnderal = '/assets/volkihar-enderal.jpg';
const volkiharSlide1Large = '/assets/volkihar-slide-1-large.jpg';
const volkiharSlide1 = '/assets/volkihar-slide-1.jpg';
const volkiharSlide2Large = '/assets/volkihar-slide-2-large.jpg';
const volkiharSlide2 = '/assets/volkihar-slide-2.jpg';
const volkiharSlide3Large = '/assets/volkihar-slide-3-large.jpg';
const volkiharSlide3 = '/assets/volkihar-slide-3.jpg';
const volkiharSlidePlaceholder = '/assets/volkihar-slide-placeholder.jpg';

const Carousel = lazy(() => import('components/Carousel'));
const Armor = lazy(() => import('./Armor'));

const title = 'Volkihar Knight';
const description =
  'A lore-friendly armor mod for The Elder Scrolls V: Skyrim. Released on PC and Xbox One with over one million downloads across both platforms.';
const roles = ['3D Modelling', 'Texturing', 'Graphic Design'];

export function VolkiharKnight() {
  const { status } = useRouteTransition();

  return (
    <Fragment>
      <Head>
        <title>{`Projects | ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      {(status === 'entered' || status === 'exiting') && (
        <style>{`
          .dark {
            --rgbPrimary: 240 211 150;
            --rgbAccent: 240 211 150;
          }
          .light {
            --rgbPrimary: 134 99 23;
            --rgbAccent: 134 99 23;
          }
        `}</style>
      )}
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${volkiharBackground} 1000w, ${volkiharBackgroundLarge} 1600w`}
          placeholder={volkiharBackgroundPlaceholder}
          opacity={0.5}
        />
        <ProjectHeader
          title={title}
          description={description}
          linkLabel="Get the mod"
          url="https://www.nexusmods.com/skyrimspecialedition/mods/4806/"
          roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${volkiharBanner} 800w, ${volkiharBannerLarge} 1100w`}
              placeholder={volkiharBannerPlaceholder}
              alt="A dark elf wearing the Volkihar Knight armor with the logo overlaid on the image."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
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
            {/* {!ssr && (
              <Suspense fallback={null}>
                <Armor alt="3D model of the Volkihar Knight armor" />
              </Suspense>
            )} */}
            <div className={styles.textSection}>
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
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <div className={styles.logoContainer}>
              <VolkiharKnightLogo
                role="img"
                aria-label="The Volkihar Knight logo, a monogram using the letters 'V' and 'K"
              />
            </div>
            <ProjectTextRow center noMargin>
              <ProjectSectionHeading>Identity design</ProjectSectionHeading>
              <ProjectSectionText>
                The monogram uses custom designed typography to get the right balance of
                weight and angularity. I combined this with Trajan for the text, which is
                also used for Skyrim’s game title wordmark.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            {/* {!ssr && (
              <Suspense fallback={null}>
                <Carousel
                  placeholder={volkiharSlidePlaceholder}
                  images={[
                    {
                      src: volkiharSlide1,
                      srcSet: `${volkiharSlide1} 960w, ${volkiharSlide1Large} 1920w`,
                      alt: 'A female character wearing the black coloured armor set.',
                    },
                    {
                      src: volkiharSlide2,
                      srcSet: `${volkiharSlide2} 960w, ${volkiharSlide2Large} 1920w`,
                      alt: 'A close up of the custom gauntlets design.',
                    },
                    {
                      src: volkiharSlide3,
                      srcSet: `${volkiharSlide3} 960w, ${volkiharSlide3Large} 1920w`,
                      alt: 'A female character wielding a sword and wearing the red coloured armor.',
                    },
                  ]}
                  width={1920}
                  height={1080}
                />
              </Suspense>
            )} */}
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection
          backgroundElement={
            <Image
              srcSet={`${volkiharEnderal} 1280w, ${volkiharEnderalLarge} 1920w`}
              placeholder={volkiharEnderalPlaceholder}
              alt="A promotional image from Enderal showing several characters in the game overlooking a distant city."
              sizes={`100vw`}
            />
          }
        >
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
                icon="chevronRight"
                href="https://store.steampowered.com/app/933480/Enderal_Forgotten_Stories/"
              >
                View on Steam
              </Button>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}
