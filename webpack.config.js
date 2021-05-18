const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const BrotliPlugin = require("brotli-webpack-plugin");

const clientConfig = ([mode, isDev]) => {

  return {
    mode: mode,
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "true",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      !isDev && new BundleAnalyzerPlugin({ analyzerMode: "static" }),
      !isDev &&
        new BrotliPlugin({
          asset: "[path].br[query]",
          test: /\.js$|\.css$|\/html$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
    ].filter(Boolean),
    devServer: {
      hot: true,
      historyApiFallback: true,
    }
  }
};

const serverConfig = ([mode, isDev]) => {

  return {
    mode: mode,
    entry: "./src/server/index.js",
    target: "node",
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "server.js",
    },
    module: {
      rules: [
        { test: /\.(js)$/, use: "babel-loader" },
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        __isBrowser__: "false",
      }),
    ],
  }
};

const isDev = (options) => {
  return [
    options.mode,
    options.mode === "development" ? true : false
  ]
}

module.exports = (env, options) => [
  clientConfig(isDev(options)), 
  serverConfig(isDev(options))
];
