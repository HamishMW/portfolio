module.exports = {
  plugins: {
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': {
          importFrom: 'src/layouts/App/global.css',
        },
      },
    },
  },
};
