import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import ProgressiveImage from '../components/ProgressiveImage';
import ScrollToTop from '../utils/ScrollToTop';
import Footer from '../components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage, ProjectBackground, ProjectHeader,
  ProjectSectionHeading, ProjectSectionText,
} from '../components/Project';
import { Media } from '../utils/StyleUtils';
import DisplacementSlider from '../components/DisplacementSlider';
import volkiharBackground from '../assets/volkihar-background.jpg';
import volkiharBackgroundLarge from '../assets/volkihar-background-large.jpg';
import volkiharBackgroundPlaceholder from '../assets/volkihar-background-placeholder.jpg';
import volkiharBanner from '../assets/volkihar-banner.jpg';
import volkiharBannerLarge from '../assets/volkihar-banner-large.jpg';
import volkiharBannerPlaceholder from '../assets/volkihar-banner-placeholder.jpg';
import volkiharArmor from '../assets/volkihar-armor.png';
import volkiharArmorLarge from '../assets/volkihar-armor-large.png';
import volkiharArmorPlaceholder from '../assets/volkihar-armor-placeholder.png';
import volkiharSlide1 from '../assets/volkihar-slide-1.jpg';
import volkiharSlide2 from '../assets/volkihar-slide-2.jpg';
import volkiharSlide3 from '../assets/volkihar-slide-3.jpg';

const prerender = navigator.userAgent === 'ReactSnap';

const title = 'Volkihar Knight';
const description = 'A lore-friendly armor mod for The Elder Scrolls V: Skyrim. Released on PC and Xbox One with over 700,000 downloads across both platforms.';
const roles = [
  '3D Modelling',
  'Texturing',
  'Graphic Design',
];

export default function ProjectVolkihar(props) {
  const { status, setTheme } = props;

  useEffect(() => {
    if (status === 'entered' || status === 'exiting') {
      setTheme({ colorPrimary: alpha => `rgba(240, 211, 150, ${alpha})` });
    }

    return function cleanUp() {
      setTheme();
    }
  }, [status]);

  return (
    <React.Fragment>
      <ScrollToTop status={status} />
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
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
            <ProjectImage entered={!prerender}>
              <ProgressiveImage
                srcSet={`${volkiharBanner} 800w, ${volkiharBannerLarge} 1100w`}
                placeholder={volkiharBannerPlaceholder}
                alt="A dark elf wearing the Volkihar Knight armor with the logo overlaid on the image."
                sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProgressiveImage
              srcSet={`${volkiharArmor} 400w, ${volkiharArmorLarge} 800w`}
              placeholder={volkiharArmorPlaceholder}
              alt="A 3D render of the full suit of armor."
              sizes={`(max-width: ${Media.mobile}) 100vw, (max-width: ${Media.tablet}) 100vw, 50vw`}
            />
            <VolkiharTextSection>
              <ProjectSectionHeading>Armor design</ProjectSectionHeading>
              <ProjectSectionText>
                As a player I noticed there weren’t any heavy armor options for the Volkihar faction. This kinda sucks when you’ve specialised in heavy armor and decide to join the faction and discover they all wear light armor.
              </ProjectSectionText>
              <ProjectSectionText>
                My solution was to create a mod that combines meshes from the Volkihar faction armor with heavy plate armor. The mod builds upon textures and meshes from the base game, so it unifies with Skyrim’s overall aesthetic. I combined and modified the meshes in 3DS Max. To establish a cohesive design across the set, I edited existing textures, and designed custom textures in Photoshop.
              </ProjectSectionText>
            </VolkiharTextSection>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumn>
            <DisplacementSlider
              images={[
                {
                  src: volkiharSlide1,
                  alt: 'A female character wearing the black coloured armor set.'
                },
                {
                  src: volkiharSlide2,
                  alt: 'A close up of the custom gauntlets design.',
                },
                {
                  src: volkiharSlide3,
                  alt: 'A female character weilding a sword and wearing the red coloured armor.',
                },
              ]}
              width={1920}
              height={1080}
            />
          </ProjectSectionColumn>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </React.Fragment>
  );
}

const ProjectSectionColumn = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 70px;
  margin: 20px 0 60px;

  @media (max-width: ${Media.tablet}) {
    margin: 0 0 60px;
  }
`;

const ProjectSectionColumns = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 20px 0 60px;

  @media (max-width: ${Media.tablet}) {
    grid-template-columns: 1fr;
    margin: 0 0 60px;
  }
`;

const VolkiharTextSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
