// const path = require('path')
// const resolve = dir => path.join(__dirname, dir)

// module.exports = {
//     baseUrl: '../',
//     runtimeCompiler: true,
//     chainWebpack: config => {
//         config.resolve.alias
//             .set('@', resolve('src'))
//     }
// }
const webpack = require("webpack");

module.exports={
  configureWebpack:{
      devServer:{
          proxy:{
              '/api':{
                  target:'http://localhost:3000',
                  changeOrigin: true,
                  pathRewrite: {
                      "^/api":''
                  }
              }

          }
      }
  }
}