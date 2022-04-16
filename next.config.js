module.exports = {
  reactStrictMode: false,
  trailingSlash: true,
  pageExtensions: ['page.js', 'api.js'],
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    config.module.rules.push({
      test: /\.(mp4|hdr|glb|woff2)$/i,
      type: 'asset/resource',
    });

    return config;
  },
};
