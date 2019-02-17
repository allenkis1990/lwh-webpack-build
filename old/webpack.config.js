// "@intervolga/optimize-cssnano-plugin": "^1.0.6", 不知道为何json依赖后报错
// "cssnano": "^4.1.7",
//console.log(process.env.mode);//在cmd里输入set mode=xxx设置env.mode如果想清空就是set mode=
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
console.log(process.env.NODE_ENV);
let webpackConfig = process.env.NODE_ENV === 'production' ?
                    require('./webpack.pro.config') :
                    require('./webpack.dev.config');
const webpackBaseConfig = require('./webpack.base.config');
let config = require('./config/config.js')
// let fs = require('fs')
// let f = fs.readFileSync('./lwh.txt','utf-8')
// console.log(f,'8888');
// webpackBaseConfig.entry.main3= f;
module.exports = merge(webpackBaseConfig,webpackConfig);