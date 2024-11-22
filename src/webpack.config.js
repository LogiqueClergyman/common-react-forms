const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const isProd = argv.mode === 'production';

  return {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: isProd ? 'bundle.[contenthash].js' : 'bundle.js',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts|jsx|js)?$/,
          use: [
            {
              loader: 'ts-loader',
              transpileOnly: false,
              options: {
                compilerOptions: {
                  declaration: true,
                  declarationDir: path.resolve(__dirname, 'dist'),
                },
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(s[ac]ss|css)$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    devtool: isDev ? 'cheap-module-source-map' : false,
    devServer: {
      hot: true,
      open: false,
      static: {
        directory: path.resolve(__dirname, './dist'),
      },
      client: {
        overlay: true,
      },
    },
    optimization: isProd
      ? {
          minimize: true,
          splitChunks: {
            chunks: 'all',
          },
        }
      : {},
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
      }),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  };
};
