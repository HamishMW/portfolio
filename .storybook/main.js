const path = require('path');

module.exports = {
  webpackFinal: async config => {
    config.module.rules[2].test = /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf|glb)(\?.*)?$/;
    return config;
  },
};
