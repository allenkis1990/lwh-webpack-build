/**
 * Created by Allen Liu on 2019/8/1.
 */
let historyFallback = require('../task/historyFallback.js')
let path = require('path')
let project = './jianli'
module.exports = function(app){
//作品集专门放在demo文件夹下不走vue路由
    app.get('/demo/*',function(req,res){
        var url = req.url.replace('/','')
        url = url.replace(/\?.+$/,'')
        url = decodeURI(url)
        var p = path.resolve(__dirname,'../',url)
        res.sendFile(p)
    })





    //这个路由一定放在最后
    app.get('/*',function(req,res){
        historyFallback(req,res,project)
    })
}
