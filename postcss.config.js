module.exports = {
  plugins: [
    require('postcss-browser-reporter'),
    require('postcss-reporter'),
    require('postcss-cssnext'),
    require('postcss-import'),
    require('postcss-url'),
    require('autoprefixer')
  ]
}
