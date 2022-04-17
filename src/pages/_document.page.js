import GothamBook from 'assets/fonts/gotham-book.woff2';
import GothamMedium from 'assets/fonts/gotham-medium.woff2';
import { fontStyles, tokenStyles } from 'components/ThemeProvider';
import { Head, Html, Main, NextScript } from 'next/document';

const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <meta name="theme-color" content="#111111" />
        <meta name="author" content="Hamish Williams" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon-256.png" />
        <link type="text/plain" rel="author" href="/humans.txt" />

        <meta property="og:image" content={`${siteUrl}/social-image.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="549" />

        <meta property="og:title" content="Design portfolio of Hamish Williams" />
        <meta property="og:site_name" content="hamishw.com" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:description" content="Multidisciplinary product designer" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content="Multidisciplinary product designer" />
        <meta name="twitter:title" content="Design portfolio of Hamish Williams" />
        <meta name="twitter:site" content="@hamishMW" />
        <meta name="twitter:image" content={`${siteUrl}/social-image.png`} />

        <link rel="prefetch" href={GothamMedium} as="font" />
        <link rel="prefetch" href={GothamBook} as="font" />
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
        <style dangerouslySetInnerHTML={{ __html: tokenStyles }} />
      </Head>
      <body data-theme="dark">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.body.dataset.theme = JSON.parse(localStorage.getItem('theme')) || 'dark';`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
