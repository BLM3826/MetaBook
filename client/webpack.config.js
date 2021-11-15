module.exports = {
  output: {
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          emitWarning: true,
        },
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]' },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      }
    },
  },
  performance: {
    hints: false,
  },
};
