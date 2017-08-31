const path = require('path')
const cssImport = require('postcss-import')
const createResolver = require('postcss-import-webpack-resolver')

module.exports = {
  plugins: [
    require('postcss-browser-reporter'),
    require('postcss-reporter'),
    require('postcss-cssnext'),
    require('postcss-url'),

    cssImport({
      resolve: createResolver({
        alias: {
          '@css': path.resolve(__dirname, 'app', 'css')
        }
      })
    })
  ]
}
