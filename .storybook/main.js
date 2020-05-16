const path = require('path');

module.exports = {
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.glb$/,
      use: ['url-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};
