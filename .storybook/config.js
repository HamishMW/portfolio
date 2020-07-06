import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import React, { Fragment, useEffect } from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/app/theme';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import GothamBook from '../src/assets/fonts/gotham-book.woff2';
import GothamMedium from '../src/assets/fonts/gotham-medium.woff2';
import { fontStyles, globalStyles } from '../src/app';
import '../src/app/index.css';

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
  Dark: 'dark',
  Light: 'light',
};

addDecorator(story => {
  const content = story();
  const themeKey = select('Theme', themeKeys, 'dark');
  const currentTheme = theme[themeKey];

  document.body.setAttribute('class', themeKey);

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <Fragment>
          <Helmet>
            <link rel="preload" href={GothamBook} as="font" crossorigin="crossorigin" />
            <link rel="preload" href={GothamMedium} as="font" crossorigin="crossorigin" />
            <style>{fontStyles}</style>
            <style>{globalStyles}</style>
          </Helmet>
          <div id="storyRoot" key={themeKey}>
            {content}
          </div>
        </Fragment>
      </ThemeProvider>
    </HelmetProvider>
  );
});

addDecorator(withKnobs);
addDecorator(withA11y);
configure(require.context('../src', true, /\.stories\.js$/), module);
