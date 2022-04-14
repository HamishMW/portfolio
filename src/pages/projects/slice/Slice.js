import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
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
import { Fragment } from 'react';
import { media } from 'utils/style';
import styles from './Slice.module.css';

const sliceAnnotationLarge = '/assets/slice-annotation-large.png';
const sliceAnnotationPlaceholder = '/assets/slice-annotation-placeholder.png';
const sliceAnnotation = '/assets/slice-annotation.png';
const sliceAppLarge = '/assets/slice-app-large.jpg';
const sliceAppPlaceholder = '/assets/slice-app-placeholder.jpg';
const sliceApp = '/assets/slice-app.jpg';
const sliceBackgroundBarLarge = '/assets/slice-background-bar-large.jpg';
const sliceBackgroundBarPlaceholder = '/assets/slice-background-bar-placeholder.jpg';
const sliceBackgroundBar = '/assets/slice-background-bar.jpg';
const sliceBackgroundLarge = '/assets/slice-background-large.jpg';
const sliceBackgroundPlaceholder = '/assets/slice-background-placeholder.jpg';
const sliceBackground = '/assets/slice-background.jpg';
const sliceSidebarAnnotationsLarge = '/assets/slice-sidebar-annotations-large.png';
const sliceSidebarAnnotationsPlaceholder =
  '/assets/slice-sidebar-annotations-placeholder.png';
const sliceSidebarAnnotations = '/assets/slice-sidebar-annotations.png';
const sliceSidebarLayersLarge = '/assets/slice-sidebar-layers-large.png';
const sliceSidebarLayersPlaceholder = '/assets/slice-sidebar-layers-placeholder.png';
const sliceSidebarLayers = '/assets/slice-sidebar-layers.png';
const sliceSlidesLarge = '/assets/slice-slides-large.jpg';
const sliceSlidesPlaceholder = '/assets/slice-slides-placeholder.jpg';
const sliceSlides = '/assets/slice-slides.jpg';

const title = 'Biomedical image collaboration';
const description =
  'This project involved designing a better way for biomedical educators and learners to annotate digital slides together.';
const roles = ['User Research', 'UX Design', 'Interface Design'];

export const Slice = () => {
  return (
    <Fragment>
      <Head>
        <title>{`Projects | ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          srcSet={`${sliceBackground} 1280w, ${sliceBackgroundLarge} 2560w`}
          placeholder={sliceBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://www.best.edu.au/s/q2yjjvl7?data=8%404!9%4020303!10%40-15087&version=1"
          roles={roles}
        />
        <ProjectSection first>
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${sliceApp} 800w, ${sliceAppLarge} 1920w`}
              placeholder={sliceAppPlaceholder}
              alt="The Slice web application showing a selected user annotation."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
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
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${sliceSidebarLayers} 300w, ${sliceSidebarLayersLarge} 700w`}
                placeholder={sliceSidebarLayersPlaceholder}
                alt="The layers sidebar design, now with user profiles."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={`${sliceSidebarAnnotations} 300w, ${sliceSidebarAnnotationsLarge} 700w`}
                placeholder={sliceSidebarAnnotationsPlaceholder}
                alt="Multiple user annotations on a shared layer."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
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
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridBackground}>
                <Image
                  srcSet={`${sliceBackgroundBar} 400w, ${sliceBackgroundBarLarge} 898w`}
                  placeholder={sliceBackgroundBarPlaceholder}
                  alt=""
                  role="presentation"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                />
              </div>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={`${sliceAnnotation} 440w, ${sliceAnnotationLarge} 880w`}
                  placeholder={sliceAnnotationPlaceholder}
                  alt="An annotation preview popover with statistics for shape perimeter and area."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Meaningful details</ProjectSectionHeading>
              <ProjectSectionText>
                Marking and annotating areas on high resolution biomedical images is the
                core experience of the app, and it was easy to get lost or lose sense of
                scale when zooming in on details. Adding measurements for the perimeter
                and area of an annotation both helped to communicate the overall scale of
                the image and how large the annotated feature is in comparison.
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
