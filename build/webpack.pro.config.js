
const path = require('path');
const webpack = require('webpack');
const config = require('./config/config.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob-all');
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
let merge = require('webpack-merge')
let baseConfig = require('./webpack.base.config.js')
function getExports(project){
    let entry = {}
    let plugins = []
    config.apps.forEach((app)=>{
        var dirName = ''
        if(config.apps.length>1){
            dirName = `${app}/`
        }
        entry[`${dirName}app`] = ['core-js/es6/promise',path.resolve(__dirname,`${config.mainDir}/${project}/${app}/main.js`)]
    })
    let rules = []

    //因为清除无用css一定要用绝对路径，有时候没有的路径会报错所以要try catch 目前只找parentProject和projects里的
    // let purifyPaths = []
    // try{purifyPaths.push(path.join(__dirname,`${config.mainDir}/${project}/**/*.html`))}catch(e){}
    // try{purifyPaths.push(path.join(__dirname,`${config.mainDir}/${project}/**/*.vue`))}catch(e){}
    // try{purifyPaths.push(path.join(__dirname,`${config.mainDir}/${project}/**/*.css`))}catch(e){}
    // try{purifyPaths.push(path.join(__dirname,`${config.mainDir}/${project}/**/*.less`))}catch(e){}
    // try{purifyPaths.push(path.join(__dirname,`${config.parentMainDir}/**/*.html`))}catch(e){}
    // try{purifyPaths.push(path.join(__dirname,`${config.parentMainDir}/**/*.vue`))}catch(e){}
    // try{purifyPaths.push(path.join(__dirname,`${config.parentMainDir}/**/*.css`))}catch(e){}
    // try{purifyPaths.push(path.join(__dirname,`${config.parentMainDir}/**/*.less`))}catch(e){}


    return {
        entry: Object.assign(entry,{}),
        output:{
            path:path.resolve(__dirname,'..',config.dist,project),
            filename:'[name].[chunkHash].bundle.js',
            publicPath: config.build.publicPath
            //publicPath:"dist"//页面上引入的路径 比如js/xxx就会变成dist/js/xxx
        },
        //bund超过一定大小会报警告，加上这个配置就不会报了
        performance: {
            hints:false
        },
        module:{
            //不去解析的文件
            noParse: [/lwh\.js/],
            rules:rules.concat([
                {
                    test: /\.css$/,
                    //loader:'style-loader!css-loader'
                    //从右到左执行
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,//注意这边
                            options: {
                                publicPath: '../'//解决css下的图片路径错误问题
                            }
                        },
                        {
                            loader: 'css-loader'
                        },
                        {loader: 'postcss-loader'}//配合postcss.config文件来加CSS前缀
                    ],
                    exclude: [path.resolve(__dirname,'..',config.dist), /node_modules/],//排除解析dist文件夹
                    include: [path.resolve(__dirname,`${config.mainDir}/${project}`),path.resolve(__dirname,`${config.parentMainDir}`)]//只编译src文件夹 但是node_modules除外
                },
                {
                    test: /\.less/,
                    //loader:'style-loader!css-loader'
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,//注意这边
                            options: {
                                publicPath: '../'//解决css下的图片路径错误问题
                            }
                        },

                        {
                            loader: 'css-loader'
                        },
                        {loader: 'postcss-loader'},//配合postcss.config文件来加CSS前缀
                        {
                            loader: "less-loader"
                        }
                    ],
                    exclude: [path.resolve(__dirname,'..',config.dist), /node_modules/],//排除解析dist文件夹
                    include: [path.resolve(__dirname,`${config.mainDir}/${project}`),path.resolve(__dirname,`${config.parentMainDir}`)]//只编译src文件夹 但是node_modules除外
                }
            ])
        },
        optimization: {
            minimizer: [
                new OptimizeCssAssetsPlugin()
            ]
        },
        plugins: plugins.concat([
            new MiniCssExtractPlugin({
                filename: "[name]Style/style.css",
                chunkFilename: "[name]Style/style.[hash:8].css"}),
            new WebpackParallelUglifyPlugin({
                uglifyJS: {
                    output: {
                        beautify: false, //不需要格式化
                        comments: false //不保留注释
                    },
                    compress: {
                        // warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                        drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                    }
                }
            }),
            //清除没用到的样式，只有在抽离css的模式生效,指定的是模板html文件
            // new PurifyCSSPlugin({
            //     // Give paths to parse for rules. These should be absolute!
            //     paths: glob.sync(purifyPaths),
            // }),
            // new webpack.DefinePlugin({
            //     dev:false,
            //     isHistoryModel:false
            // }),
            //使用内容hash的规则hash文件 便于静态资源缓存
            new webpack.HashedModuleIdsPlugin()
            //服务端预渲染，适合静态页面
            // new PrerenderSPAPlugin({
            //     staticDir:path.resolve(__dirname,'..',config.dist,project),
            //     routes:['/home']
            // })
        ])
    }
}
module.exports = merge(baseConfig,getExports(config.project))