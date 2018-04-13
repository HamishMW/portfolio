import React, { PureComponent } from 'react';
import styled from 'styled-components';
import HeadTag from 'react-head';
import Intro from '../screens/Intro';
import ProjectItem from '../screens/ProjectItem';
import Profile from '../screens/Profile';

import projectSpr from '../assets/project-spr.png';
import projectSprLarge from '../assets/project-spr-large.png';
import projectSprPlaceholder from '../assets/project-spr-placeholder.png';
import gamestackLogin from '../assets/gamestack-login.jpg';
import gamestackLoginLarge from '../assets/gamestack-login-large.jpg';
import gamestackLoginPlaceholder from '../assets/gamestack-login-placeholder.jpg';
import gamestackList from '../assets/gamestack-list.jpg';
import gamestackListLarge from '../assets/gamestack-list-large.jpg';
import gamestackListPlaceholder from '../assets/gamestack-list-placeholder.jpg';
import projectSlice from '../assets/project-slice.png';
import projectSliceLarge from '../assets/project-slice-large.png';
import projectSlicePlaceholder from '../assets/project-slice-placeholder.png';

const disciplines = ['Developer', 'Animator', 'Illustrator', 'Modder'];

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      disciplineIndex: 0,
      hideScrollIndicator: false,
      backgroundLoaded: false,
      visibleSections: [],
    }

    this.scheduledAnimationFrame = false;
    this.lastScrollY = 0;
  }


  componentDidMount() {
    const { location } = this.props;
    const threeCanvas = this.threeCanvas;

    import('../components/DisplacementSphere').then(DisplacementSphere => {
      this.setState({backgroundLoaded: true});
      const sphere = new DisplacementSphere.default(threeCanvas);
      requestAnimationFrame(() => sphere.init());
    });

    window.addEventListener('scroll', this.handleScroll);
    this.setState({visibleSections: [this.intro]});
    this.handleScroll();
    this.handleHashchange(location.hash, false);
    this.switchDiscipline();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('hashchange', this.handleHashchange);
    clearInterval(this.disciplineInterval);
  }

  componentWillReceiveProps(nextProps) {
    const currentHash = this.props.location.hash;
    const nextHash = nextProps.location.hash;

    if (currentHash !== nextHash) {
      this.handleHashchange(nextHash, true);
    }
  }

  handleScroll = () => {
    this.lastScrollY = window.scrollY;
    if (this.scheduledAnimationFrame) return;
    this.scheduledAnimationFrame = true;

    requestAnimationFrame(() => {
      const revealSections = [
        this.intro,
        this.projectOne,
        this.projectTwo,
        this.projectThree,
        this.details,
      ];
      const { visibleSections } = this.state;

      if (this.lastScrollY >= 50) {
        this.setState({hideScrollIndicator: true});
      } else {
        this.setState({hideScrollIndicator: false});
      }

      for (const section of revealSections) {
        if (visibleSections.includes(section)) continue;
        if (this.isInViewport(section, this.lastScrollY)) {
          this.setState({visibleSections: [...visibleSections, section]});
        }
      };

      this.scheduledAnimationFrame = false;
    });
  }

  handleHashchange = (hash, scroll) => {
    const hashSections = [this.intro, this.projectOne, this.details];
    const hashString = hash.replace('#', '');
    const element = hashSections.filter((item) => {
      return item.id === hashString;
    })[0];

    if (element) {
      element.scrollIntoView({
        behavior: scroll ? 'smooth' : 'instant',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  isInViewport = (elem, scrollY) => {
    const rect = elem.getBoundingClientRect();
    const offsetY = window.pageYOffset;
    const revealOffset = window.innerHeight - 100;
    const top = rect.top + offsetY;
    return top - revealOffset <= scrollY;
  }

  switchDiscipline = () => {
    this.disciplineInterval = setInterval(() => {
      const { disciplineIndex } = this.state;
      const index = disciplineIndex >= disciplines.length - 1 ? 0 : disciplineIndex + 1;

      this.setState({
        disciplineIndex: index,
      });
    }, 5000);
  }

  render() {
    const { disciplineIndex, hideScrollIndicator,
      visibleSections, backgroundLoaded } = this.state;

    return (
      <HomeContainer>
        <HeadTag tag="title">Hamish Williams | Multidisciplinary Designer</HeadTag>
        <HeadTag
          tag="meta"
          name="description"
          content="Digital designer working on web &amp; mobile apps with a focus on
            motion design and user experience."
        />
        <Intro
          id="intro"
          sectionRef={section => this.intro = section}
          threeCanvas={canvas => this.threeCanvas = canvas}
          disciplines={disciplines}
          disciplineIndex={disciplineIndex}
          hideScrollIndicator={hideScrollIndicator}
          backgroundLoaded={backgroundLoaded}
        />
      <ProjectItem
          id="projects"
          sectionRef={section => this.projectOne = section}
          visible={visibleSections.includes(this.projectOne)}
          index="01"
          title="Designing the future of education"
          description="I designed a web app that helps educators build better online courseware"
          buttonText="View Project"
          imageSrc={[`${projectSpr} 1x, ${projectSprLarge} 2x`]}
          imageAlt={['Smart Sparrow lesson builder']}
          imagePlaceholder={[projectSprPlaceholder]}
          imageType="laptop"
        />
      <ProjectItem
          sectionRef={section => this.projectTwo = section}
          visible={visibleSections.includes(this.projectTwo)}
          index="02"
          title="Video game progress tracking"
          description="Design and development for a video game tracking app built in React Native"
          buttonText="View Website"
          buttonLink="https://www.gamestackapp.com"
          imageSrc={[
            `${gamestackLogin} 1x, ${gamestackLoginLarge} 2x`,
            `${gamestackList} 1x, ${gamestackListLarge} 2x`,
          ]}
          imageAlt={[
            'Smart Sparrow lesson author',
            'Smart Sparrow lesson author',
          ]}
          imagePlaceholder={[
            gamestackLoginPlaceholder,
            gamestackListPlaceholder,
          ]}
          imageType="phone"
        />
      <ProjectItem
          id="projects"
          sectionRef={section => this.projectThree = section}
          visible={visibleSections.includes(this.projectThree)}
          index="03"
          title="Biomedical image collaboration"
          description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
          buttonText="View Project"
          imageSrc={[`${projectSlice} 1x, ${projectSliceLarge} 2x`]}
          imageAlt={['Smart Sparrow lesson builder']}
          imagePlaceholder={[projectSlicePlaceholder]}
          imageType="laptop"
        />
        <Profile
          sectionRef={section => this.details = section}
          visible={visibleSections.includes(this.details)}
          id="details"
        />
      </HomeContainer>
    );
  }
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
