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

module.exports = {

  configureWebpack: {

    plugins: [

      new webpack.ProvidePlugin({

        $: 'jquery',

        jQuery: 'jquery',

        'window.jQuery': 'jquery',

        Popper: ['popper.js', 'default']

      })

    ]

  }

}