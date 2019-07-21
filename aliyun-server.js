let project = './jianli'
let express = require('express')
let app = express()
let historyFallback = require('./task/historyFallback.js')
//url访问/的时候固定重定向到portal去

//if(config.apps.length>1){
//    app.get('/', function (req, res) {
//        res.redirect('/portal');
//    })
//}



app.get('/*',function(req,res){
    historyFallback(req,res,project)
})


//app.use(express.static(path.resolve(__dirname,project)))



app.listen('80','172.26.85.161',function(){
    console.log('web服务启动成功！！！');
})