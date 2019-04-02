import React, { lazy, Suspense, useState, useEffect, createContext, useCallback } from 'react';
import styled, { createGlobalStyle, ThemeProvider, css } from 'styled-components/macro';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../components/Header';
import NavToggle from '../components/NavToggle';
import { theme } from '../utils/Theme';
import { media } from '../utils/StyleUtils';
import { useLocalStorage, useWindowSize } from '../utils/Hooks';
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
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'dark');
  const [currentTheme, setCurrentTheme] = useState(theme.dark);
  const windowSize = useWindowSize();
  const showMenuButton = windowSize.width <= media.numMobile || windowSize.height <= 696;

  useEffect(() => {
    if (!prerender) console.info(consoleMessage);
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    setCurrentTheme(theme[storedTheme]);
  }, [storedTheme]);

  const updateTheme = useCallback(overrides => {
    setCurrentTheme({ ...theme[currentTheme.id], ...overrides });
  }, [currentTheme.id]);

  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme.id === 'dark' ? 'light' : 'dark';
    setStoredTheme(newTheme);
  }, [currentTheme.id, setStoredTheme]);

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
              <Header
                toggleMenu={toggleMenu}
                menuOpen={menuOpen}
                toggleTheme={toggleTheme}
                currentTheme={currentTheme}
              />
              {showMenuButton && <NavToggle onClick={toggleMenu} menuOpen={menuOpen} />}
              <TransitionGroup component={React.Fragment}>
                <Transition key={location.pathname} timeout={300}>
                  {status => (
                    <AppContext.Provider value={{ status, updateTheme, toggleTheme, currentTheme }}>
                      <MainContent status={status} id="MainContent" role="main">
                        <Helmet>
                          <link rel="canonical" href={`https://hamishw.com${location.pathname}`} />
                        </Helmet>
                        <Suspense fallback={<React.Fragment />}>
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
    font-weight: 300;
    transition: background 0.4s ease;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  ::selection {
    background: ${props => props.theme.colorAccent()};
  }
`;

// TODO: Add this once concurrent mode drops and maxDuration can be used on <Suspense>
// const AppLoader = styled(Loader)`
//   position: fixed;
//   bottom: ${props => props.theme.spacingOuter.desktop};
//   right: ${props => props.theme.spacingOuter.desktop};
//   z-index: 1024;

//   @media (max-width: ${media.tablet}) {
//     bottom: ${props => props.theme.spacingOuter.tablet};
//     right: ${props => props.theme.spacingOuter.tablet};
//   }

//   @media (max-width: ${media.mobile}) {
//     bottom: ${props => props.theme.spacingOuter.mobile};
//     right: ${props => props.theme.spacingOuter.mobile};
//   }
// `;

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
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  color: ${props => props.theme.colorBackground()};
  z-index: 99;

  &:focus {
    background: ${props => props.theme.colorPrimary()};
    padding: 8px 16px;
    position: fixed;
    top: 16px;
    left: 16px;
    clip: auto;
    width: auto;
    height: auto;
    text-decoration: none;
    font-weight: 500;
    line-height: 1;
    clip-path: ${props => props.theme.clipPath(8)};
  }
`;

export default App;
