
const express = require('express')
const merge = require('webpack-merge')
const app = express()
const webpack  = require('webpack')
const path = require('path')
//console.log(path.resolve(__dirname,'projects/project1/src'),12121212);
// let webpackConfig = require('./webpack.dev.config')
let webpackConfig = require('./webpack.dev.config')
// webpackConfig.mode = 'development'
webpackConfig.mode = 'development'
Object.keys(webpackConfig.entry).forEach(function (name) {
    // console.log(name);
    //if (name !== 'index') {
    //    webpackConfig.entry[name] = ['./dev-client'].concat(webpackConfig.entry[name])
    //}
})
var compiler = webpack(webpackConfig)


//////////////////////热更新////////////////////////////
// 开发环境下加自动刷新的entry
// index.html无法热更新
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
    path: "/__webpack_hmr"
    // heartbeat: 20000
})
 //compiler.plugin('compilation', function (compilation) {
 //    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
 //        hotMiddleware.publish({ action: 'reload' })
 //        cb()
 //    })
 //})
app.use(hotMiddleware);
//////////////////////热更新////////////////////////////
//////////////////////开发服务器配置////////////////////////////
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    // publicPath: 'http://127.0.0.1:8080/portal',
    quiet: true,
    noInfo: true,
    // writeToDisk:true
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
// app.use('/js',express.static(path.join(__dirname,'dist/project1/portal/js')))
// app.use(function (req,res) {
//     if(/hot-update.json/.test(req.url)){
//         console.log(req.url);
//         console.log(req.statusCode);
//         console.log(req.statusMessage);
//         console.log(Object.keys(req))
//         if(!req.statusCode){
//             res.send({"h":"389482d4f86b2024450b","c":{"portalEntry":true}})
//         }
//     }
//     if(/hot-update.js/.test(req.url)){
//         res.send(1)
//     }
//     // res.send('111')
// })
// 启动服务
app.listen('8080','127.0.0.1');