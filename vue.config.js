const webpack = require('webpack')
// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, '..'1, dir)
// }

module.exports = {
  lintOnSave: false,
  publicPath: './', // 部署项目路径
  // baseUrl: process.env_NODE_ENV == 'production' ? '/vehiclerepair/' : '', // 部署项目路径
  devServer: {
    port: 8086, // 端口号
    // host: 'localhost',
    open: true, //配置自动启动浏览器
    proxy: {
      '/kindnessplatform': {
        target: 'http://47.100.200.255:9955/kindnessplatform', // 线上
        // target: 'http://47.100.200.255:9955/kindnessplatform',  // 测试
        changeOrigin: true,
        pathRewrite: {
          '^/kindnessplatform': '/'
        }
      }
    }
  },

  configureWebpack: {
    // webpack 配置项
    // resolve: {
    //   alias: {
    //     vue$: 'vue/dist/vue.esm.js'
    //     // '@': resolve('src'),
    //     // 'views': resolve('src/views')
    //   }
    // },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        // data: `@import "@/assets/css/global.scss";`
      },
    }
  }
}
