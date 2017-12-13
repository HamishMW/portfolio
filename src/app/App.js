import React, { Component } from 'react';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Intro from '../screens/Intro';
import RetroIntro from '../screens/RetroIntro';
import Header from '../components/Header';
import TagManager from '../utils/TagManager';
import Theme from '../utils/Theme';
import GothamBlack from '../fonts/gotham-black.woff2';
import GothamBook from '../fonts/gotham-book.woff2';
import GothamMedium from '../fonts/gotham-medium.woff2';

const Fragment = React.Fragment;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <Fragment>
          <TagManager gtmId='GTM-MCT5BTN' />
          <BrowserRouter>
            <Fragment>
              <Switch>
                <Route exact path="/" component={Intro} />
                <Route path="/1980" component={RetroIntro} />
              </Switch>
              <Header />
            </Fragment>
          </BrowserRouter>
        </Fragment>
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
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

export default App;
