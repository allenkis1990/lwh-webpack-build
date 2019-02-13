const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('./config/config.js')
module.exports = {
    devtool:'source-map',//在--mode production模式下也能精准定位报错位置
    watch:false,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,//每多少秒询问一次
        aggregateTimeout: 1000//发现改动后多少秒执行打包
    },
    module:{
        rules:[
             {
                 test:/\.css$/,
                 //loader:'style-loader!css-loader'
                 //从右到左执行
                 use:[
                     {
                         loader:'style-loader'
                     },
                     {
                         loader:'css-loader'
                     },
                     {loader:'postcss-loader'}//配合postcss.config文件来加CSS前缀
                 ],
                 exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                 include:[path.resolve(config.projectPath)]//只编译src文件夹 但是node_modules除外
             },
             {
                 test:/\.less/,
                 //loader:'style-loader!css-loader'
                 use:[
                     {
                         loader:'style-loader'
                     },

                     {
                         loader:'css-loader'
                     },
                     {loader:'postcss-loader'},//配合postcss.config文件来加CSS前缀
                     {
                         loader:"less-loader"
                     }
                 ],
                 exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                 include:[path.resolve(config.projectPath)]//只编译src文件夹 但是node_modules除外
             }
        ]
    },
    // mode:'development',
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin()
    ]
}