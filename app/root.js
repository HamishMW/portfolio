import { cssBundleHref } from '@remix-run/css-bundle';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useMatches,
  useRouteError,
} from '@remix-run/react';
import { ThemeProvider, fontStyles, tokenStyles } from '~/components/ThemeProvider';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { Fragment, createContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { useLocalStorage } from './hooks';
import { Error } from '~/components/Error';
import { Sprites } from '~/components/Icon';
import './reset.css';
import './global.css';
import './root.module.css';

export const links = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = async ({ request }) => {
  return json({ canonicalUrl: request.url });
};

const dynamicLinks = ({ data }) => {
  return [
    {
      rel: 'canonical',
      href: data.canonicalUrl,
    },
  ];
};

export const handle = {
  dynamicLinks,
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
        <DynamicLinks />
      </head>
      <body data-theme="dark" tabIndex={-1}>
        <AppProvider>
          <Outlet />
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <div id="portal-root" />
      </body>
    </html>
  );
}

function AppProvider({ children }) {
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
      <ThemeProvider themeId="dark">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const initialTheme = JSON.parse(localStorage.getItem('theme'));
              document.body.dataset.theme = initialTheme || 'dark';
            `,
          }}
        />
        <Sprites />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

function AppHead() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/icon-256.png" />
      <link type="text/plain" rel="author" href="/humans.txt" />
      <link rel="preload" href={GothamMedium} as="font" crossOrigin="true" />
      <link rel="preload" href={GothamBook} as="font" crossOrigin="true" />
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <style dangerouslySetInnerHTML={{ __html: tokenStyles }} />
    </>
  );
}

function DynamicLinks() {
  let links = useMatches().flatMap(match => {
    let fn = match.handle?.dynamicLinks;
    if (typeof fn !== 'function') return [];
    return fn({ data: match.data });
  });

  return (
    <Fragment>
      {links.map(link => (
        <link {...link} key={link.integrity || JSON.stringify(link)} />
      ))}
    </Fragment>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.error(error);
  return (
    <html>
      <head>
        <AppHead />
        <Meta />
        <Links />
      </head>
      <body data-theme="dark" tabIndex={-1}>
        <AppProvider>
          <Error error={error} />
        </AppProvider>
        <Scripts />
      </body>
    </html>
  );
}
