const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: './examples/js/examples.js',
  output: {
    path: path.resolve(__dirname, 'dist/examples'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist/examples']),
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      minify: {},
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './dist/examples',
  },
});
