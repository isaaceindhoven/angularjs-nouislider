const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const libraryName = 'angularjs-nouislider';

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
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new ESLintPlugin()],
  devtool: 'source-map',
  mode: 'development',
};
