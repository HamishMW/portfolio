import '../src/app/reset.css';
import '../src/app/App.css';
import './preview.css';

import { useEffect } from 'react';
import ThemeProvider from '../src/components/ThemeProvider';

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme;

    useEffect(() => {
      document.body.setAttribute('class', theme);
    }, [theme]);

    return (
      <ThemeProvider themeId={theme}>
        <div id="story-root" className="story-root">
          <Story />
        </div>
      </ThemeProvider>
    );
  },
];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
};

export const parameters = {
  layout: 'fullscreen',
  controls: { hideNoControlsWarning: true },
};
