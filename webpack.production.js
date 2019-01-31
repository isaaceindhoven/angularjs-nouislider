const merge = require('webpack-merge');
const build = require('./webpack.build');

module.exports = merge(build, {
  output: {
    filename: build.output.library + '.min.js',
  },
  mode: 'production',
});
