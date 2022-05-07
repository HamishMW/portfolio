import GothamBook from 'assets/fonts/gotham-book.woff2';
import GothamMedium from 'assets/fonts/gotham-medium.woff2';
import { fontStyles, tokenStyles } from 'components/ThemeProvider';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-256.png" />
        <link type="text/plain" rel="author" href="/humans.txt" />

        <link rel="preload" href={GothamMedium} as="font" crossOrigin="true" />
        <link rel="preload" href={GothamBook} as="font" crossOrigin="true" />
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
        <style dangerouslySetInnerHTML={{ __html: tokenStyles }} />
      </Head>
      <body data-theme="dark" tabIndex={-1}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const initialTheme = JSON.parse(localStorage.getItem('theme'));
              document.body.dataset.theme = initialTheme || 'dark';
            `,
          }}
        />
        <Main />
        <NextScript />
        <div id="portal-root" />
      </body>
    </Html>
  );
}
