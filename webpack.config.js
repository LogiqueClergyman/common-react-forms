const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const loader = require("sass-loader");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  const isProd = argv.mode === "production";

  return {
    entry: "./src/index.tsx",
    output: {
      filename: isProd ? "bundle.[contenthash].js" : "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    devtool: isDev ? "source-map" : false,
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 3000,
      hot: true,
      open: true,
    },
    optimization: isProd
      ? {
          minimize: true,
          splitChunks: {
            chunks: "all",
          },
        }
      : {},
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-react",
                  "@babel/preset-typescript",
                ],
                plugins: ["@babel/plugin-transform-runtime"],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["sass-loader", "style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        inject: true,
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(argv.mode),
      }),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  };
};
