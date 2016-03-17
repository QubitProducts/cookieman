module.exports = function (config) {
  config.set({
    urlRoot: '/cookie/man',
    frameworks: ['mocha', 'expect', 'sinon'],
    files: [ 'test/**/test-*.js' ],
    preprocessors: { 'test/**/test-*.js': ['webpack', 'sourcemap'] },
    webpack: {
      watch: true,
      devtool: 'inline-source-map'
    },
    webpackServer: {
      quiet: true,
      noInfo: true
    },
    reporters: ['spec'],
    browsers: ['Chrome']
  })
}
