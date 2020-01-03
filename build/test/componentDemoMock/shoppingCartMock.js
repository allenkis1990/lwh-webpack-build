
let path = require('path')


module.exports = function(app){
    let shoppingCartList = [
        {
            name: 'Allen体育用品店',
            id:'ty',
            subList: [
                {
                    parentId:'ty',
                    id:'zuqiu',
                    name: '足球',
                    price:80
                },
                {
                    parentId:'ty',
                    id:'paobuxie',
                    name: '跑步鞋',
                    price:190
                },
                {
                    parentId:'ty',
                    id:'yongjing',
                    name: '泳镜',
                    price:25
                }
            ]
        },
        {
            name: 'Allen水果店',
            id:'sg',
            subList: [
                {
                    parentId:'sg',
                    id:'apple',
                    name: '苹果',
                    price:4
                },
                {
                    parentId:'sg',
                    id:'xigua',
                    name: '西瓜',
                    price:10
                },
                {
                    parentId:'sg',
                    id:'smt',
                    name: '水蜜桃',
                    price:3
                }
            ]
        },
        {
            name: 'Allen手机专卖店',
            id:'sj',
            subList: [
                {
                    parentId:'sj',
                    id:'huawei',
                    name: '华为',
                    price:2999
                },
                {
                    parentId:'sj',
                    id:'nokia',
                    name: '诺基亚',
                    price:888
                },
                {
                    parentId:'sj',
                    id:'htc',
                    name: 'H.T.C',
                    price:1777
                }
            ]
        }
    ]

    app.get('/actions/getShoppingCartList', function (req, res) {
        res.send({
            status: true,
            code: 200,
            info: shoppingCartList
        })
    })
}