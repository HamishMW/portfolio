import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import GothamBook from '../src/assets/fonts/gotham-book.woff2';
import GothamMedium from '../src/assets/fonts/gotham-medium.woff2';
import { fontStyles, AppContext } from '../src/app';
import ThemeProvider from '../src/components/ThemeProvider';
import GothamBold from '../src/assets/fonts/gotham-bold.woff2';
import '../src/app/index.css';
import './preview.css';

export const decorators = [
  (Story, { args }) => {
    const { theme } = args;

    useEffect(() => {
      document.body.setAttribute('class', theme);
    }, [theme]);

    return (
      <HelmetProvider>
        <ThemeProvider themeId={theme}>
          <Helmet>
            <link rel="preload" href={GothamBook} as="font" crossorigin="crossorigin" />
            <link rel="preload" href={GothamMedium} as="font" crossorigin="crossorigin" />
            <style>{fontStyles}</style>
            <style>
              {`
                @font-face {
                  font-family: 'Gotham';
                  font-weight: 700;
                  src: url(${GothamBold}) format('woff2');
                  font-display: swap;
                }
              `}
            </style>
          </Helmet>
          <AppContext.Provider state={{ theme: currentTheme }}>
            <div id="story-root" className="story-root" key={theme}>
              <Story />
            </div>
          </AppContext.Provider>
        </ThemeProvider>
      </HelmetProvider>
    );
  },
];

export const parameters = {
  layout: 'fullscreen',
  controls: { hideNoControlsWarning: true },
  args: {
    theme: 'dark',
  },
  argTypes: {
    theme: {
      control: {
        defaultValue: 'dark',
        type: 'inline-radio',
        options: ['dark', 'light'],
      },
    },
  },
};
