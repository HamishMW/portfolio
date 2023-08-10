import sliceAnnotationLarge from 'assets/whitecane/car6.jpg';
import sliceAnnotationPlaceholder from 'assets/slice-annotation-placeholder.png';
import sliceAnnotation from 'assets/whitecane/car6.jpg';
import sliceAppLarge from 'assets/whitecane/cover.jpg';
import sliceAppPlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceApp from 'assets/slice-app.jpg';
import sliceBackgroundBarLarge from 'assets/whitecane/whitecane-bg.jpg';
import sliceBackgroundBarPlaceholder from 'assets/slice-background-bar-placeholder.jpg';
import sliceBackgroundBar from 'assets/whitecane/whitecane-bg.jpg';
import sliceBackgroundLarge from 'assets/whitecane/whitecane-bg.jpg';
import sliceBackgroundPlaceholder from 'assets/slice-background-placeholder.jpg';
import sliceBackground from 'assets/whitecane/whitecane-bg.jpg';
import sliceIrlPlaceholder from 'assets/slice-irl-placeholder.jpg';
import sliceIrl from 'assets/whitecane/outcome.jpg';
import sliceSidebarAnnotationsLarge from 'assets/whitecane/cane1.jpg';
import sliceSidebarAnnotationsPlaceholder from 'assets/whitecane/cane1.jpg';
import sliceSidebarAnnotations from 'assets/whitecane/cane1.jpg';
import sliceSidebarLayersLarge from 'assets/whitecane/cane2.jpg';
import sliceSidebarLayersPlaceholder from 'assets/slice-sidebar-layers-placeholder.png';
import sliceSidebarLayers from 'assets/whitecane/cane2.jpg';
import sliceSlidesLarge from 'assets/slice-slides-large.jpg';
import sliceSlidesPlaceholder from 'assets/slice-slides-placeholder.jpg';
import sliceSlides from 'assets/slice-slides.jpg';

import slidesCar1 from 'assets/whitecane/car1.jpg';
import slidesCar2 from 'assets/whitecane/car2.jpg';
import slidesCar3 from 'assets/whitecane/car3.jpg';
import slidesCar4 from 'assets/whitecane/car4.jpg';
import slidesCar5 from 'assets/whitecane/car5.jpg';
import slidesCar6 from 'assets/whitecane/car6.jpg';
import slidesCar7 from 'assets/whitecane/car7.jpg';

import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
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
import styles from './SmartWhitecane.module.css';

const Carousel = dynamic(() => import('components/Carousel').then(mod => mod.Carousel));

const title = 'AI Powered Smart White Cane';
const description =
  'Inspired by the mission to empower visually impaired individuals, I designed and built an AI-powered smart white cane that integrates real-time object detection, GPS tracking, language translation, and various other features to enhance mobility and independence.';
const roles = ['Artificial Intelligence', 'Product Design', 'Interface Design'];

export const SmartWhitecane = () => {
  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          src={sliceBackground}
          srcSet={`${sliceBackground.src} 1280w, ${sliceBackgroundLarge.src} 2560w`}
          placeholder={sliceBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/gd03champ/smart-whitecane-proj-public"
          linkLabel="View Source Code"
          roles={roles}
        />
                <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Product Design</ProjectSectionHeading>
              <ProjectSectionText>
              The product design of the AI-powered smart white cane incorporates a combination of hardware components, 
              including a Jetson Nano for AI processing, a webcam for real-time object detection, an Arduino board for 
              interfacing with sensors, a GPS sensor for location tracking, a power bank for portable operation, an 
              ultrasonic sensor for object distance detection, Wi-Fi and Bluetooth receivers for connectivity, and
               Bluetooth earbuds for audio feedback, among other components. This carefully chosen set of technologies
                enables the cane to deliver a seamless user experience with advanced functionality and mobility assistance.
              </ProjectSectionText>
              <ProjectSectionText>
                Our solution was to allow visually impaired to move independently with confidence.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[sliceSidebarLayers, sliceSidebarLayersLarge]}
                placeholder={sliceSidebarLayersPlaceholder}
                alt="The layers sidebar design, now with user profiles."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[sliceSidebarAnnotations, sliceSidebarAnnotationsLarge]}
                placeholder={sliceSidebarAnnotationsPlaceholder}
                alt="Multiple user annotations on a shared layer."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={[sliceApp, sliceAppLarge]}
              placeholder={sliceAppPlaceholder}
              alt="The Slice web application showing a selected user annotation."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Experiencing the Development</ProjectSectionHeading>
              <ProjectSectionText>

              Developing a feature-rich white cane with advanced capabilities presented several challenges
              throughout the process. Firstly, integrating multiple hardware components, such as the Jetson 
              Nano, webcam, Arduino board, GPS sensor, and US sensor, required careful coordination and optimization
              to ensure seamless functionality and efficient power consumption. Secondly, implementing real-time object
              detection and positional analysis demanded sophisticated computer vision algorithms and extensive testing
              to achieve accurate and reliable results. 
              </ProjectSectionText><ProjectSectionText>
              Furthermore, incorporating language translation and Google Assistant
              required integrating complex natural language processing systems and ensuring smooth communication between the
              AI models and the user interface. Overcoming these technical hurdles demanded extensive research, iterative 
              prototyping, and rigorous testing to create a robust and user-friendly solution. Nonetheless, the experience 
              of developing this AI-powered smart white cane was highly rewarding, as it involved pushing the boundaries of 
              technology to empower visually impaired individuals, fostering independence and improving their overall quality 
              of life.

              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectSectionContent>
            <Carousel
              placeholder={slidesCar1}
              images={[
                {
                  srcSet: [slidesCar1, slidesCar1],
                  sizes: `(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 1096px`,
                  alt: 'A female character wearing the black coloured armor set.',
                },
                {
                  srcSet: [slidesCar2, slidesCar2],
                  sizes: `(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 1096px`,
                  alt: 'A close up of the custom gauntlets design.',
                },
                {
                  srcSet: [slidesCar3, slidesCar3],
                  sizes: `(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 1096px`,
                  alt: 'A female character wielding a sword and wearing the red coloured armor.',
                },
                {
                  srcSet: [slidesCar4, slidesCar4],
                  sizes: `(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 1096px`,
                  alt: 'A female character wielding a sword and wearing the red coloured armor.',
                },
                {
                  srcSet: [slidesCar5, slidesCar5],
                  sizes: `(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 1096px`,
                  alt: 'A female character wielding a sword and wearing the red coloured armor.',
                },
                {
                  srcSet: [slidesCar7, slidesCar7],
                  sizes: `(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 1096px`,
                  alt: 'A female character wielding a sword and wearing the red coloured armor.',
                },
              ]}
              width={1920}
              height={1080}
            />
          </ProjectSectionContent>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridBackground}>
                <Image
                  srcSet={[sliceBackgroundBar, sliceBackgroundBarLarge]}
                  placeholder={sliceBackgroundBarPlaceholder}
                  alt=""
                  role="presentation"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                />
              </div>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={[sliceAnnotation, sliceAnnotationLarge]}
                  placeholder={sliceAnnotationPlaceholder}
                  alt="An annotation preview popover with statistics for shape perimeter and area."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Meaningful Features</ProjectSectionHeading>
              <ProjectSectionText>
              <ul>
                <li>Real-time object detection</li>
                <li>Obstacle Positional Analysis</li>
                <li>GPS tracking.</li>
                <li>User tracking dashboard.</li>
                <li>Integration with Google Assistant.</li>
                <li>Work in over 100+ languages when online.</li>
                <li>Obstacle distance detection.</li>
                <li>Bluetooth earbuds with locked MAC address for security.</li>
                <li>Text-to-speech (TTS) interface.</li>
                <li>Emergency SOS.</li>
                <li>Automated sms and calling system</li>
                <li>Fall Detection</li>
                <li>Directly connects to cloud DB every given time interval and ubpates data such as latitude, longitude and date time.</li>             
              </ul>
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
              The outcome of the project has been remarkable, with the AI-powered smart white cane winning first prize in the Indian Ministry of Health - Smart India Hackathon 2023 and garnering interest from the government ministry for funding further development, offering the potential to positively impact the lives of visually impaired individuals on a larger scale.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={sliceIrl}
              placeholder={sliceIrlPlaceholder}
              alt="Students at the University of New South Wales using the new collaborative annotation features"
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
