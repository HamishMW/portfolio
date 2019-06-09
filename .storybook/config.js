import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/utils/theme';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import GothamBook from '../src/fonts/gotham-book.woff2';
import GothamMedium from '../src/fonts/gotham-medium.woff2';
import { fontStyles, GlobalStyles, AppContext } from '../src/app/App';

addParameters({
  options: {
    theme: {
      ...themes.dark,
      brandImage: 'https://hamishw.com/favicon.png',
      brandTitle: 'Hamish Williams Components',
      brandUrl: 'https://hamishw.com',
    },
  },
});

const themeKeys = {
  'Dark': 'dark',
  'Light': 'light',
};

addDecorator((story) => {
  const content = story();
  const themeKey = select('Theme', themeKeys, 'dark');
  const currentTheme = theme[themeKey];

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <AppContext.Provider value={{ currentTheme }}>
          <Helmet>
            <link rel="preload" href={GothamBook} as="font" crossorigin="crossorigin" />
            <link rel="preload" href={GothamMedium} as="font" crossorigin="crossorigin" />
            <style>{fontStyles}</style>
          </Helmet>
          <GlobalStyles />
          <div id="storyRoot" key={themeKey}>{content}</div>
        </AppContext.Provider>
      </ThemeProvider>
    </HelmetProvider>
  )
});

addDecorator(withKnobs);

function loadStories() {
  require('../src/stories');
};

configure(loadStories, module);
