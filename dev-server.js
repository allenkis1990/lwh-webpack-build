
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
let config = require('./config/config')
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
    publicPath: config.dev.publicPath,
    // publicPath: 'http://127.0.0.1:8080/portal',
    quiet: true,
    noInfo: true,
    // writeToDisk:true
})


//url访问/的时候固定重定向到portal去
app.get('/',function(req,res){
    res.redirect('/portal');
})


//作品集专门放在demo文件夹下不走vue路由
app.get('/demo/*',function(req,res){
    var url = req.url.replace('/','')
    url = url.replace(/\?.+$/,'')
    url = decodeURI(url)
    var p = path.resolve(__dirname,url)
    console.log(p);
    res.sendFile(p)
})

//mock
app.get('/portal/fuck',function(req,res){
    // console.log(req.url);
    res.send({name:'allen'});
})

//纠正VUE history模式下刷新404问题
let historyFallback = require('./task/historyFallback.js')
historyFallback(app)
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

//静态资源
// let findStaticPath = require('./task/findStaticPath.js')
// config.apps.forEach(($app)=>{
//     let requestBase = `/${$app}/static`
//     app.use(requestBase,findStaticPath(requestBase))
// })

var server = require('./demo/websocket.js')(app)
// app.listen(config.port,config.host);
server.listen(config.port,config.host);