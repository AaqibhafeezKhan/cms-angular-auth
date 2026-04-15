const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
    publicPath: process.env.NODE_ENV === 'production' ? '/cms-angular-auth/' : '/',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: false,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: false,
    }),
  ],
  devServer: {
    port: 8084,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  externals: {
    'zone.js': 'Zone',
  },
};
