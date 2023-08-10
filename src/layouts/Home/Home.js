import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sprTexturePlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';

import { Text } from 'components/Text';

import nebulaDashboard from 'assets/nebula-dashboard.jpg';
import nebulaDashboardLarge from 'assets/nebula-dashboard-large.jpg';

import OneBITTexture from 'assets/onebit-texture1.jpg';
import OneBITTextureLarge from 'assets/onebit-texture1-large.jpg';
import OneBITTexture2 from 'assets/onebit-texture2.jpg';
import OneBITTextureLarge2 from 'assets/onebit-texture2-large.jpg';

import SmartWhitecane from 'assets/smart-whitecane.jpg';
import SmartWhitecaneLarge from 'assets/smart-whitecane-large.jpg';

import YoutubeStudio from 'assets/youtubeAutomation/studio-gif.gif';
import YoutubeExplore from 'assets/youtubeAutomation/explore.png';

import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

import { useTheme } from 'components/ThemeProvider';

import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Innovator', 'Prototyper', 'Engineer', 'Designer', 'Modder'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const [vantaEffect, setVantaEffect] = useState(0);  // vanta
  const vantaRef = useRef(null);                      // vanta
  const intro = useRef();

  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();

  const details = useRef();

  const theme = useTheme();

  useEffect(() => {
    if (!vantaEffect) {
      console.log("Initiating vanta first time on " + theme.themeId + " mode");
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x7084f4,
          backgroundColor: (theme.themeId === "dark") ? 0x111111 : 0xf2f2f2,
          points: 7.00,
          maxDistance: 18.00,
          spacing: 20.00
        })
      );
    } else {
      // Update existing Vanta.js effect properties
      console.log("Vanta initiated already -> updating to " + theme.themeId + " mode");
      if (theme.themeId === "dark") {
        console.log("Inside Dark block");
        vantaEffect.options.backgroundColor = 0x111111;
        vantaEffect.options.color = 0x7084f4
      } else {
        //little clumsy on here as vanta doesn't react with react well ig ;
        vantaEffect.destroy();
        const newVantaEffect = NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x7084f4,
          backgroundColor: (theme.themeId === "dark") ? 0x111111 : 0xf2f2f2,
          points: 7.00,
          maxDistance: 18.00,
          spacing: 20.00
        });
        // Set the new Vanta.js effect
        setVantaEffect(newVantaEffect);

      }
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [theme]);

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);


  return (
    <div className={styles.home}>
      <Meta
        title="Developer + Innovator"
        description="Design portfolio of GANISH DEEPAK — a developer working on various frameworks to learn and excel current trends"
      />
      <div ref={vantaRef}>
        <Intro
          id="intro"
          sectionRef={intro}
          disciplines={disciplines}
          scrollIndicatorHidden={scrollIndicatorHidden}
        /></div>
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Nebula Dashboard"
        description="A Mutual Funds Portfolio for better tracking and analysis with 45.1k live schemes data built over mern stack technology"
        buttonText="View project"
        //buttonLink="/projects/smart-sparrow"
        buttonLink="https://nebuladashboard2023.web.app"
        model={{
          type: 'laptop',
          alt: 'Nebula Dashboard PReview',
          textures: [
            {
              srcSet: [nebulaDashboard, nebulaDashboardLarge],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="OneBIT Application"
        description="An one stop application for all needs inside BIT Campus right from study materials to leave applications requiring to login only once. Actively under construction."
        buttonText="Download Now"
        buttonLink="https://github.com/gd03champ/OneBIT"
        model={{
          type: 'phone',
          alt: 'OneBIT Onboarding (Under Dev)',
          textures: [
            {
              srcSet: [OneBITTexture2, OneBITTextureLarge2],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [OneBITTexture, OneBITTextureLarge],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Smart Whitcane"
        description="AI based Smart Whitecane with features like realtime object detection , google assistant and location tracking, making life of VI a lot easier. SIH 2022 winning project."
        buttonText="View project"
        buttonLink="/projects/smart-whitecane"
        model={{
          type: 'laptop',
          alt: 'Smart Whitecane Image',
          textures: [
            {
              srcSet: [SmartWhitecane, SmartWhitecaneLarge],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="YouTube Automation Software"
        description="I created a fully automated solution using insta loader, insta looter, ffmpeg, and moviepy to manage a YouTube channel, handling tasks such as Instagram login, reel downloads, video compilation, watermarking, Google login, and YouTube uploads using the v3 API, revolutionizing content creation and maximizing productivity."
        buttonText="View Project"
        buttonLink="/articles/how-i-created-a-fully-automated-youtube-channel/"
        model={{
          type: 'phone',
          alt: 'OneBIT Onboarding (Under Dev)',
          textures: [
            {
              srcSet: [YoutubeExplore, YoutubeExplore],
              placeholder: gamestackTexture2Placeholder,
            },
            {
              srcSet: [YoutubeStudio, YoutubeStudio],
              placeholder: gamestackTexturePlaceholder,
            },
          ],
        }}
      />
      {/*<center>
        <Text>
          Four more projects are being configured to be loaded in this space.
          <br />
          Hang Tight!
        </Text>
      </center>*/}
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
