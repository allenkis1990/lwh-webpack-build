let project = '../../dist/project1'
let express = require('express')
let app = express()
let path = require('path')
//url访问/的时候固定重定向到portal去

app.use(express.static(path.resolve(__dirname,`${project}`)))

app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,`${project}/home/index.html`))
})




app.listen('8889','127.0.0.1',function(){
    console.log('dist代码启动成功');
})