
let express = require('express')
let app = express()
// express后端请求
require('./expressActions/actions').start(app)
// express前端路由
require('./expressRouters/routers')(app)

var server = require('./demo/websocket.js')(app)
server.listen('80','172.26.85.161',function(){
    console.log('web服务启动成功！！！');
})