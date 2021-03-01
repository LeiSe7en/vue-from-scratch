const { Module } = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = (env, options) => {
  return {
    mode: env.production ? 'production' : 'development', // "production" | "development" | "none"
    entry: path.join(__dirname, '../index.js'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: env.production ? '[name].[chunkhash].js' : '[name].[hash].js',
      publicPath: '/',
    },
    stats: {
      modules: false, // 不打印模块的详细信息，但是会保留最后的bundle的详细信息
      children: false
    },
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
      contentBase: path.join(__dirname, 'dist')
    },
    target: "web",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, '../src'),
      },
      extensions: ['.js', '.vue', '.json']
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: {
        name: "manifest"
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            'vue-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'vue-style-loader'
            },
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                esModule: false
              }
            }

          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../index.html'),
        filename: 'index.html',
        title: "Nelson Vue SSR from Scratch"
      })
    ]
  }
   
}