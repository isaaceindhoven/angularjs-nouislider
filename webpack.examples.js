const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src-examples/js/examples',
  output: {
    filename: 'examples.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
          ],
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['docs']),
    new ExtractTextPlugin('examples.css'),
    new HtmlWebpackPlugin({
      template: './src-examples/index.html',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      parallel: true,
      cache: true,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: ['./docs', './dist', './'],
  },
  externals: {
    angular: 'angular',
  },
};
