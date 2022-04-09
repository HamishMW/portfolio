module.exports = {
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    {
      name: '@storybook/preset-create-react-app',
      options: {
        scriptsPackageName: '@hamishmw/react-scripts-postcss',
      },
    },
  ],
  stories: ['../src/**/*.stories.js'],
  core: {
    builder: 'webpack5',
  },
};
