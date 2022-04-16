import 'layouts/App/reset.css';
import 'layouts/App/global.css';

import { Navbar } from 'components/Navbar';
import { ThemeProvider } from 'components/ThemeProvider';
import { tokens } from 'components/ThemeProvider/theme';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocalStorage } from 'hooks';
import useFoucFix from 'hooks/useFoucFix';
import styles from 'layouts/App/App.module.css';
import { initialState, reducer } from 'layouts/App/reducer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, createContext, useEffect, useReducer, useState } from 'react';
import { msToNum } from 'utils/style';
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
          <main className={styles.app} tabIndex={-1} id="MainContent">
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={route}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: 'tween',
                  ease: 'linear',
                  duration: ROUTE_TRANSITION_DURATION / 1000,
                  delay: 0.1,
                }}
              >
                <div className={styles.page}>
                  <ScrollRestore />
                  <Component {...pageProps} />
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </Fragment>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
