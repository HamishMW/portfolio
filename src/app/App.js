import React, { Component } from 'react';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
const NotFound = asyncComponent(props => import("../screens/NotFound"));

class App extends Component {
  state = {
    menuOpen: false,
  }

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({menuOpen: !menuOpen});
  }

  render() {
    const { menuOpen } = this.state;

    return (
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <Route render={({location}) => (
            <React.Fragment>
              <SkipToMain href="#MainContent">Skip to main content</SkipToMain>
              <Header toggleMenu={this.toggleMenu} menuOpen={menuOpen} />
              <NavToggle onClick={this.toggleMenu} menuOpen={menuOpen} />
              <MainContent id="MainContent" role="main">
                <Switch location={location}>
                  <Route exact path="/" render={props => <Home {...props} />}/>
                  <Route path="/contact" render={props => <Contact {...props} />}/>
                  <Route path="/projects/smart-sparrow" render={props => <ProjectSPR {...props} />}/>
                  <Route path="/projects/slice" render={props => <ProjectSlice {...props} />}/>
                  <Route render={props => <NotFound {...props} />}/>
                </Switch>
              </MainContent>
            </React.Fragment>
          )}/>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

injectGlobal`
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

  html,
  body {
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
    font-family: ${Theme.fontStack};
    background: ${Theme.colorBackground(1)};
    color: ${Theme.colorText(1)};
    border: 0;
    margin: 0;
    overflow-x: hidden;
    width: 100vw;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  ::selection {
    background: ${Theme.colorPrimary(1)};
  }
`;

const MainContent = styled.main`
  position: relative;
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
