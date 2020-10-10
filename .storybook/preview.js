import React, { useEffect } from 'react';
import ThemeProvider from '../src/components/ThemeProvider';
import '../src/app/index.css';
import './preview.css';

export const decorators = [
  (Story, { args }) => {
    const { theme } = args;

    useEffect(() => {
      document.body.setAttribute('class', theme);
    }, [theme]);

    return (
      <ThemeProvider themeId={theme}>
        <div id="story-root" className="story-root" key={theme}>
          <Story />
        </div>
      </ThemeProvider>
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
