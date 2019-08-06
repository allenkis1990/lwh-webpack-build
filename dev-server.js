let colors = require('colors/safe');
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

//开发环境url访问/的时候固定重定向到portal去
app.get('/',function(req,res){
    res.redirect('/portal');
})



function tryHasConFigServer(url){
    var res = true
    try {
        // require.resolve(actionSeverPath).start(app)
        require.resolve(url)
    }catch(e){
        console.log(colors.red(`没有配置url为: 《${url}》 的服务`))
        res = false
    }
    return res
}

var actionSeverPath = `./server/${config.project}/expressActions/actions.js`
var routerSeverPath = `./server/${config.project}/expressRouters/routers.js`

var hasConfigActions = tryHasConFigServer(actionSeverPath)
var hasConfigRouters = tryHasConFigServer(routerSeverPath)
if(hasConfigActions){
    // express后端请求
    require(actionSeverPath).start(app)
}
if(hasConfigRouters){
    // express前端路由
    require(routerSeverPath)(app)
}


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

var wbPath = `./server/${config.project}/websocket.js`
var hasConfigWebsocket = tryHasConFigServer(wbPath)
//如果有websocket.js就起wb服务 否则起一般的服务
if(hasConfigWebsocket){
    var server = require(wbPath)(app)
    server.listen(config.port,config.host);
}else{
    app.listen(config.port,config.host);
}
