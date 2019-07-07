
let express = require('express')
let app = express()
let path = require('path')


//url访问/的时候固定重定向到portal去
app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'circle.html'));
})




app.listen('8888','192.168.0.112',function(){
    console.log('dist代码启动成功');
})