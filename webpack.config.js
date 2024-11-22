const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

process.env.NODE_ENV = 'development';
module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      clean: true,
    },
    mode: argv.mode || 'development',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(css)$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    devServer: {
      static: path.resolve(__dirname, './dist'),
      hot: true,
      historyApiFallback: true,
    },
  };
};
