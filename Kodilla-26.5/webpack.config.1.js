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
  console.log('Enviroment:' + environment);
  if (environment === 'production') {
    plugins.push(
      new OptimizeJsPlugin({
        sourceMap: false
      })
    );
    stylesLoaderModules = true;
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
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins:
                environment !== 'production' ? ['react-hot-loader/babel'] : []
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1
              }
            }
          ]
        }
      ]
    },
    plugins,
    devServer: {
      /* contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000, */
      proxy: {
        '/socket.io': {
          target: 'http://localhost:3000',
          ws: true
        }
      }
    }
  };
};
