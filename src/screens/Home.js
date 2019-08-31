import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppContext } from 'app';
import Intro from 'screens/Intro';
import ProjectItem from 'screens/ProjectItem';
import Profile from 'screens/Profile';
import Footer from 'components/Footer';
import { usePrefersReducedMotion } from 'utils/hooks';
import sprProject from 'assets/spr-project.png';
import sprProjectLarge from 'assets/spr-project-large.png';
import sprProjectPlaceholder from 'assets/spr-project-placeholder.png';
import gamestackLogin from 'assets/gamestack-login.jpg';
import gamestackLoginLarge from 'assets/gamestack-login-large.jpg';
import gamestackLoginPlaceholder from 'assets/gamestack-login-placeholder.jpg';
import gamestackList from 'assets/gamestack-list.jpg';
import gamestackListLarge from 'assets/gamestack-list-large.jpg';
import gamestackListPlaceholder from 'assets/gamestack-list-placeholder.jpg';
import sliceProject from 'assets/slice-project.png';
import sliceProjectLarge from 'assets/slice-project-large.png';
import sliceProjectPlaceholder from 'assets/slice-project-placeholder.png';

const disciplines = ['Developer', 'Prototyper', 'Animator', 'Illustrator', 'Modder'];

export default function Home(props) {
  const { status } = useContext(AppContext);
  const { location } = props;
  const { hash, state } = location;
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          sectionObserver.unobserve(section);
          if (visibleSections.includes(section)) return;
          setVisibleSections(prevSections => [...prevSections, section]);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    const indicatorObserver = new IntersectionObserver(([entry]) => {
      setScrollIndicatorHidden(!entry.isIntersecting);
    }, { rootMargin: '-100% 0px 0px 0px' });

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return function cleanUp() {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

    const handleHashchange = (hash, scroll) => {
      const hashSections = [intro, projectOne, details];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      const scrollObserver = new IntersectionObserver(entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          element.current.focus();
          scrollObserver.unobserve(entry.target);
        }
      }, { rootMargin: '-20% 0px -20% 0px' });

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }
  }, [hash, state, prefersReducedMotion, status]);

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
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectItem
        id="projects"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index="01"
        title="Designing the future of education"
        description="Designing a platfrom to help educators build better online courseware"
        buttonText="View Project"
        buttonTo="/projects/smart-sparrow"
        imageSrc={useMemo(() => [`${sprProject} 980w, ${sprProjectLarge} 1376w`], [])}
        imageAlt={useMemo(() => ['Smart Sparrow lesson builder'], [])}
        imagePlaceholder={useMemo(() => [sprProjectPlaceholder], [])}
        imageType="laptop"
      />
      <ProjectItem
        id="projects-1"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index="02"
        title="Video game progress tracking"
        description="Design and development for a video game tracking app built in React Native"
        buttonText="View Website"
        buttonLink="https://gamestackapp.com"
        imageSrc={useMemo(() => [
          `${gamestackLogin} 254w, ${gamestackLoginLarge} 508w`,
          `${gamestackList} 254w, ${gamestackListLarge} 508w`,
        ], [])}
        imageAlt={useMemo(() => [
          'App login screen',
          'List of games being tracked',
        ], [])}
        imagePlaceholder={useMemo(() => [
          gamestackLoginPlaceholder,
          gamestackListPlaceholder,
        ], [])}
        imageType="phone"
      />
      <ProjectItem
        id="projects-2"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index="03"
        title="Biomedical image collaboration"
        description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
        buttonText="View Project"
        buttonTo="/projects/slice"
        imageSrc={useMemo(() => [`${sliceProject} 980w, ${sliceProjectLarge} 1376w`], [])}
        imageAlt={useMemo(() => ['Annotating a biomedical image in the Slice app'], [])}
        imagePlaceholder={useMemo(() => [sliceProjectPlaceholder], [])}
        imageType="laptop"
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </React.Fragment>
  );
};
