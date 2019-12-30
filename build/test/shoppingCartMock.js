let express = require('express')
let app = express()
let path = require('path')


app.use(function (req, res, next) {
    res.setHeader('Access-control-Allow-Methods', '*')
    res.setHeader('Access-control-Allow-Origin', '*')
    res.setHeader('Access-control-Allow-Headers', 'Content-Type,fuck,lwh')
    next()
})

let shoppingCartList = [
    {
        name: 'Allen体育用品店',
        subList: [
            {
                id:'zuqiu',
                name: '足球',
                price:80
            },
            {
                id:'paobuxie',
                name: '跑步鞋',
                price:190
            },
            {
                id:'yongjing',
                name: '泳镜',
                price:25
            }
        ]
    },
    {
        name: 'Allen水果店',
        subList: [
            {
                id:'apple',
                name: '苹果',
                price:4
            },
            {
                id:'xigua',
                name: '西瓜',
                price:10
            },
            {
                id:'smt',
                name: '水蜜桃',
                price:3
            }
        ]
    },
    {
        name: 'Allen手机专卖店',
        subList: [
            {
                id:'huawei',
                name: '华为',
                price:2999
            },
            {
                id:'nokia',
                name: '诺基亚',
                price:888
            },
            {
                id:'htc',
                name: 'H.T.C',
                price:1777
            }
        ]
    }
]

app.get('/shoppingCart/getShoppingCartList', function (req, res) {
    res.send({
        status: true,
        code: 200,
        info: shoppingCartList
    })
})


app.listen('8989', '127.0.0.1', function () {
    console.log('服务启动成功');
})