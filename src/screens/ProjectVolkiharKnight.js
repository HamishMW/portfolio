import React from 'react';
import { Helmet } from 'react-helmet';
import ProgressiveImage from '../components/ProgressiveImage';
import ScrollToTop from '../utils/ScrollToTop';
import Footer from '../components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage, ProjectBackground, ProjectHeader
} from '../components/Project';
import { Media } from '../utils/StyleUtils';
import sliceBackground from '../assets/slice-background.jpg';
import sliceBackgroundLarge from '../assets/slice-background-large.jpg';
import sliceBackgroundPlaceholder from '../assets/slice-background-placeholder.jpg';
import sliceApp from '../assets/slice-app.jpg';
import sliceAppLarge from '../assets/slice-app-large.jpg';
import sliceAppPlaceholder from '../assets/slice-app-placeholder.jpg';

const prerender = navigator.userAgent === 'ReactSnap';

const title = 'Volkihar Knight';
const description = 'A lore-friendly armor mod for The Elder Scrolls V: Skyrim. Released on PC and Xbox One with over 700,000 downloads across both platforms.';
const roles = [
  '3D Modelling',
  'Texturing',
  'Graphic Design',
];

class ProjectSlice extends React.Component {
  componentDidMount() {
    this.props.setTheme({ colorPrimary: alpha => `rgba(240, 211, 150, ${alpha})` });
  }

  componentWillUnmount() {
    this.props.setTheme();
  }

  render() {
    const { status } = this.props;

    return (
      <React.Fragment>
        <ScrollToTop status={status} />
        <Helmet>
          <title>{`Projects | ${title}`}</title>
          <meta name="description" content={description} />
        </Helmet>
        <ProjectContainer>
          <ProjectBackground
            srcSet={`${sliceBackground} 1000w, ${sliceBackgroundLarge} 1920w`}
            placeholder={sliceBackgroundPlaceholder}
            opacity={0.8}
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
            {/* <ProjectSectionContent>
              <ProjectImage entered={!prerender}>
                <ProgressiveImage
                  srcSet={`${sliceApp} 800w, ${sliceAppLarge} 1440w`}
                  placeholder={sliceAppPlaceholder}
                  alt="The Slice web appication showing a selected user annotation."
                  sizes={`(max-width: ${Media.mobile}) 500px, (max-width: ${Media.tablet}) 800px, 1000px`}
                />
              </ProjectImage>
            </ProjectSectionContent> */}
          </ProjectSection>
        </ProjectContainer>
        <Footer />
      </React.Fragment>
    )
  }
};

export default ProjectSlice;
