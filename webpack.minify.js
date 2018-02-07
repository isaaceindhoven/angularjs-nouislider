const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const build = require('./webpack.build');

module.exports = merge(build, {
  output: {
    filename: build.output.library + '.min.js',
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      parallel: true,
      cache: true,
    }),
  ],
});
