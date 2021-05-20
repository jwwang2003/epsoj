const path = require('path');
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin")

const config = {
  entry: ['./client/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean)
};

module.exports = (env, options) => {
  return merge(common, config)
};