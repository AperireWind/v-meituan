//模拟数据
// *******************导入express**************************
// const express = require('express')
// *********************创建express实例**********************
// const app = express()
//****************** 读取json数据*************************
var goods = require("./data/goods.json")
var ratings = require("./data/ratings.json")
var seller = require("./data/seller.json")

// var apiRoutes = express.Router();
// app.use('/api', apiRoutes)

module.exports = {
  // 基本路径
  baseUrl: '/',

  // 输出文件目录
  outputDir: 'dist',

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: true,

  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => { },

  configureWebpack: () => { },

  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  //vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: undefined,

  // css相关配置
  css: {
    loaderOptions: {}
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: undefined,

  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode

  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // webpack-dev-server 相关配置
  devServer: {
    //*********************** */模拟数据开始*************************************************
    before(app) {
      app.get("/api/goods", (req, res) => {
        res.json(goods)
      })

      app.get("/api/ratings", (req, res) => {
        res.json(ratings)
      })

      app.get("/api/seller", (req, res) => {
        res.json(seller)
      })
    },

    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null// 设置代理

  },

  // 第三方插件配置
  pluginOptions: {
    // ...
  },

}