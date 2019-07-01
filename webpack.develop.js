const path = require('path');

const libraryName = 'angularjs-nouislider';

/* TODO: Remove this when new version of eslint-loader is released.
 * See https://github.com/webpack-contrib/eslint-loader/issues/271 for more information */
const esLintFormatter = require('eslint/lib/cli-engine/formatters/stylish');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${ libraryName }.js`,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: esLintFormatter,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
  externals: {
    angular: 'angular',
    nouislider: {
      commonjs: 'nouislider',
      commonjs2: 'nouislider',
      amd: 'nouislider',
      root: 'noUiSlider',
    },
  },
  mode: 'development',
};
