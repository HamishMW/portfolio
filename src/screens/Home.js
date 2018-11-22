import React, { Component } from 'react';
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

const disciplines = ['Developer', 'Animator', 'Illustrator', 'Modder'];

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disciplineIndex: 0,
      backgroundLoaded: false,
      visibleSections: [],
      hideScrollIndicator: false,
    }
  }

  componentDidMount() {
    const threeCanvas = this.threeCanvas;

    this.revealSections = [
      this.intro,
      this.projectOne,
      this.projectTwo,
      this.projectThree,
      this.details,
    ];

    import('../components/DisplacementSphere').then(DisplacementSphere => {
      this.setState({ backgroundLoaded: true });
      this.sphere = new DisplacementSphere.default(threeCanvas);
      requestAnimationFrame(() => this.sphere.init());
    });

    this.initializeObservers();
    this.switchDiscipline();
    this.initScrollPosition();
  }

  initScrollPosition = () => {
    const { status, location } = this.props;
    const { hash } = location;

    if (status !== 'entered') {
      requestAnimationFrame(this.initScrollPosition);
    } else if (hash && status === 'entered') {
      this.handleHashchange(hash, false);
    } else if (status === 'entered') {
      window.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    this.sphere.remove();
    clearInterval(this.disciplineInterval);
  }

  componentDidUpdate(prevProps) {
    const { key: currentKey } = prevProps.location;
    const { key: nextKey, hash: nextHash } = this.props.location;

    if (currentKey !== nextKey && prevProps.status === 'entered') {
      this.handleHashchange(nextHash, true);
    }
  }

  initializeObservers = () => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { visibleSections } = this.state;

        if (entry.isIntersecting) {
          const section = entry.target;
          this.setState({ visibleSections: [...visibleSections, section] });
          sectionObserver.unobserve(section);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });

    const indicatorObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setState({ hideScrollIndicator: false })
        } else {
          this.setState({ hideScrollIndicator: true })
        }
      });
    }, { rootMargin: "-100% 0px 0px 0px" });

    this.revealSections.forEach((section) => {
      sectionObserver.observe(section);
    });

    indicatorObserver.observe(this.intro);
  }

  handleHashchange = (hash, scroll) => {
    const hashSections = [this.intro, this.projectOne, this.details];
    const hashString = hash.replace('#', '');
    const element = hashSections.filter(item => item.id === hashString)[0];

    if (element) {
      element.scrollIntoView({
        behavior: scroll ? 'smooth' : 'instant',
        block: 'start',
        inline: 'nearest',
      });
    }
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
    const { disciplineIndex, visibleSections, backgroundLoaded, hideScrollIndicator } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Hamish Williams | Designer</title>
          <meta
            name="description"
            content="Portfolio of Hamish Williams – a digital designer working on web &amp; mobile apps with a focus on motion and user experience design."
          />
        </Helmet>
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
          tabIndex={0}
          sectionRef={section => this.projectOne = section}
          visible={visibleSections.includes(this.projectOne)}
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
          sectionRef={section => this.projectTwo = section}
          visible={visibleSections.includes(this.projectTwo)}
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
          sectionRef={section => this.projectThree = section}
          visible={visibleSections.includes(this.projectThree)}
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
          sectionRef={section => this.details = section}
          visible={visibleSections.includes(this.details)}
          id="details"
        />
        <Footer />
      </React.Fragment>
    );
  }
}
