/**
 * Created by Allen Liu on 2020/1/1.
 */
let express = require('express')
let app = express()
let skuMock = require('./skuMock.js')
let shoppingCartMock = require('./shoppingCartMock.js')
let path = require('path')
app.use(function (req, res, next) {
    res.setHeader('Access-control-Allow-Methods', '*')
    res.setHeader('Access-control-Allow-Origin', '*')
    res.setHeader('Access-control-Allow-Headers', 'Content-Type,fuck,lwh')
    next()
})

// app.use(express.static(path.resolve(__dirname,'..','static')))
skuMock(app)
shoppingCartMock(app)



app.listen('8787','192.168.28.253', function () {
    console.log('服务启动成功');
})