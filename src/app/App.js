import React, { Component } from 'react';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../screens/Home';
import Header from '../components/Header';
import NavToggle from '../components/NavToggle';
import Theme from '../utils/Theme';
import GothamBlack from '../fonts/gotham-black.woff2';
import GothamBook from '../fonts/gotham-book.woff2';
import GothamMedium from '../fonts/gotham-medium.woff2';

const Fragment = React.Fragment;

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
          <Fragment>
            <SkipToMain href="#MainContent">Skip to main content</SkipToMain>
            <Header toggleMenu={this.toggleMenu} menuOpen={menuOpen} />
            <NavToggle onClick={this.toggleMenu} menuOpen={menuOpen} />
            <MainContent id="MainContent">
              <Switch>
                <Route exact path="/" render={() => <Home />} />
              </Switch>
            </MainContent>
          </Fragment>
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

  @font-face {
    font-family: 'Gotham';
    font-weight:700;
    src: url(${GothamBlack}) format('woff2');
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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const SkipToMain = styled.a`
  position: absolute;
  left: -10000px;
  top: auto;
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
    position: fixed;
    top: 16px;
    left: 50%;
    width: auto;
    height: auto;
    outline: none;
    transform: translate3d(-50%, 0, 0);
  }
`;

export default App;
