import volkiharBackgroundLarge from 'assets/volkihar-background-large.jpg';
import volkiharBackgroundPlaceholder from 'assets/volkihar-background-placeholder.jpg';
import volkiharBackground from 'assets/volkihar-background.jpg';
import volkiharBannerLarge from 'assets/volkihar-banner-large.jpg';
import volkiharBannerPlaceholder from 'assets/volkihar-banner-placeholder.jpg';
import volkiharBanner from 'assets/volkihar-banner.jpg';
import volkiharBookLarge from 'assets/volkihar-book-large.png';
import volkiharBookPlaceholder from 'assets/volkihar-book-placeholder.png';
import volkiharBook from 'assets/volkihar-book.png';
import volkiharEnderalLarge from 'assets/volkihar-enderal-large.jpg';
import volkiharEnderalLogoLarge from 'assets/volkihar-enderal-logo-large.png';
import volkiharEnderalLogoPlaceholder from 'assets/volkihar-enderal-logo-placeholder.png';
import volkiharEnderalLogo from 'assets/volkihar-enderal-logo.png';
import volkiharEnderalPlaceholder from 'assets/volkihar-enderal-placeholder.jpg';
import volkiharEnderal from 'assets/volkihar-enderal.jpg';
import VolkiharKnightLogo from 'assets/volkihar-logo.svg';
import volkiharSlide1Large from 'assets/volkihar-slide-1-large.jpg';
import volkiharSlide1 from 'assets/volkihar-slide-1.jpg';
import volkiharSlide2Large from 'assets/volkihar-slide-2-large.jpg';
import volkiharSlide2 from 'assets/volkihar-slide-2.jpg';
import volkiharSlide3Large from 'assets/volkihar-slide-3-large.jpg';
import volkiharSlide3 from 'assets/volkihar-slide-3.jpg';
import volkiharSlidePlaceholder from 'assets/volkihar-slide-placeholder.jpg';
import { Button } from 'components/Button';
import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
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
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { media } from 'utils/style';
import styles from './VolkiharKnight.module.css';

const Carousel = dynamic(() => import('components/Carousel'));
const Armor = dynamic(() => import('./Armor'));

const title = 'Volkihar Knight';
const description =
  'A lore-friendly armor mod for The Elder Scrolls V: Skyrim. Released on PC and Xbox One with over one million downloads across both platforms.';
const roles = ['3D Modelling', 'Texturing', 'Graphic Design'];

export function VolkiharKnight() {
  const { status } = useRouteTransition();

  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      {(status === 'entered' || status === 'exiting') && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              [data-theme='dark'] {
                --rgbPrimary: 240 211 150;
                --rgbAccent: 240 211 150;
              }
              [data-theme='light'] {
                --rgbPrimary: 134 99 23;
                --rgbAccent: 134 99 23;
              }
            `,
          }}
        />
      )}
      <ProjectContainer>
        <ProjectBackground
          src={volkiharBackground}
          srcSet={`${volkiharBackground.src} 1000w, ${volkiharBackgroundLarge.src} 1600w`}
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
              src={volkiharBackground}
              srcSet={`${volkiharBanner.src} 800w, ${volkiharBannerLarge.src} 1100w`}
              placeholder={volkiharBannerPlaceholder}
              alt="A dark elf wearing the Volkihar Knight armor with the logo overlaid on the image."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              src={volkiharBook}
              srcSet={`${volkiharBook.src} 480w, ${volkiharBookLarge.src} 960w`}
              placeholder={volkiharBookPlaceholder}
              alt="A book containing a sketch depicting the logo and armor"
              sizes={`(max-width: ${media.mobile}px) 90vw, (max-width: ${media.tablet}px) 80vw, 70vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <Armor alt="3D model of the Volkihar Knight armor" />
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
            <Carousel
              placeholder={volkiharSlidePlaceholder.src}
              images={[
                {
                  src: volkiharSlide1.src,
                  srcSet: `${volkiharSlide1.src} 960w, ${volkiharSlide1Large.src} 1920w`,
                  alt: 'A female character wearing the black coloured armor set.',
                },
                {
                  src: volkiharSlide2.src,
                  srcSet: `${volkiharSlide2.src} 960w, ${volkiharSlide2Large.src} 1920w`,
                  alt: 'A close up of the custom gauntlets design.',
                },
                {
                  src: volkiharSlide3.src,
                  srcSet: `${volkiharSlide3.src} 960w, ${volkiharSlide3Large.src} 1920w`,
                  alt: 'A female character wielding a sword and wearing the red coloured armor.',
                },
              ]}
              width={1920}
              height={1080}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection
          backgroundElement={
            <Image
              src={volkiharEnderal}
              srcSet={`${volkiharEnderal.src} 1280w, ${volkiharEnderalLarge.src} 1920w`}
              placeholder={volkiharEnderalPlaceholder}
              alt="A promotional image from Enderal showing several characters in the game overlooking a distant city."
              sizes={`100vw`}
            />
          }
        >
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <Image
                src={volkiharEnderalLogo}
                srcSet={`${volkiharEnderalLogo.src} 180w, ${volkiharEnderalLogoLarge.src} 320w`}
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
