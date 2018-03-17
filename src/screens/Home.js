import React, { Component } from 'react';
import styled from 'styled-components';
import DisplacementSphere from '../components/DisplacementSphere';
import Intro from '../components/Intro';
import Project from '../components/Project';
import projectSpr from '../assets/project-spr.png';
import projectSprLarge from '../assets/project-spr-large.png';
const disciplines = ['Developer', 'Animator', 'Illustrator', 'Modder'];

export default class Home extends Component {
  state = {
    disciplineIndex: 0,
    hideScrollIndicator: false,
    scrollY: 0,
    visibleSections: [],
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;
    const sphere = new DisplacementSphere(threeCanvas);
    requestAnimationFrame(() => sphere.init());
    this.switchDiscipline();
    window.addEventListener('scroll', this.handleScroll);
    this.setState({visibleSections: [this.intro]});
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.scrollY;
    const revealSections = [this.intro, this.projectOne, this.projectTwo];
    const { visibleSections } = this.state;

    if (scrollY >= 50) {
      this.setState({hideScrollIndicator: true});
    } else {
      this.setState({hideScrollIndicator: false});
    }

    revealSections.map((section) => {
      const isVisible = visibleSections.includes(section);
      const showSection = this.isInViewport(section) && !isVisible;
      if (showSection) {
        const sections = [...visibleSections, section];
        this.setState({visibleSections: sections});
      }
      return section;
    });

    this.setState({scrollY});
  }

  isInViewport = (elem) => {
    const bounding = elem.getBoundingClientRect();
    return bounding.top <= window.innerHeight * 0.8 && bounding.top >= 0;
  };

  switchDiscipline = () => {
    setInterval(() => {
      const { disciplineIndex } = this.state;
      const index = disciplineIndex >= disciplines.length - 1 ? 0 : disciplineIndex + 1;

      this.setState({
        disciplineIndex: index,
      });
    }, 5000);
  }

  render() {
    const { disciplineIndex, hideScrollIndicator, visibleSections } = this.state;

    return (
      <HomeContainer>
        <Intro
          sectionRef={section => this.intro = section}
          threeCanvas={canvas => this.threeCanvas = canvas}
          disciplines={disciplines}
          disciplineIndex={disciplineIndex}
          hideScrollIndicator={hideScrollIndicator}
        />
        <Project
          sectionRef={section => this.projectOne = section}
          visible={visibleSections.includes(this.projectOne)}
          index="01"
          title="Designing the future of education"
          description="A description for this work example to prompt
          clicking a link to learn more"
          imageSrc={`${projectSpr} 1x, ${projectSprLarge} 2x`}
          imageAlt="Smart Sparrow lesson author"
          imageType="laptop"
        />
        <Project
          sectionRef={section => this.projectTwo = section}
          visible={visibleSections.includes(this.projectTwo)}
          index="02"
          title="Designing the future of education"
          description="A description for this work example to prompt
          clicking a link to learn more"
          imageSrc={`${projectSpr} 1x, ${projectSprLarge} 2x`}
          imageAlt="Smart Sparrow lesson author"
          imageType="laptop"
        />
    </HomeContainer>
    );
  }
}

const HomeContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
