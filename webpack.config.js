let nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './main.js',
  target:'node',
  externals: [nodeExternals()],
  externalsPresets:{
    node: true
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/,/renderer.js/],
        use: { 
          loader: 'babel-loader',
        }
      }
    ]
  }
};
