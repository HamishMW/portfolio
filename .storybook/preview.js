import '../src/layouts/App/reset.css';
import '../src/layouts/App/global.css';
import './preview.css';

import { useEffect } from 'react';
import { ThemeProvider, fontStyles, tokenStyles } from '../src/components/ThemeProvider';

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme;

    useEffect(() => {
      document.body.dataset.theme = theme;
    }, [theme]);

    return (
      <ThemeProvider themeId={theme}>
        <style>{fontStyles}</style>
        <style>{tokenStyles}</style>
        <div id="story-root" className="storyRoot">
          <Story />
          <div id="portal-root" />
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
      icon: 'paintbrush',
      items: ['light', 'dark'],
    },
  },
};

export const parameters = {
  layout: 'fullscreen',
  controls: { hideNoControlsWarning: true },
};
