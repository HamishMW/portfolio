import sliceBackgroundLarge from 'assets/onebit/onebit-background.jpeg';
import sliceBackgroundPlaceholder from 'assets/onebit/onebit-background.jpeg';
import sliceBackground from 'assets/onebit/onebit-background.jpeg';
import sliceSidebarAnnotationsPlaceholder from 'assets/slice-sidebar-annotations-placeholder.png';
import sliceSidebarLayersPlaceholder from 'assets/slice-sidebar-layers-placeholder.png';

import sliceSlidesLarge from 'assets/onebit/portals-collage.jpg';
import sliceSlidesPlaceholder from 'assets/onebit/portals-collage.jpg';
import sliceSlides from 'assets/onebit/portals-collage.jpg';

import OneBITTexture3 from 'assets/onebit/onebit-texture3.jpg';
import OneBITTextureLarge3 from 'assets/onebit/onebit-texture3-large.jpg';
import OneBITTexture4 from 'assets/onebit/onebit-texture4.jpg';
import OneBITTextureLarge4 from 'assets/onebit/onebit-texture4-large.jpg';

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
import { Fragment } from 'react';
import { media } from 'utils/style';
import styles from './Onebit.module.css';

const title = 'OneBIT Application';
const description =
  'OneBIT is a revolutionary cross platform application that serves as an all-in-one solution for my college students, streamlining tasks such as leave applications, reward tracking, online FA exams, and more with centralized authentication system.';
const roles = ['Web Scrapping', 'UI/UX Design', 'React Native', 'Cross Authentication'];

export const Onebit = () => {

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
          url="/contact"
          linkLabel="Request early access"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Bringing it together</ProjectSectionHeading>
              <ProjectSectionText>
                OneBIT is the ultimate one-stop solution for students on our college campus, addressing the issues we often encounter. Here&apos;s a quick rundown of what this revolutionary app offers:
              </ProjectSectionText>
              <ProjectSectionText>
                <ul>
                  <li> <b>Leave Applications:</b> Apply for leaves and on-duty requests seamlessly. </li>
                  <li> <b>Reward Points:</b> Keep track of your activities and SSIG targets in fingertips. </li>
                  <li> <b>Online FA Exams:</b> Access and attend FA exams seamlessly. </li>
                  <li> <b>Student Profile Details:</b> Get easy access to your academic data and achievements. </li>
                  <li> <b>Dashboard Details:</b> Check your student targets, FA percentage, and current CGPA effortlessly. </li>
                  <li> <b>ChatGPT Integration:</b> No API ChatGPT integration in native using experience. </li>
                  <li> <b>In-Built Browser:</b> No more switching apps; access everything within OneBIT. </li>
                </ul>
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[OneBITTexture4, OneBITTextureLarge4]}
                placeholder={sliceSidebarLayersPlaceholder}
                alt="The layers sidebar design, now with user profiles."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[OneBITTexture3, OneBITTextureLarge3]}
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
                The problem I noticed among my friends and fellow students is the existence of more than five web portals that we rely on daily for college activities such as attending FA exams and submitting leave applications. Furthermore, none of these web portals have a mobile application. Therefore, the groundbreaking solution of integrating all these web portals using a centralized authentication system with a mobile-native UI for both Android and iOS addresses this issue effectively.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={[sliceSlides, sliceSlidesLarge]}
              placeholder={sliceSlidesPlaceholder}
              alt="The new My Slides tab in slice, showing annotated and favorited slides."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <center><video width={'50%'} muted="muted" poster="https://media.licdn.com/dms/image/D5605AQH-aGqiA9GNmw/videocover-high/0/1699249152472?e=1700215200&amp;v=beta&amp;t=YgzKEdkNeX9KxKvR7D34GsALsCEqUGaQeW7p_eNgEuM" src="https://dms.licdn.com/playlist/vid/D5605AQH-aGqiA9GNmw/mp4-720p-30fp-crf28/0/1699249160744?e=1700215200&amp;v=beta&amp;t=Cdl84_cvzerJJIpwxCtR0myanQkB8DM87w1eNhRhcsE" autoPlay="autoplay"></video></center>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                My solution to a common problem faced by students in my college is OneBIT, a React Native and Expo application that efficiently integrates multiple campus portals. By pulling live data from college servers, I&apos;ve created a user-friendly, all-in-one solution with a centralized authentication system and a mobile-native UI for both Android and iOS. This addresses the absence of dedicated mobile applications for crucial tasks like attending FA exams and submitting leave applications, significantly improving the overall college experience.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
