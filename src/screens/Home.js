import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import 'intersection-observer';
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';
import Footer from '../components/Footer';
import sprProject from '../assets/spr-project.png';
import sprProjectLarge from '../assets/spr-project-large.png';
import sprProjectPlaceholder from '../assets/spr-project-placeholder.png';
import gamestackLogin from '../assets/gamestack-login.jpg';
import gamestackLoginLarge from '../assets/gamestack-login-large.jpg';
import gamestackLoginPlaceholder from '../assets/gamestack-login-placeholder.jpg';
import gamestackList from '../assets/gamestack-list.jpg';
import gamestackListLarge from '../assets/gamestack-list-large.jpg';
import gamestackListPlaceholder from '../assets/gamestack-list-placeholder.jpg';
import sliceProject from '../assets/slice-project.png';
import sliceProjectLarge from '../assets/slice-project-large.png';
import sliceProjectPlaceholder from '../assets/slice-project-placeholder.png';

const disciplines = ['Developer', 'Prototyper', 'Animator', 'Illustrator', 'Modder'];

export default function Home(props) {
  const { status, location } = props;
  const { hash } = location;
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();
  const disciplineTimeout = useRef();
  const sectionObserver = useRef();
  const indicatorObserver = useRef();

  useEffect(() => {
    initializeObservers();

    return function cleanUp() {
      clearTimeout(disciplineTimeout.current);
      if (sectionObserver.current) sectionObserver.current.disconnect();
      if (indicatorObserver.current) indicatorObserver.current.disconnect();
    }
  }, []);

  useEffect(() => {
    if (status === 'entered') {
      handleHashchange(hash, true);
    }
  }, [location.key]);

  useEffect(() => {
    initScrollPosition();
  }, [status]);

  useEffect(() => {
    disciplineTimeout.current = setTimeout(() => {
      const index = disciplineIndex >= disciplines.length - 1 ? 0 : disciplineIndex + 1;
      setDisciplineIndex(index);
    }, 5000);
  }, [disciplineIndex]);

  const initScrollPosition = () => {
    if (hash && status === 'entered') {
      handleHashchange(hash, false);
    } else if (status === 'entered') {
      window.scrollTo(0, 0);
    }
  }

  const initializeObservers = () => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, details];

    sectionObserver.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          setVisibleSections((prevSections) => [...prevSections, section]);
          sectionObserver.current.unobserve(section);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });

    indicatorObserver.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setScrollIndicatorHidden(false);
        } else {
          setScrollIndicatorHidden(true);
        }
      });
    }, { rootMargin: "-100% 0px 0px 0px" });

    revealSections.forEach((section) => {
      sectionObserver.current.observe(section.current);
    });

    indicatorObserver.current.observe(intro.current);
  }

  const handleHashchange = (hash, scroll) => {
    const hashSections = [intro, projectOne, details];
    const hashString = hash.replace('#', '');
    const element = hashSections.filter(item => item.current.id === hashString)[0];

    if (element) {
      element.current.scrollIntoView({
        behavior: scroll ? 'smooth' : 'instant',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  return (
    <React.Fragment>
      <Helmet
        title="Hamish Williams | Designer"
        meta={[{
          name: 'description',
          content: "Portfolio of Hamish Williams – a digital designer working on web &amp; mobile apps with a focus on motion and user experience design.",
        }]}
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        disciplineIndex={disciplineIndex}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectItem
        id="projects"
        tabIndex={0}
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index="01"
        title="Designing the future of education"
        description="Designing a platfrom to help educators build better online courseware"
        buttonText="View Project"
        buttonTo="/projects/smart-sparrow"
        imageSrc={[`${sprProject} 980w, ${sprProjectLarge} 1376w`]}
        imageAlt={['Smart Sparrow lesson builder']}
        imagePlaceholder={[sprProjectPlaceholder]}
        imageType="laptop"
      />
      <ProjectItem
        tabIndex={0}
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index="02"
        title="Video game progress tracking"
        description="Design and development for a video game tracking app built in React Native"
        buttonText="View Website"
        buttonLink="https://gamestackapp.com"
        imageSrc={[
          `${gamestackLogin} 254w, ${gamestackLoginLarge} 508w`,
          `${gamestackList} 254w, ${gamestackListLarge} 508w`,
        ]}
        imageAlt={[
          'App login screen',
          'List of games being tracked',
        ]}
        imagePlaceholder={[
          gamestackLoginPlaceholder,
          gamestackListPlaceholder,
        ]}
        imageType="phone"
      />
      <ProjectItem
        tabIndex={0}
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index="03"
        title="Biomedical image collaboration"
        description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
        buttonText="View Project"
        buttonTo="/projects/slice"
        imageSrc={[`${sliceProject} 980w, ${sliceProjectLarge} 1376w`]}
        imageAlt={['Annotating a biomedical image in the Slice app']}
        imagePlaceholder={[sliceProjectPlaceholder]}
        imageType="laptop"
      />
      <Profile
        tabIndex={0}
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </React.Fragment>
  );
};
