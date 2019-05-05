// vue.config.js 

const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
        excludes: ['**/.*', '**/*.map', '**/*.svg'],
      })
    ]
  }
}