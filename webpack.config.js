const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './connectWallet.js',
  cache: false,
  mode: 'development',
  output: {
      path: path.resolve(__dirname, '.'),
      filename: 'bundle.js'      
  },
  resolve: {
    fallback: { 
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "events": require.resolve("events-browserify"),
      "buffer": require.resolve('buffer/'),
      "path":   require.resolve("path-browserify")
    },
  },
  plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ]    
  
}
