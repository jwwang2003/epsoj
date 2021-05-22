const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

const mode = process.env.NODE_ENV || 'development'
const isDev = mode === 'development' ? true : false

module.exports = {
  entry: path.join(__dirname, 'client/index.js'),
  mode: mode,
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
  plugins: [
    isDev && new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "common", "index.html")
    }),
    !isDev && new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 1024,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),

  ].filter(Boolean),
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all'
    },
  },
  devServer: {
    hot: true,
    historyApiFallback: true
  }
}