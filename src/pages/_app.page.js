import 'layouts/App/reset.css';
import 'layouts/App/global.css';

import { Navbar } from 'components/Navbar';
import { ThemeProvider } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { useLocalStorage } from 'hooks';
import useFoucFix from 'hooks/useFoucFix';
import styles from 'layouts/App/App.module.css';
import { initialState, reducer } from 'layouts/App/reducer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, createContext, useEffect, useReducer } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { msToNum } from 'utils/style';
import { reflow } from 'utils/transition';
import { ScrollRestore } from '../layouts/App/ScrollRestore';

export const AppContext = createContext({});
export const TransitionContext = createContext({});

const repoPrompt = `
__  __  __
\u005C \u005C \u005C \u005C \u005C\u2215\n \u005C \u005C\u2215\u005C \u005C\n  \u005C\u2215  \u005C\u2215
\n\nTaking a peek huh? Check out the source code: https://github.com/HamishMW/portfolio
`;

export const ROUTE_TRANSITION_DURATION = msToNum(tokens.base.durationS);

const App = ({ Component, pageProps }) => {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { route } = useRouter();
  useFoucFix();

  useEffect(() => {
    console.info(`${repoPrompt}\n\n`);
  }, []);

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme || 'dark' });
  }, [storedTheme]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider themeId={state.theme}>
        <Fragment>
          <Head>
            <link rel="canonical" href={`https://hamishw.com${route}`} />
          </Head>
          <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#MainContent">
            Skip to main content
          </VisuallyHidden>
          <Navbar />
          <TransitionGroup
            component="main"
            className={styles.app}
            tabIndex={-1}
            id="MainContent"
          >
            <Transition key={route} timeout={ROUTE_TRANSITION_DURATION} onEnter={reflow}>
              {status => (
                <TransitionContext.Provider value={{ status }}>
                  <ScrollRestore />
                  <div className={styles.page} data-status={status}>
                    <Component {...pageProps} />
                  </div>
                </TransitionContext.Provider>
              )}
            </Transition>
          </TransitionGroup>
        </Fragment>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
