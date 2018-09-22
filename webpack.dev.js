const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './app',
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: true
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader',

      options: {
        plugins: ['syntax-dynamic-import'],

        presets: [['env', {
          'modules': false
        }]]
      },

      test: /\.js$/
    }]
  },

  mode: 'development',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
}