import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/utils/theme';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import GothamBook from '../src/fonts/gotham-book.woff2';
import GothamMedium from '../src/fonts/gotham-medium.woff2';
import { fontStyles, GlobalStyles } from '../src/app';

addParameters({
  options: {
    theme: {
      ...themes.dark,
      brandImage: 'https://hamishw.com/icon.svg',
      brandTitle: 'Hamish Williams Components',
      brandUrl: 'https://hamishw.com',
    },
  },
});

const themeKeys = {
  'Dark': 'dark',
  'Light': 'light',
};

addDecorator(story => {
  const content = story();
  const themeKey = select('Theme', themeKeys, 'dark');
  const currentTheme = theme[themeKey];

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <React.Fragment>
          <Helmet>
            <link rel="preload" href={GothamBook} as="font" crossorigin="crossorigin" />
            <link rel="preload" href={GothamMedium} as="font" crossorigin="crossorigin" />
            <style>{fontStyles}</style>
          </Helmet>
          <GlobalStyles />
          <div id="storyRoot" key={themeKey}>{content}</div>
        </React.Fragment>
      </ThemeProvider>
    </HelmetProvider>
  )
});

addDecorator(withKnobs);
addDecorator(withA11y);

function loadStories() {
  require('../src/stories');
};

configure(loadStories, module);
