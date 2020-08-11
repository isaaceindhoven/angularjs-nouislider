const { merge } = require('webpack-merge');
const develop = require('./webpack.develop');

module.exports = merge(develop, {
  output: {
    filename: `${ develop.output.library }.min.js`,
  },
  mode: 'production',
});
