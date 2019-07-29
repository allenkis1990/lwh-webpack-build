let project = './jianli'
let express = require('express')
let app = express()
let historyFallback = require('./task/historyFallback.js')
//作品集专门放在demo文件夹下不走vue路由
app.get('/demo/*',function(req,res){
    var url = req.url.replace('/','')
    url = url.replace(/\?.+$/,'')
    url = decodeURI(url)
    var p = path.resolve(__dirname,url)
    console.log(p);
    res.sendFile(p)
})



app.get('/*',function(req,res){
    historyFallback(req,res,project)
})


//app.use(express.static(path.resolve(__dirname,project)))


var server = require('./demo/websocket.js')(app)
server.listen('80','172.26.85.161',function(){
    console.log('web服务启动成功！！！');
})