const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/* TODO: Remove this when new version of eslint-loader is released.
 * See https://github.com/webpack-contrib/eslint-loader/issues/271 for more information */
const esLintFormatter = require('eslint/lib/cli-engine/formatters/stylish');

module.exports = {
  entry: './src-examples/js/examples',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'examples'),
    publicPath: '',
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
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './src-examples/index.html',
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: ['./examples', './dist', './'],
  },
  mode: 'production',
};
