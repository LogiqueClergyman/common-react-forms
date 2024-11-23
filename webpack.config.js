const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const isProd = argv.mode === 'production';
  return {
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: isProd ? 'index.js' : 'bundle.js',
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
              // options: {
                // transpileOnly: true,
                // compilerOptions: {
                //   declaration: true,
                //   declarationDir: path.resolve(__dirname, 'dist'),
                // },
              // },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'autoprefixer',
                      {
                        grid: true,
                      },
                    ],
                  ],
                },
              },
            },
          ],
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
      isDev &&
        new HtmlWebpackPlugin({
          template: './index.html',
        }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
      }),
      isDev && new ReactRefreshWebpackPlugin(),
      isProd && new MiniCssExtractPlugin({ filename: '[name].css' }),
    ].filter(Boolean),
  };
};
