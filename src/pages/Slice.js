import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Image from '/components/Image';
import { useScrollRestore } from '/hooks';
import Footer from '/components/Footer';
import {
  ProjectContainer,
  ProjectSection,
  ProjectSectionContent,
  ProjectImage,
  ProjectTextRow,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectBackground,
  ProjectHeader,
} from '/components/ProjectLayout';
import sliceBackground from '/assets/slice-background.jpg';
import sliceBackgroundLarge from '/assets/slice-background-large.jpg';
import sliceBackgroundPlaceholder from '/assets/slice-background-placeholder.jpg';
import sliceApp from '/assets/slice-app.jpg';
import sliceAppLarge from '/assets/slice-app-large.jpg';
import sliceAppPlaceholder from '/assets/slice-app-placeholder.jpg';
import sliceSidebarLayers from '/assets/slice-sidebar-layers.png';
import sliceSidebarLayersLarge from '/assets/slice-sidebar-layers-large.png';
import sliceSidebarLayersPlaceholder from '/assets/slice-sidebar-layers-placeholder.png';
import sliceSidebarAnnotations from '/assets/slice-sidebar-annotations.png';
import sliceSidebarAnnotationsLarge from '/assets/slice-sidebar-annotations-large.png';
import sliceSidebarAnnotationsPlaceholder from '/assets/slice-sidebar-annotations-placeholder.png';
import sliceSlides from '/assets/slice-slides.jpg';
import sliceSlidesLarge from '/assets/slice-slides-large.jpg';
import sliceSlidesPlaceholder from '/assets/slice-slides-placeholder.jpg';
import sliceBackgroundBar from '/assets/slice-background-bar.jpg';
import sliceBackgroundBarLarge from '/assets/slice-background-bar-large.jpg';
import sliceBackgroundBarPlaceholder from '/assets/slice-background-bar-placeholder.jpg';
import sliceAnnotation from '/assets/slice-annotation.png';
import sliceAnnotationLarge from '/assets/slice-annotation-large.png';
import sliceAnnotationPlaceholder from '/assets/slice-annotation-placeholder.png';
import prerender from '/utils/prerender';
import { media } from '/utils/style';

const title = 'Biomedical image collaboration';
const description =
  'This project involved designing a better way for biomedical educators and learners to annotate digital slides together.';
const roles = ['User Research', 'UX Design', 'Interface Design'];

function ProjectSlice(props) {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description }]}
      />
      <ProjectContainer {...props}>
        <ProjectBackground
          srcSet={`${sliceBackground} 1280w, ${sliceBackgroundLarge} 2560w`}
          placeholder={sliceBackgroundPlaceholder}
          opacity={0.8}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.best.edu.au/s/q2yjjvl7?data=8%404!9%4020303!10%40-15087&version=1"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <Image
                reveal
                srcSet={`${sliceApp} 800w, ${sliceAppLarge} 1920w`}
                placeholder={sliceAppPlaceholder}
                alt="The Slice web appication showing a selected user annotation."
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <SidebarImagesText>
              <ProjectSectionHeading>Bringing it together</ProjectSectionHeading>
              <ProjectSectionText>
                Teachers needed a better way to create collaborative group activities by
                annotating slides on Slice. Before starting this project, a layer could
                only be annotated by a single user, making it difficult for learners to
                work together.
              </ProjectSectionText>
              <ProjectSectionText>
                Our solution was to allow users to be invited to a layer, where they can
                see others’ annotations and make their own.
              </ProjectSectionText>
            </SidebarImagesText>
            <SidebarImages>
              <SidebarImage
                srcSet={`${sliceSidebarLayers} 300w, ${sliceSidebarLayersLarge} 700w`}
                placeholder={sliceSidebarLayersPlaceholder}
                alt="The layers sidebar design, now with user profiles."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <SidebarImage
                srcSet={`${sliceSidebarAnnotations} 300w, ${sliceSidebarAnnotationsLarge} 700w`}
                placeholder={sliceSidebarAnnotationsPlaceholder}
                alt="Multiple user annotations on a shared layer."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </SidebarImages>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Improving the experience</ProjectSectionHeading>
              <ProjectSectionText>
                A problem we heard about often form users was that it was difficult to
                find images they had previously seen or worked on. To solve this we added
                a new tab that lists all previously annotated slides. In addition, we
                added the ability to favorite slides, so if users find an interesting
                slide they want to annotate later, they can easily save it to their
                account.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${sliceSlides} 800w, ${sliceSlidesLarge} 1440w`}
              placeholder={sliceSlidesPlaceholder}
              alt="The new My Slides tab in slice, showing annotated and favorited slides."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionGrid>
            <ProjectSectionGridImage>
              <ProjectSectionGridBackground>
                <Image
                  srcSet={`${sliceBackgroundBar} 400w, ${sliceBackgroundBarLarge} 898w`}
                  placeholder={sliceBackgroundBarPlaceholder}
                  alt=""
                  role="presentation"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                />
              </ProjectSectionGridBackground>
              <ProjectSectionGridForeground>
                <Image
                  srcSet={`${sliceAnnotation} 440w, ${sliceAnnotationLarge} 880w`}
                  placeholder={sliceAnnotationPlaceholder}
                  alt="An annotation preview popover with statistics for shape perimeter and area."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </ProjectSectionGridForeground>
            </ProjectSectionGridImage>
            <ProjectSectionGridText>
              <ProjectSectionHeading>Meaningful details</ProjectSectionHeading>
              <ProjectSectionText>
                Marking and annotating areas on high resolution biomedical images is the
                core experience of the app, and it was easy to get lost or lose sense of
                scale when zooming in on details. Adding measurements for the perimeter
                and area of an annotation both helped to communicate the overall scale of
                the image and how large the annotated feature is in comparison.
              </ProjectSectionText>
            </ProjectSectionGridText>
          </ProjectSectionGrid>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}

const ProjectSectionColumns = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 20px 0 60px;

  @media (max-width: ${media.tablet}px) {
    grid-template-columns: 1fr;
    margin: 0 0 60px;
  }
`;

const ProjectSectionGrid = styled(ProjectSectionContent)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  margin: 40px 0;

  @media (max-width: ${media.tablet}px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectSectionGridImage = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 100%;
  grid-column: 1;
  grid-row: 1;

  @media (max-width: 1200px) {
    grid-template-rows: 1fr;
  }
`;

const ProjectSectionGridBackground = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;

  @media (max-width: ${media.tablet}px) {
    padding: 0 120px;
  }

  @media (max-width: ${media.mobile}px) {
    padding: 0 60px;
  }
`;

const ProjectSectionGridForeground = styled.div`
  grid-column: 1;
  grid-row: 2;
  position: relative;
  right: -140px;
  bottom: 40px;
  align-self: flex-end;
  width: 110%;

  @media (max-width: 1200px) {
    width: auto;
    left: auto;
    right: auto;
  }
`;

const ProjectSectionGridText = styled.div`
  padding-top: 80px;

  @media (max-width: ${media.desktop}px) {
    padding-top: 40px;
  }

  @media (max-width: ${media.tablet}px) {
    padding-top: 0;
  }
`;

const SidebarImages = styled.div`
  display: grid;
  grid-template-columns: repeat(6, [col] 1fr);
  align-items: center;

  @media (max-width: ${media.tablet}px) {
    padding: 0 80px;
    margin-top: 60px;
  }

  @media (max-width: ${media.mobile}px) {
    padding: 0 20px;
    margin-top: 40px;
  }
`;

const SidebarImagesText = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;

  @media (max-width: ${media.tablet}px) {
    padding-right: 0;
  }
`;

const SidebarImage = styled(Image)`
  &:first-child {
    grid-column: col 1 / span 4;
    grid-row: 1;
    position: relative;
    top: 5%;
    opacity: 0.4;
  }

  &:last-child {
    grid-column: col 3 / span 4;
    grid-row: 1;
    position: relative;
    top: -5%;
  }
`;

export default ProjectSlice;
