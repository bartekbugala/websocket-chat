const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'client/index.html',
    filename: 'index.html',
    inject: 'body'
  })
];

module.exports = env => {
  const environment = env || 'production';
  if (env === 'production') {
    plugins.push(
      new OptimizeJsPlugin({
        sourceMap: false
      })
    );
  }

  return {
    mode: environment,
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'app.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            plugins: env !== 'production' ? ['react-hot-loader/babel'] : []
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader',
            }
          ]
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8080,
      proxy: {
        '/socket.io': {
          target: 'http://localhost:3000',
          ws: true
        }
      }
    },
    plugins: plugins
  };
};
