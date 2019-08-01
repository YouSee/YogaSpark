const webpackConfig = require('./webpack.config')

module.exports = () =>
  Object.assign({}, webpackConfig, {
    entry: ['babel-polyfill', './examples/asset-grid/index.ts'],
  })
