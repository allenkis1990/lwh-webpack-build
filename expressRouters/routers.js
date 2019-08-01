/**
 * Created by Allen Liu on 2019/8/1.
 */
var path = require('path')
module.exports = function(app){
    //url访问/的时候固定重定向到portal去
    app.get('/',function(req,res){
        res.redirect('/portal');
    })
//作品集专门放在demo文件夹下不走vue路由
    app.get('/demo/*',function(req,res){
        var url = req.url.replace('/','')
        url = url.replace(/\?.+$/,'')
        url = decodeURI(url)
        var p = path.resolve(__dirname,'../',url)
        res.sendFile(p)
    })
}