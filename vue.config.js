// const path = require('path')
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
module.exports = {
  lintOnSave: false,
  css: {
    extract: false
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-json-form/'
    : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: (config) => {
    // config.resolve.alias
    //   .set('@', resolve('src/components'))

    config.module
      .rule('js').include
      .add('/packages')
      .end()
  }
}
