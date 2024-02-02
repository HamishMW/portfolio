import { cssBundleHref } from '@remix-run/css-bundle';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { createCookieSessionStorage, json } from '@remix-run/cloudflare';
import { ThemeProvider, themeStyles, themes } from '~/components/ThemeProvider';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { createContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { Error } from '~/layouts/error';
import { Sprites } from '~/components/Icon';
import { VisuallyHidden } from '~/components/VisuallyHidden';
import { Navbar } from './components/Navbar';
import styles from './root.module.css';
import './reset.module.css';
import './global.module.css';

export const links = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  {
    rel: 'preload',
    href: GothamMedium,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'true',
  },
  {
    rel: 'preload',
    href: GothamBook,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'true',
  },
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'shortcut_icon', href: '/shortcut.png', type: 'image/png', sizes: '64x64' },
  { rel: 'apple-touch-icon', href: '/icon-256.png', sizes: '256x256' },
  { rel: 'author', href: '/humans.txt', type: 'text/plain' },
];

export const loader = async ({ request, context }) => {
  const { url } = request;
  const canonicalUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      secrets: [context.env.SESSION_SECRET],
      secure: true,
    },
  });

  const session = await getSession(request.headers.get('Cookie'));

  const theme = session.get('theme') || 'dark';

  return json(
    { canonicalUrl, theme },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
};

export const AppContext = createContext({});

const repoPrompt = `
__  __  __
\u005C \u005C \u005C \u005C \u005C\u2215\n \u005C \u005C\u2215\u005C \u005C\n  \u005C\u2215  \u005C\u2215
\n\nTaking a peek huh? Check out the source code: https://github.com/HamishMW/portfolio
`;

export default function App() {
  const { canonicalUrl, theme } = useLoaderData();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.info(`${repoPrompt}\n\n`);
  }, []);

  return (
    <html lang="en">
      <head>
        <AppHead theme={theme} />
        <Meta />
        <Links />
        <link rel="canonical" href={canonicalUrl} />
      </head>
      <body data-theme={theme}>
        <AppContext.Provider value={{ ...state, dispatch }}>
          <ThemeProvider themeId={theme}>
            <VisuallyHidden
              showOnFocus
              as="a"
              className={styles.skip}
              href="#main-content"
            >
              Skip to main content
            </VisuallyHidden>
            <Sprites />
            <Navbar />
            <main id="main-content" className={styles.container} tabIndex={-1}>
              <Outlet />
            </main>
          </ThemeProvider>
        </AppContext.Provider>
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

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <AppHead theme="dark" />
        <Meta />
        <Links />
      </head>
      <body data-theme="dark">
        <Sprites />
        <Error error={error} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
