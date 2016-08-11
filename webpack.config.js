const path = require('path');

module.exports = {
  entry: [path.resolve(__dirname, 'client', 'src', 'components', 'app.jsx'), 'whatwg-fetch'],
  output: {
    path: './client/public/dist',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './client',
    port: 8100
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: /client/,
        loader: 'babel',
      },
    ],
  },
};
