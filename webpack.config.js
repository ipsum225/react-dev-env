const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'template', 'index.html'),
      hash: true
    })
  ],
  mode: 'development'
}
