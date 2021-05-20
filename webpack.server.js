const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  target: "node",
  entry: ["./server/index.js"],
  externals: [webpackNodeExternals()],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
}

module.exports = (env, options) => {
  return merge(common, config)
};