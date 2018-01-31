const merge = require('webpack-merge');
const externals = require('webpack-node-externals');
const common = require('./webpack.common.js');
const libraryName = 'angularjs-nouislider';

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: libraryName + '.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [externals()]
});
