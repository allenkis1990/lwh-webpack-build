const rimraf = require('rimraf');
rimraf('./dist', function (err) {
    if(err){
        console.log(err);
    }
});
const express = require('express')
const merge = require('webpack-merge')
const app = express()
const webpack  = require('webpack')
const path = require('path')
//console.log(path.resolve(__dirname,'projects/project1/src'),12121212);
let webpackConfig = process.env.NODE_ENV === 'production' ?
    require('./webpack.pro.config') :
    require('./webpack.dev.config');
const webpackBaseConfig = require('./webpack.base.config');
webpackConfig.mode = 'development'
if(process.env.NODE_ENV === 'development'){
    Object.keys(webpackBaseConfig.entry).forEach(function (name) {
        webpackBaseConfig.entry[name] = ['./dev-client'].concat(webpackBaseConfig.entry[name])
    })
}
let finallyConfig = merge(webpackBaseConfig,webpackConfig);
var compiler = webpack(finallyConfig)


//////////////////////热更新////////////////////////////
// 开发环境下加自动刷新的entry
// index.html无法热更新
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})
// compiler.plugin('compilation', function (compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//         hotMiddleware.publish({ action: 'reload' })
//         cb()
//     })
// })
app.use(hotMiddleware);
//////////////////////热更新////////////////////////////


//////////////////////开发服务器配置////////////////////////////
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: true,
    noInfo: true
})
// console.log(typeof devMiddleware);//fn
// app.use(function(req,res,next){
//     console.log(1);
//     next()
// })
app.use(devMiddleware);
//////////////////////开发服务器配置////////////////////////////


//////////////////////代理////////////////////////////
let proxyList = {
    '/mobile': {
        target: 'http://192.168.28.250:8899/'
        // changeOrigin: false
    }
}
const proxyMiddleware = require('http-proxy-middleware')
Object.keys(proxyList).forEach(function (context) {
    var options = proxyList[context]
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(context, options))
})
//////////////////////代理////////////////////////////


// 静态资源
//app.use('/src', express.static('./projects/project1/src'))

// 启动服务
app.listen('8088');