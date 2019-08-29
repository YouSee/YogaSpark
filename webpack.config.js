const WebpackPluginSpark = require('webpack-plugin-spark')
const path = require('path')

module.exports = {
  entry: ['babel-polyfill', './src/index.ts'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new WebpackPluginSpark({
      progress: true,
      liveReload: true,
      static: path.join(__dirname, './dist'),
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
}
