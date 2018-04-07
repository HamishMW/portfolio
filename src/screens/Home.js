import React, { PureComponent } from 'react';
import styled from 'styled-components';
import HeadTag from 'react-head';
import Intro from '../screens/Intro';
import Project from '../screens/Project';
import Profile from '../screens/Profile';
import projectSpr from '../assets/project-spr.png';
import projectSprLarge from '../assets/project-spr-large.png';
import gamestackLogin from '../assets/gamestack-login.jpg';
import gamestackLoginLarge from '../assets/gamestack-login-large.jpg';
import gamestackList from '../assets/gamestack-list.jpg';
import gamestackListLarge from '../assets/gamestack-list-large.jpg';
const disciplines = ['Developer', 'Animator', 'Illustrator', 'Modder'];

export default class Home extends PureComponent {
  state = {
    disciplineIndex: 0,
    hideScrollIndicator: false,
    backgroundLoaded: false,
    visibleSections: [],
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
    const scrollY = window.scrollY;
    const revealSections = [this.intro, this.projectOne, this.projectTwo, this.details];
    const { visibleSections } = this.state;

    if (scrollY >= 50) {
      this.setState({hideScrollIndicator: true});
    } else {
      this.setState({hideScrollIndicator: false});
    }

    for (const section of revealSections) {
      const isVisible = visibleSections.includes(section);
      const showSection = this.isInViewport(section, scrollY) && !isVisible;
      if (showSection) {
        const sections = [...visibleSections, section];
        this.setState({visibleSections: sections});
      }
    };
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
    const bounding = elem.getBoundingClientRect();
    return bounding.top <= scrollY;
  };

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
        <HeadTag tag="meta" name="description" content="Digital designer working on web & mobile apps with a focus on motion design and user experience." />
        <Intro
          id="intro"
          sectionRef={section => this.intro = section}
          threeCanvas={canvas => this.threeCanvas = canvas}
          disciplines={disciplines}
          disciplineIndex={disciplineIndex}
          hideScrollIndicator={hideScrollIndicator}
          backgroundLoaded={backgroundLoaded}
        />
        <Project
          id="projects"
          sectionRef={section => this.projectOne = section}
          visible={visibleSections.includes(this.projectOne)}
          index="01"
          title="Designing the future of education"
          description="A description for this work example to prompt
          clicking a link to learn more"
          buttonText="View Project"
          imageSrc={[`${projectSpr} 1x, ${projectSprLarge} 2x`]}
          imageAlt={['Smart Sparrow lesson builder']}
          imageType="laptop"
        />
        <Project
          sectionRef={section => this.projectTwo = section}
          visible={visibleSections.includes(this.projectTwo)}
          index="02"
          title="Video game progress tracking"
          description="A description for this work example to prompt
          clicking a link to learn more"
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
          imageType="phone"
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
