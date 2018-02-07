const path = require('path');

const libraryName = 'angularjs-nouislider';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: libraryName + '.js',
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
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
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
};
