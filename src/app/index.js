import React, { lazy, Suspense, useEffect, createContext, useReducer } from 'react';
import styled, { createGlobalStyle, ThemeProvider, css } from 'styled-components/macro';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Transition, TransitionGroup, config as transitionConfig } from 'react-transition-group';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from 'components/Header';
import { theme } from 'utils/theme';
import { useLocalStorage, usePrefersReducedMotion } from 'hooks';
import GothamBook from 'assets/fonts/gotham-book.woff2';
import GothamMedium from 'assets/fonts/gotham-medium.woff2';
import { initialState, reducer } from 'app/reducer';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';

const Home = lazy(() => import('screens/Home'));
const Contact = lazy(() => import('screens/Contact'));
const ProjectSPR = lazy(() => import('screens/ProjectSPR'));
const ProjectSlice = lazy(() => import('screens/ProjectSlice'));
const ProjectVolkihar = lazy(() => import('screens/ProjectVolkihar'));
// const Articles = lazy(() => import('screens/Articles'));
const NotFound = lazy(() => import('screens/404'));

export const AppContext = createContext();
export const TransitionContext = createContext();

const consoleMessage = `
__  __  __
\u005C \u005C \u005C \u005C \u005C\u2215\n \u005C \u005C\u2215\u005C \u005C\n  \u005C\u2215  \u005C\u2215
\n\nTaking a peek huh? Check out the source code: https://github.com/HamishMW/portfolio-2018\n\n
`;

export const fontStyles = `
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
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { currentTheme } = state;

  useEffect(() => {
    if (prefersReducedMotion) {
      transitionConfig.disabled = true;
    } else {
      transitionConfig.disabled = false;
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!prerender) console.info(consoleMessage);
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    dispatch({ type: 'setTheme', value: theme[storedTheme] });
  }, [storedTheme]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <AppContext.Provider value={{ ...state, dispatch }}>
          <BrowserRouter>
            <Route render={({ location }) => (
              <React.Fragment>
                <Helmet>
                  <link rel="canonical" href={`https://hamishw.com${location.pathname}`} />
                  <link rel="preload" href={GothamBook} as="font" crossorigin="" />
                  <link rel="preload" href={GothamMedium} as="font" crossorigin="" />
                  <style>{fontStyles}</style>
                </Helmet>
                <GlobalStyles />
                <SkipToMain href="#MainContent">Skip to main content</SkipToMain>
                <Header location={location} />
                <TransitionGroup
                  component={AppMainContent}
                  tabIndex={-1}
                  id="MainContent"
                  role="main"
                >
                  <Transition
                    key={location.pathname}
                    timeout={300}
                    onEnter={reflow}
                  >
                    {status => (
                      <TransitionContext.Provider value={{ ...state, dispatch, status }}>
                        <AppPage status={status} >
                          <Suspense fallback={<React.Fragment />}>
                            <Switch location={location}>
                              <Route exact path="/" component={Home} />
                              <Route path="/contact" component={Contact} />
                              <Route path="/projects/smart-sparrow" component={ProjectSPR} />
                              <Route path="/projects/slice" component={ProjectSlice} />
                              <Route path="/projects/volkihar-knight" component={ProjectVolkihar} />
                              {/* <Route path="/articles" component={Articles} /> */}
                              <Route component={NotFound} />
                            </Switch>
                          </Suspense>
                        </AppPage>
                      </TransitionContext.Provider>
                    )}
                  </Transition>
                </TransitionGroup>
              </React.Fragment>
            )} />
          </BrowserRouter>
        </AppContext.Provider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
    font-family: ${props => props.theme.fontStack};
    background: ${props => props.theme.colorBackground};
    color: ${props => props.theme.colorText};
    border: 0;
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
    font-weight: 400;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  ::selection {
    background: ${props => props.theme.colorAccent};
    color: rgb(0, 0, 0, 0.9);
  }

  #root *,
  #root *::before,
  #root *::after {
    @media (prefers-reduced-motion: reduce) {
      animation-duration: 0s;
      animation-delay: 0s;
      transition-duration: 0s;
      transition-delay: 0s;
    }
  }
`;

const AppMainContent = styled.main`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background: ${props => props.theme.colorBackground};
  transition: background 0.4s ease;
  outline: none;
  display: grid;
  grid-template-columns: 100%;
`;

const AppPage = styled.div`
  overflow-x: hidden;
  opacity: 0;
  grid-column: 1;
  grid-row: 1;
  transition: opacity 0.3s ease;

  ${props => (props.status === 'exiting' || props.status === 'entering') && css`
    opacity: 0;
  `}

  ${props => props.status === 'entered' && css`
    transition-duration: 0.5s;
    transition-delay: 0.2s;
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
  color: ${props => props.theme.colorBackground};
  z-index: 99;

  &:focus {
    background: ${props => props.theme.colorPrimary};
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
