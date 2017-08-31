const path = require('path')
const importPlugin = require('postcss-import')
const createResolver = require('postcss-import-webpack-resolver')

const resolve = createResolver({
  alias: {
    '@vars': path.resolve(__dirname, 'app', 'css', 'variables.css')
  }
})

module.exports = {
  plugins: [
    importPlugin({ resolve }),
    require('postcss-cssnext'),

    require('postcss-url'),
    require('postcss-reporter'),
    require('postcss-browser-reporter')
  ]
}
