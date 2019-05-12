let project = './dist/project1'
let express = require('express')
let app = express()
let path = require('path')
let historyFallback = require('./task/distHistoryFallback.js')


app.get('/*',function(req,res){
    historyFallback(req,res,project)
})


//app.use(express.static(path.resolve(__dirname,project)))



app.listen('8888','127.0.0.1',function(){
    console.log('dist代码启动成功');
})