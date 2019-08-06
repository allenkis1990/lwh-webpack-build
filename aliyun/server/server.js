
// var serverHost = '172.26.85.161'
var serverHost = '192.168.28.248'
var serverPort = '8080'
let express = require('express')
let app = express()
// express后端请求
require('./expressActions/actions').start(app)

var server = require('./websocket.js')(app)
server.listen(serverPort,serverHost,function(){
    console.log('web服务启动成功！！！');
})