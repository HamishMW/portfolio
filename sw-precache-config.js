module.exports = {
  staticFileGlobs: [
    './build/**/!(404).html',
    './build/images/**.*',
    './build/static/**',
    './build/app/**',
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: './build/service-worker.js',
  navigateFallback: './200.html',
  navigateFallbackWhitelist: [/^(?!\/__).*/],
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  stripPrefix: './build'
}
