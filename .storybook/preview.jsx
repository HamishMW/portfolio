import { useEffect } from 'react';
import { ThemeProvider, themeStyles } from '../app/components/theme-provider';
import '../app/reset.module.css';
import '../app/global.module.css';
import './preview.css';

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme;

    useEffect(() => {
      document.body.dataset.theme = theme;
    }, [theme]);

    return (
      <ThemeProvider theme={theme}>
        <style>{themeStyles}</style>
        <div id="story-root" className="storyRoot">
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
      icon: 'paintbrush',
      items: ['light', 'dark'],
    },
  },
};

export const parameters = {
  layout: 'fullscreen',
  controls: { hideNoControlsWarning: true },
};
