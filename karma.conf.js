module.exports = function (config) {
  config.set({
    urlRoot: '/cookie/man',
    frameworks: ['mocha', 'expect', 'sinon'],
    files: ['test/**/test-*.js'],
    preprocessors: { 'test/**/test-*.js': ['webpack', 'sourcemap'] },
    webpack: {
      watch: true,
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      stats: 'errors-only',
      logLevel: 'error'
    },
    reporters: ['spec'],
    browsers: ['Chrome']
  })
}
