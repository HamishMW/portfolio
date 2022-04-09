import './reset.css';
import './global.css';
import './App.css';

import { initialState, reducer } from 'app/reducer';
import classNames from 'classnames';
import { Navbar } from 'components/Navbar';
import { ThemeProvider } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { useLocalStorage } from 'hooks';
import { Fragment, Suspense, createContext, lazy, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import { prerender } from 'utils/prerender';
import { msToNum } from 'utils/style';
import { reflow } from 'utils/transition';

const Home = lazy(() => import('pages/Home'));
const Contact = lazy(() => import('pages/Contact'));
const ProjectSPR = lazy(() => import('pages/SmartSparrow'));
const ProjectSlice = lazy(() => import('pages/Slice'));
const ProjectVolkihar = lazy(() => import('pages/VolkiharKnight'));
// const Articles = lazy(() => import('pages/Articles'));
const Page404 = lazy(() => import('pages/404'));
const Uses = lazy(() => import('pages/Uses'));

export const AppContext = createContext();
export const TransitionContext = createContext();

const repoPrompt = `
__  __  __
\u005C \u005C \u005C \u005C \u005C\u2215\n \u005C \u005C\u2215\u005C \u005C\n  \u005C\u2215  \u005C\u2215
\n\nTaking a peek huh? Check out the source code: https://github.com/HamishMW/portfolio
`;

export const App = () => {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!prerender) {
      console.info(`${repoPrompt}\n\n`);
    }
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme });
  }, [storedTheme]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider themeId={state.theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Fragment>
      <Helmet>
        <link rel="canonical" href={`https://hamishw.com${pathname}`} />
      </Helmet>
      <VisuallyHidden showOnFocus as="a" className="skip-to-main" href="#MainContent">
        Skip to main content
      </VisuallyHidden>
      <Navbar location={location} />
      <TransitionGroup component="main" className="app" tabIndex={-1} id="MainContent">
        <Transition
          key={pathname}
          timeout={msToNum(tokens.base.durationS)}
          onEnter={reflow}
        >
          {status => (
            <TransitionContext.Provider value={{ status }}>
              <div className={classNames('app__page', `app__page--${status}`)}>
                <Suspense fallback={<Fragment />}>
                  <Routes location={location} key={pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/projects/smart-sparrow" element={<ProjectSPR />} />
                    <Route path="/projects/slice" element={<ProjectSlice />} />
                    <Route
                      path="/projects/volkihar-knight"
                      element={<ProjectVolkihar />}
                    />
                    {/* <Route path="/articles" element={<Articles} /> /> */}
                    <Route path="/uses" element={<Uses />} />
                    <Route path="*" element={<Page404 />} />
                  </Routes>
                </Suspense>
              </div>
            </TransitionContext.Provider>
          )}
        </Transition>
      </TransitionGroup>
    </Fragment>
  );
};
