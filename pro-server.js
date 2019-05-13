let project = './dist/project2'
let express = require('express')
let app = express()
let path = require('path')
let historyFallback = require('./task/distHistoryFallback.js')

//url访问/的时候固定重定向到portal去
app.get('/',function(req,res){
    res.redirect('/portal');
})


app.get('/*',function(req,res){
    historyFallback(req,res,project)
})


//app.use(express.static(path.resolve(__dirname,project)))



app.listen('8888','127.0.0.1',function(){
    console.log('dist代码启动成功');
})