/* global __dirname */
module.exports = {
  entry: __dirname + '/index.js',
  output: {
    path: __dirname + '/dist/js',
    publicPath: '/dist/js',
    filename: 'main.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader?presets=es2015' 
      }
    ]
  }
}
