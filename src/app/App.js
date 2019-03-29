import React, { lazy, Suspense, useState, useEffect, createContext, useCallback } from 'react';
import styled, { createGlobalStyle, ThemeProvider, css } from 'styled-components/macro';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../components/Header';
import NavToggle from '../components/NavToggle';
import { dark, light } from '../utils/Theme';
import GothamBook from '../fonts/gotham-book.woff2';
import GothamMedium from '../fonts/gotham-medium.woff2';

const Home = lazy(() => import('../screens/Home'));
const Contact = lazy(() => import('../screens/Contact'));
const ProjectSPR = lazy(() => import('../screens/ProjectSPR'));
const ProjectSlice = lazy(() => import('../screens/ProjectSlice'));
const ProjectVolkihar = lazy(() => import('../screens/ProjectVolkihar'));
const NotFound = lazy(() => import('../screens/404'));

const prerender = navigator.userAgent === 'ReactSnap';
export const AppContext = createContext();

const consoleMessage = `
__  __  __
\u005C \u005C \u005C \u005C \u005C\u2215\n \u005C \u005C\u2215\u005C \u005C\n  \u005C\u2215  \u005C\u2215
\n\nTaking a peek huh? Check out the source code: https://github.com/HamishMW/portfolio-2018\n\n
`;

const fontStyles = `
  @font-face {
    font-family: 'Gotham';
    font-weight: 400;
    src: url(${GothamBook}) format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Gotham';
    font-weight: 500;
    src: url(${GothamMedium}) format('woff2');
    font-display: swap;
  }
`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(dark);

  useEffect(() => {
    if (!prerender) console.info(consoleMessage);
    window.history.scrollRestoration = 'manual';
  }, []);

  const setTheme = useCallback(overrides => {
    const defaultTheme = currentTheme.id === 'dark' ? dark : light;
    setCurrentTheme({ ...defaultTheme, ...overrides });
  }, [currentTheme.id]);

  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme.id === 'dark' ? light : dark;
    setCurrentTheme(newTheme);
  }, [currentTheme.id]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
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
              <Header toggleMenu={toggleMenu} menuOpen={menuOpen} toggleTheme={toggleTheme} currentTheme={currentTheme} />
              <NavToggle onClick={toggleMenu} menuOpen={menuOpen} />
              <TransitionGroup component={React.Fragment}>
                <Transition key={location.pathname} timeout={300}>
                  {status => (
                    <AppContext.Provider value={{ status, setTheme, toggleTheme, currentTheme }}>
                      <MainContent status={status} id="MainContent" role="main">
                        <Helmet>
                          <link rel="canonical" href={`https://hamishw.com${location.pathname}`} />
                        </Helmet>
                        <Suspense fallback={React.Fragment}>
                          <Switch location={location}>
                            <Route exact path="/" component={Home} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/projects/smart-sparrow" component={ProjectSPR} />
                            <Route path="/projects/slice" component={ProjectSlice} />
                            <Route path="/projects/volkihar-knight" component={ProjectVolkihar} />
                            <Route component={NotFound} />
                          </Switch>
                        </Suspense>
                      </MainContent>
                    </AppContext.Provider>
                  )}
                </Transition>
              </TransitionGroup>
            </React.Fragment>
          )} />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

const GlobalStyles = createGlobalStyle`
  html,
  body {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
    font-family: ${props => props.theme.fontStack};
    background: ${props => props.theme.colorBackground()};
    color: ${props => props.theme.colorText()};
    border: 0;
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
    font-weight: ${props => props.theme.id === 'light' ? 500 : 300};
    transition: background 0.4s ease;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  ::selection {
    background: ${dark.colorPrimary()};
  }
`;

const MainContent = styled.main`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  transition: opacity 0.3s ease;
  opacity: 0;

  ${props => props.status === 'exiting' && css`
      position: absolute;
    opacity: 0;
  `}

  ${props => props.status === 'entering' && css`
    position: absolute;
    opacity: 0;
  `}

  ${props => props.status === 'entered' && css`
    transition-duration: 0.5s;
    opacity: 1;
  `}
`;

const SkipToMain = styled.a`
  position: fixed;
  clip: rect(1px, 1px, 1px, 1px);
  top: 16px;
  left: 50%;
  width: 1px;
  height: 1px;
  overflow: hidden;
  color: ${props => props.theme.colorBackground()};
  z-index: 99;
  transform: translate3d(-50%, -40px, 0);
  transition: transform 0.4s ${props => props.theme.curveFastoutSlowin};
  background: ${props => props.theme.colorPrimary()};
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
