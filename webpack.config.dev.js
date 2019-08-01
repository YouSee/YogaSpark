const WebpackPluginSpark = require('webpack-plugin-spark')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpackConfig = require('./webpack.config')

module.exports = () =>
  Object.assign({}, webpackConfig, {
    entry: ['babel-polyfill', './examples/asset-grid/index.ts'],
    plugins: [
      new WebpackPluginSpark({
        progress: true,
        liveReload: true,
        static: path.join(__dirname, './dist'),
      }),
      new CopyPlugin([
        {
          from: path.join(__dirname, './public'),
          to: path.join(__dirname, './dist'),
        },
      ]),
    ],
  })
