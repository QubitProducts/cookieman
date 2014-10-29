module.exports = function(config) {
  config.set({

    urlRoot: "/cookie/man",

    frameworks: ['mocha', 'expect', 'sinon'],

    files: [
      // only specify one entry point
      // and require all tests in there
      'test/**/*_test.js'
    ],

    // add webpack as preprocessor
    preprocessors: {
      'test/**/*_test.js': ['webpack', 'sourcemap']
    },

    webpack: {
      // karma watches test/test_index.js
      // webpack watches dependencies of test/test_index.js
      watch: true,
      devtool: 'inline-source-map'
    },

    webpackServer: {
      quiet: true,
      noInfo: true
    },

    browsers: ['Chrome']

  });
};