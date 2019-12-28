
let express = require('express')
let app = express()
let path = require('path')

var formdata = require('formidable');
function onData(req,cb) {
    var form = new formdata.IncomingForm();
    var obj = {
        files:{},
        data:{}
    }
    form.on('field', function (name, value) {
        obj.data[name] = value;//这里提取的是键值对数据
    }).on('file', function (name, file) {
        obj.files[name] = file;//这里提取上传的文件
    }).on('end', function () {
        cb(obj)
    });
    form.parse(req);
}



app.use(function(req,res,next){
    res.setHeader('Access-control-Allow-Methods','*')
    res.setHeader('Access-control-Allow-Origin','*')
    res.setHeader('Access-control-Allow-Headers','Content-Type,fuck,lwh')
    next()
})

var skuList = [
    {
        propertyCode:'year',
        propertyCName:'年度',
        propertyId:'sku1'
    },
    {
        propertyCode:'subject',
        propertyCName:'科目',
        propertyId:'sku2'
    },
    {
        propertyCode:'area',
        propertyCName:'地区',
        propertyId:'sku3'
    }
]
app.get('/sku/getSkuDetail',function(req,res){
    res.send({
        status:true,
        code:200,
        info:skuList
    })
})

var skuItem = {
    year:[
        {valueName:'2018',value:'skuItem001',valueCode:'2018'},
        {valueName:'2019',value:'skuItem002',valueCode:'2019'},
        {valueName:'2020',value:'skuItem003',valueCode:'2020'}
    ],
    area:[
        {valueName:'福州',value:'skuItem101',valueCode:'fuzhou'},
        {valueName:'厦门',value:'skuItem102',valueCode:'xiamen'},
        {valueName:'泉州',value:'skuItem103',valueCode:'quanzhou'}
    ],
    subject:[
        {valueName:'语文',value:'skuItem301',valueCode:'yuwen'},
        {valueName:'数学',value:'skuItem302',valueCode:'shuxue'},
        {valueName:'英文',value:'skuItem303',valueCode:'yingyu'}
    ]
}

app.post('/sku/getSkuItemArr',function(req,res){
    onData(req,function(obj){
        let data = obj.data
        // console.log(data);
        let ressult = ''
        for(let key in data){
            let value = data[key]
            if(skuItem.hasOwnProperty(value)){
                ressult = skuItem[value]
            }
        }
        if(ressult){
            res.send({
                status:true,
                code:200,
                info:ressult
            })
        }else{
            res.send({
                status:false,
                code:500,
                info:'skuItemArr获取失败'
            })
        }
    })
})




app.listen('8989','127.0.0.1',function(){
    console.log('服务启动成功');
})