const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'castor.[contenthash:8].js',
    path: path.resolve(__dirname, 'dist')
  }
};
