const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
//压缩js会去除声明了但是没有用到的代码
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const config = require('./config/config.js')
module.exports = {
    // devtool:'cheap-module-eval-source-map',//开启sourceMap会导致产出的JS容量变大并且无法去除console
    module:{
        rules:[
            {
                test:/\.css$/,
                //loader:'style-loader!css-loader'
                //从右到左执行
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,//注意这边
                        options: {
                            publicPath:'../'//解决css下的图片路径错误问题
                        }
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
                        loader: MiniCssExtractPlugin.loader,//注意这边
                        options: {
                            publicPath:'../'//解决css下的图片路径错误问题
                        }
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
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin()
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "css/style.css",
            chunkFilename: "css/style.[hash:8].css"}),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        })
        //抽取CSS
    ]
}