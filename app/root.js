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
import {
  ThemeProvider,
  fontStyles,
  theme,
  tokenStyles,
} from '~/components/ThemeProvider';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { createContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { useLocalStorage } from './hooks';
import { Error } from '~/layouts/Error';
import { Sprites } from '~/components/Icon';
import { VisuallyHidden } from '~/components/VisuallyHidden';
import styles from './root.module.css';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Navbar } from './components/Navbar';
import global from './global.css';
import reset from './reset.css';

export const links = () => [
  { rel: 'stylesheet', href: reset },
  { rel: 'stylesheet', href: global },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
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
  return (
    <html lang="en">
      <head>
        <AppHead />
        <Meta />
        <Links />
      </head>
      <body data-theme="dark" tabIndex={-1}>
        <AppMain>
          <Outlet />
        </AppMain>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function AppHead() {
  const { canonicalUrl } = useLoaderData();

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content={`rgb(${theme.dark.rgbBackground})`} />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/icon-256.png" />
      <link type="text/plain" rel="author" href="/humans.txt" />
      <link rel="preload" href={GothamMedium} as="font" crossOrigin="true" />
      <link rel="preload" href={GothamBook} as="font" crossOrigin="true" />
      <link rel="canonical" href={canonicalUrl} />
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <style dangerouslySetInnerHTML={{ __html: tokenStyles }} />
    </>
  );
}

function AppMain({ children }) {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.info(`${repoPrompt}\n\n`);
  }, []);

  useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme || 'dark' });
  }, [storedTheme]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <LazyMotion features={domAnimation}>
        <ThemeProvider themeId={state.theme}>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              const initialTheme = JSON.parse(localStorage.getItem('theme'));
              document.body.dataset.theme = initialTheme || 'dark';
            `,
            }}
          />
          <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
            Skip to main content
          </VisuallyHidden>
          <Sprites />
          <Navbar />
          <main id="main-content" className={styles.container} tabIndex={-1}>
            {children}
          </main>
          <div id="portal-root" />
        </ThemeProvider>
      </LazyMotion>
    </AppContext.Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <AppHead />
        <Meta />
        <Links />
      </head>
      <body data-theme="dark" tabIndex={-1}>
        <AppMain>
          <Error error={error} />
        </AppMain>
        <Scripts />
      </body>
    </html>
  );
}
