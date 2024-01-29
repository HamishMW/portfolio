import { cssBundleHref } from '@remix-run/css-bundle';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { ThemeProvider, themeStyles, themes } from '~/components/ThemeProvider';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { createContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { useLocalStorage } from './hooks';
import { Error } from '~/layouts/error';
import { Sprites } from '~/components/Icon';
import { VisuallyHidden } from '~/components/VisuallyHidden';
import { Navbar } from './components/Navbar';
import styles from './root.module.css';
import './global.module.css';
import './reset.module.css';

export const links = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'preload', href: GothamMedium, as: 'font', crossOrigin: 'true' },
  { rel: 'preload', href: GothamBook, as: 'font', crossOrigin: 'true' },
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'shortcut_icon', href: '/favicon.png', type: 'image/png' },
  { rel: 'shortcut_icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: '/icon-256.png' },
  { rel: 'author', href: '/humans.txt', type: 'text/plain' },
];

export const loader = async ({ request }) => {
  const { url } = request;
  const canonicalUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  return json({ canonicalUrl });
};

export const AppContext = createContext({});

const repoPrompt = `
__  __  __
\u005C \u005C \u005C \u005C \u005C\u2215\n \u005C \u005C\u2215\u005C \u005C\n  \u005C\u2215  \u005C\u2215
\n\nTaking a peek huh? Check out the source code: https://github.com/HamishMW/portfolio
`;

export default function App() {
  const { canonicalUrl } = useLoaderData();
  const { state, dispatch } = useAppState();
  const theme = state.theme || 'dark';

  return (
    <html lang="en">
      <head>
        <AppHead theme={theme} />
        <Meta />
        <Links />
        <link rel="canonical" href={canonicalUrl} />
      </head>
      <body data-theme={theme} tabIndex={-1}>
        <AppMain state={state} dispatch={dispatch}>
          <Outlet />
        </AppMain>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function AppHead({ theme }) {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content={`rgb(${themes[theme]?.rgbBackground})`} />
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
    </>
  );
}

function useAppState() {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.info(`${repoPrompt}\n\n`);
  }, []);

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme || 'dark' });
  }, [storedTheme]);

  return { state, dispatch, storedTheme };
}

function AppMain({ children, state, dispatch }) {
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider themeId={state.theme}>
        <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
          Skip to main content
        </VisuallyHidden>
        <Sprites />
        <Navbar />
        <main id="main-content" className={styles.container} tabIndex={-1}>
          {children}
        </main>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const { state, dispatch } = useAppState();
  const theme = state.theme || 'dark';

  return (
    <html lang="en">
      <head>
        <AppHead theme={theme} />
        <Meta />
        <Links />
      </head>
      <body data-theme={theme} tabIndex={-1}>
        <AppMain state={state} dispatch={dispatch}>
          <Error error={error} />
        </AppMain>
        <Scripts />
      </body>
    </html>
  );
}
