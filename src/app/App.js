import React, { Component } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components/macro';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Transition, TransitionGroup } from 'react-transition-group';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Helmet } from "react-helmet";
import asyncComponent from '../components/AsyncComponent';
import Header from '../components/Header';
import NavToggle from '../components/NavToggle';
import Theme from '../utils/Theme';
import GothamBook from '../fonts/gotham-book.woff2';
import GothamMedium from '../fonts/gotham-medium.woff2';

const Home = asyncComponent(props => import("../screens/Home"));
const Contact = asyncComponent(props => import("../screens/Contact"));
const ProjectSPR = asyncComponent(props => import("../screens/ProjectSPR"));
const ProjectSlice = asyncComponent(props => import("../screens/ProjectSlice"));
const ProjectVolkiharKnight = asyncComponent(props => import("../screens/ProjectVolkiharKnight"));
const NotFound = asyncComponent(props => import("../screens/NotFound"));

const consoleMessage = `
__  __  __
\u005C \u005C \u005C \u005C \u005C\u2215
 \u005C \u005C\u2215\u005C \u005C
  \u005C\u2215  \u005C\u2215

Taking a peek huh? Check out the source code: https://github.com/HamishMW/portfolio-2018

`;

const fontStyles = `
  @font-face {
    font-family: 'Gotham';
    font-weight: 400;
    src: url(${GothamBook}) format('woff2');
    font-display: block;
  }

  @font-face {
    font-family: 'Gotham';
    font-weight: 500;
    src: url(${GothamMedium}) format('woff2');
    font-display: block;
  }
`;

class App extends Component {
  state = {
    menuOpen: false,
    theme: Theme,
  }

  componentDidMount() {
    console.info(consoleMessage);
    window.history.scrollRestoration = 'manual';
  }

  setTheme = (overrides) => {
    this.setState({ theme: { ...Theme, ...overrides } });
  }

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  }

  setBodyOverflow = state => {
    document.body.style.overflow = state;
  }

  render() {
    const { menuOpen, theme } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Route render={({ location }) => (
            <React.Fragment>
              <Helmet>
                <link rel="preload" href={`${GothamBook}`} as="font" crossorigin="crossorigin" />
                <link rel="preload" href={`${GothamMedium}`} as="font" crossorigin="crossorigin" />
                <style>{fontStyles}</style>
              </Helmet>
              <GlobalStyles />
              <SkipToMain href="#MainContent">Skip to main content</SkipToMain>
              <Header toggleMenu={this.toggleMenu} menuOpen={menuOpen} />
              <NavToggle onClick={this.toggleMenu} menuOpen={menuOpen} />
              <TransitionGroup component={React.Fragment} >
                <Transition
                  key={location.pathname}
                  timeout={500}
                  onEnter={this.setBodyOverflow('hidden')}
                  onExited={this.setBodyOverflow('')}
                >
                  {status => (
                    <MainContent status={status} id="MainContent" role="main">
                      <Helmet>
                        <link rel="canonical" href={`https://hamishw.com${location.pathname}`} />
                      </Helmet>
                      <Switch location={location}>
                        <Route exact path="/" render={props => <Home {...props} status={status} />} />
                        <Route path="/contact" render={props => <Contact {...props} status={status} />} />
                        <Route path="/projects/smart-sparrow" render={props => <ProjectSPR {...props} status={status} />} />
                        <Route path="/projects/slice" render={props => <ProjectSlice {...props} status={status} />} />
                        <Route path="/projects/volkihar-knight" render={props => <ProjectVolkiharKnight {...props} status={status} setTheme={this.setTheme} />} />
                        <Route render={props => <NotFound {...props} status={status} />} />
                      </Switch>
                    </MainContent>
                  )}
                </Transition>
              </TransitionGroup>
            </React.Fragment>
          )} />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

const GlobalStyles = createGlobalStyle`
  html,
  body {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
    font-family: ${props => props.theme.fontStack};
    background: ${props => props.theme.colorBackground(1)};
    color: ${props => props.theme.colorText(1)};
    border: 0;
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  ::selection {
    background: ${props => props.theme.colorPrimary(1)};
  }
`;

const MainContent = styled.main`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  transition: opacity 0.3s ease;
  opacity: 0;

  ${props => props.status === 'exiting' && `
    position: absolute;
    opacity: 0;
  `}

  ${props => props.status === 'entering' && `
    position: absolute;
    opacity: 0;
  `}

  ${props => props.status === 'entered' && `
    transition-duration: 0.5s;
    opacity: 1;
  `}
`;

const SkipToMain = styled.a`
  position: fixed;
  clip: rect(1px,1px,1px,1px);
  top: 16px;
  left: 50%;
  width: 1px;
  height: 1px;
  overflow: hidden;
  color: ${props => props.theme.colorBackground(1)};
  z-index: 99;
  transform: translate3d(-50%, -40px, 0);
  transition: transform 0.4s ${props => props.theme.curveFastoutSlowin};
  background: ${props => props.theme.colorPrimary(1)};
  padding: 8px 16px;
  text-decoration: none;
  font-weight: 500;
  line-height: 1;
  clip-path: ${props => props.theme.clipPath(8)};

  &:focus {
    clip: auto;
    width: auto;
    height: auto;
    outline: none;
    transform: translate3d(-50%, 0, 0);
  }
`;

export default App;
