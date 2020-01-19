let argv = require('yargs').argv
// if(argv.project){
//     argv.project = argv.project.replace(/\s+/ig,'')
// }
let project = `../dist/${argv.project}`
let express = require('express')
let app = express()
let path = require('path')
let historyFallback = require('./task/distHistoryFallback.js')
let config = require('./config/config.js')

//jianli专用
app.get('/demo/*',function(req,res){
    var url = req.url.replace('/','')
    url = url.replace(/\?.+$/,'')
    url = decodeURI(url)
    var p = path.resolve(__dirname,'../projects/jianli/portal',url)
    res.sendFile(p)
})


app.get('/*',function(req,res){
    historyFallback(req,res,project)
})


//app.use(express.static(path.resolve(__dirname,project)))



app.listen('9898',function(){
    console.log('dist代码启动成功');
})