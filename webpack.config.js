const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const server = {
  entry: path.join(__dirname, 'server/index.js'),
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  externals: [
    nodeExternals()
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
  },
}

const client = {
  entry: path.join(__dirname, 'client/index.js'),
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor.js',
      chunks: 'all'
    },
  },
}

module.exports = [client, server]