
let express = require('express')
let app = express()
let path = require('path')

app.use(function(req,res,next){
    res.setHeader('Access-control-Allow-Methods','*')
    res.setHeader('Access-control-Allow-Origin','*')
    res.setHeader('Access-control-Allow-Headers','Content-Type,fuck,lwh')
    next()
})

var skuList = [
    {
        eName:'year',
        cName:'年度',
        id:'sku1'
    },
    {
        eName:'subject',
        cName:'科目',
        id:'sku2'
    },
    {
        eName:'area',
        cName:'地区',
        id:'sku3'
    }
]
app.get('/sku/getSkuDetail',function(req,res){
    res.send({
        status:true,
        code:200,
        info:skuList
    })
})




app.listen('8989','127.0.0.1',function(){
    console.log('服务启动成功');
})