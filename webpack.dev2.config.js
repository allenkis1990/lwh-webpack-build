
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');//构建进度条插件
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
const Happypack = require('happypack')
const config = require('./config/config.js')
const RightEntryPlugin = require('./plugins/rightEntryPlugin.js')
const MoveAssetsToDirPlugin = require('./plugins/moveAssetsToDirPlugin.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}
function getExports(entryName,which){
    return {
        entry: {
            portal: [`${config.projectPath}/portal/js/index.js`,'./dev-client'],
            center: [`${config.projectPath}/center/js/index.js`,'./dev-client']
            // [entryName]: [`${config.projectPath}/${which}/js/index.js`,'./dev-client']
        },
        output:{
            path:path.resolve(__dirname,'dist',config.project),
            filename:'js/[name].[hash:8].bundle.js',
            // publicPath: 'http://127.0.0.1:8080/'+which+'/'
            // publicPath: which+'/'
            publicPath:""//页面上引入的路径 比如js/xxx就会变成dist/js/xxx
        },
        externals: {
            // 使用动态连接库的VUE模块，这样就可以直接在项目中require('Vue')使用 webpack不会进行打包
            //'Vue': 'window._dll_vueAll(\'./node_modules/vue/dist/vue.min.js\')'
        },
        resolve: {
            //import时可以省去后缀名js vue json默认require先找.js从左到右
            //作用于项目中，webpack配置文件中无法使用
            extensions: ['.js', '.vue', '.json','.less'],
            //require('xxx')先去src目录下找没有才去node_modules从左到右
            //作用于项目中，webpack配置文件中无法使用
            modules: [path.resolve("node_modules"),path.resolve(config.projectPath),path.resolve(config.parentProject)],
            //原本在文件夹里去找package.json只会找main和module现在fuck和shit也会去找优先级从左到右
            mainFields:['main','module','fuck','shit'],
            //给引入的模块取个别名可以是文件全路径也可以是文件夹
            alias:{
                //'@':path.resolve(config.parentProject+'/src'),
                '@':path.resolve(config.projectPath)
            }
        },
        module:{
            //不去解析的文件
            noParse: [/lwh\.js/],
            rules:[
                {
                    test:/portal\\images\\.+\.(gif|png|jpg|svg)/,
                    use:{
                        loader:'url-loader',
                        options: {
                            outputPath:'portal/images',
                            // publicPath:'dist/images',
                            name:'[name].[hash:8].[ext]',
                            limit:1024*1//小于8KB会被转成base64
                        }
                    },
                    exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                    //include:[path.resolve('./projects/project1/src')]//只编译src文件夹 但是node_modules除外
                },
                {
                    test:/center\\images\\.+\.(gif|png|jpg|svg)/,
                    use:{
                        loader:'url-loader',
                        options: {
                            outputPath:'center/images',
                            // publicPath:'dist/images',
                            name:'[name].[hash:8].[ext]',
                            limit:1024*1//小于8KB会被转成base64
                        }
                    },
                    exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                    //include:[path.resolve('./projects/project1/src')]//只编译src文件夹 但是node_modules除外
                },
                //解析html页面上的img标签 但是htmlWebpackPlugin.options.title无法读取 可用express静态资源解决
                {
                    test:/\.(html|htm)/,
                    loader:'html-withimg-loader'
                },
                // env（替代es2015那些），stage-0，transform-runtime垫片
                {
                    test:/\.js/,
                    use: ['happypack/loader?id=babel'],
                    // 不设置这个会报错
                    exclude: /node_modules/
                },
                // {
                //     test:/\.css$/,
                //     //loader:'style-loader!css-loader'
                //     //从右到左执行
                //     use:[
                //         {
                //             loader:'style-loader'
                //         },
                //         {
                //             loader:'css-loader'
                //         },
                //         {loader:'postcss-loader'}//配合postcss.config文件来加CSS前缀
                //     ],
                //     exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                //     include:[path.resolve(config.projectPath)]//只编译src文件夹 但是node_modules除外
                // },
                // {
                //     test:/\.less/,
                //     //loader:'style-loader!css-loader'
                //     use:[
                //         {
                //             loader:'style-loader'
                //         },
                //
                //         {
                //             loader:'css-loader'
                //         },
                //         {loader:'postcss-loader'},//配合postcss.config文件来加CSS前缀
                //         {
                //             loader:"less-loader"
                //         }
                //     ],
                //     exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                //     include:[path.resolve(config.projectPath)]//只编译src文件夹 但是node_modules除外
                // }

                {
                    test:function(url){
                        // if(/[\\/]portal[\\/](style|less)[\\/].+\.(less|css)/.test(url)){
                        //     console.log('portal'+url);
                        // }
                        return /[\\/]portal[\\/](style|less)[\\/].+\.(less|css)/.test(url)
                    },
                    // test:/\.css$/,
                    //loader:'style-loader!css-loader'
                    //从右到左执行
                    use:[
                        {
                            loader: MiniCssExtractPlugin.loader,//注意这边
                            // options: {
                            //     publicPath:'../'//解决css下的图片路径错误问题
                            // }
                        },
                        {
                            loader:'css-loader'
                        },
                        {loader:'postcss-loader'}//配合postcss.config文件来加CSS前缀
                    ],
                    exclude:[path.resolve('./dist'),/node_modules/],//排除解析dist文件夹
                    include:[path.resolve(config.projectPath,'portal')]//只编译src文件夹 但是node_modules除外
                },
                {
                    test:function(url){
                        // if(/[\\/]center[\\/](style|less)[\\/].+\.(less|css)/.test(url)){
                        //     console.log('center:'+url);
                        // }
                        return /[\\/]center[\\/](style|less)[\\/].+\.(less|css)/.test(url)
                    },
                    // test:/\.less/,
                    //loader:'style-loader!css-loader'
                    use:[
                        {
                            loader: MiniCssExtractPlugin.loader,//注意这边
                            // options: {
                            //     publicPath:'../'//解决css下的图片路径错误问题
                            // }
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
                    include:[path.resolve(config.projectPath,'center')]//只编译src文件夹 但是node_modules除外
                }
            ]
        },
        devtool:'source-map',//在--mode production模式下也能精准定位报错位置
        watch:false,
        watchOptions: {
            ignored: /node_modules/,
            poll: 1000,//每多少秒询问一次
            aggregateTimeout: 1000//发现改动后多少秒执行打包
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'initial',// 只对入口文件处理
                        test:/[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        priority: 10,
                        enforce: true,
                        // minChunks:1//最小被引用两次的公共库才被抽离到公共代码
                    },
                    // centerVendor: {
                    //     chunks: 'initial',// 只对入口文件处理
                    //     // test:/[\\/]node_modules[\\/]/,
                    //     test:function(a,b,entry='centerEntry'){
                    //         // if(/[\\/]node_modules[\\/]/.test(a.userRequest)&&recursiveIssuer(a)===entry&&a.constructor.name==='NormalModule'){
                    //         //     console.log('父亲:'+recursiveIssuer(a));
                    //         //     console.log(a.userRequest);
                    //         //     console.log(a.constructor.name);
                    //         // }
                    //         return /[\\/]node_modules[\\/]/.test(a.userRequest)&&recursiveIssuer(a)===entry&&a.constructor.name==='NormalModule'
                    //     },
                    //     name: 'center/js/vendor',
                    //     priority: 10,
                    //     enforce: true,
                    //     // minChunks:1//最小被引用两次的公共库才被抽离到公共代码
                    // },
                    portalAssets: {
                        chunks: 'initial',// 只对入口文件处理
                        test: path.resolve(`${config.projectPath}/portal/assets`),
                        // test: /assets/,
                        name: 'portal/assets',
                        priority: 10,
                        enforce: true,
                        minChunks:1//最小被引用两次的公共库才被抽离到公共代码
                    },
                    centerAssets: {
                        chunks: 'initial',// 只对入口文件处理
                        test: path.resolve(`${config.projectPath}/center/assets`),
                        // test: /assets/,
                        name: 'center/assets',
                        priority: 10,
                        enforce: true,
                        minChunks:1//最小被引用两次的公共库才被抽离到公共代码
                    }
                }
            },
            //抽取webpack运行文件代码
            runtimeChunk: {
                name: 'manifest'
            }
        },
        plugins: [

            /*//在这边配置全局引入后哪个模块不用require都可以用
            new webpack.ProvidePlugin({
                $:'jquery'
            }),*/
            new CleanWebpackPlugin(['./dist/'+config.project]),//删除文件夹插件
            //清除没用到的样式，只有在抽离css的模式生效,指定的是模板html文件
            new PurifyCSSPlugin({
                // Give paths to parse for rules. These should be absolute!
                paths: glob.sync(path.join(__dirname, './*.html')),
            }),
            //new uglifyjsWebpackPlugin(),//webpack4会对JS进行自动压缩
            //指定html位置指定后打包的js会自动被引入
            new HtmlWebpackPlugin({
                filename: 'portal/index.html',//真正输出的地址output.path+filename=./dist/index.html
                template:`${config.projectPath}/portal/index.html`,//INdex的模板
                inject: true,
                hash:true,
                title:'portal',
                minify: {
                    removeAttributeQuotes: true, // 移除属性的引号
                    collapseWhitespace:true,//html片段变成一行
                    // removeComments: true
                },
                excludeChunks:['center'],
                chunks:['portal']//按需映入入口JS
            }),
            new HtmlWebpackPlugin({
                filename: 'center/index.html',//真正输出的地址output.path+filename=./dist/index.html
                template:`${config.projectPath}/center/index.html`,//INdex的模板
                inject: true,
                hash:true,
                title:'center',
                minify: {
                    removeAttributeQuotes: true, // 移除属性的引号
                    collapseWhitespace:true,//html片段变成一行
                    // removeComments: true
                },
                excludeChunks:['portal'],
                chunks:['center']//按需映入入口JS
            }),
            new ProgressBarPlugin(),
            new webpack.DefinePlugin({
                dev:true
            }),
            new Happypack({
                //ID是标识符的意思，ID用来代理当前的happypack是用来处理一类特定的文件的
                id: 'babel',
                use:[{
                    loader:'babel-loader',
                    query:{
                        presets:['env','stage-0','react'],//把es6 es7转成es语法
                        plugins: [
                            [
                                'transform-runtime',
                                {
                                    corejs: true,
                                    helpers: true,
                                    regenerator: true,
                                    useESModules: true,
                                    moduleName: 'babel-runtime'
                                }
                            ]
                        ]
                    }
                }],
                threads: 3,//你要开启多少个子进程去处理这一类型的文件
                verbose: true//是否要输出详细的日志 verbose
            }),
            new RightEntryPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new FriendlyErrorsPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name]/css/[name]Style.css",
                chunkFilename: "[name]/css/[name]Style.[hash:8].css"}),
            new MoveAssetsToDirPlugin()
            //抽取CSS
        ]
    }
}


module.exports = [getExports()]