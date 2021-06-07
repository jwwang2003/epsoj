const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = (env, argv) => {
  const prod = argv.mode === "production";
  
  return {
    
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader'
          }],
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader", 
            "css-loader"
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      fallback: { "stream": require.resolve("stream-browserify") },
      extensions: ['*', '.js', '.jsx'],
      alias: { 
        "react": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat"
      },
    },
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
      filename: '[name].js',
      clean: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html")
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false
      }),
      new webpack.HotModuleReplacementPlugin({
        // Options...
      }),
      prod && new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ].filter(Boolean),
    devServer: {
      hot: true,
      historyApiFallback: true
    },
    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: 'all',
      },
    }
  }
}