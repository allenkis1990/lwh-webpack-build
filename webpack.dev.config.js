
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
const NotFoudEntryPlugin = require('./plugins/notFoudEntryPlugin.js')
const MoveAssetsToDirPlugin = require('./plugins/moveAssetsToDirPlugin.js')
const AddMainDirFilePlugin = require('./plugins/addMainDirFilePlugin.js')
const ProcessChunkPlugin = require('./plugins/processChunkPlugin.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}
function getExports(project){

    let entry = {}
    let cacheGroups = {}
    let plugins = []
    let alias = {}
    let rules = []
    config.apps.forEach((app)=>{
        entry[`${app}/app`] = [`${config.mainDir}/${project}/${app}/main.js`,'./dev-client.js']

        let reg  = new RegExp(`${app}\\\\images\\\\.+\\.(gif|png|jpg|svg|ttf|woff)`)
        rules.push(
            {
                test:reg,
                use:{
                    loader:'url-loader',
                    options: {
                        // outputPath:`${app}/images`,
                        publicPath:'/',
                        name:`${app}/images/[name].[hash:8].[ext]`,
                        limit:1024*1//小于8KB会被转成base64
                    }
                },
                exclude:[path.resolve(`./${config.dist}`),/node_modules/]//排除解析dist文件夹
                //include:[path.resolve('./projects/project1/src')]//只编译src文件夹 但是node_modules除外
            }
        )

        cacheGroups[`${app}Assets`] = {
            chunks: 'initial',// 只对入口文件处理
            test: path.resolve(`${config.mainDir}/${project}/${app}/assets`),
            // test: /assets/,
            name: `${app}/assets`,
            priority: 10,
            enforce: true,
            minChunks:1//最小被引用两次的公共库才被抽离到公共代码
        }
        //'@':path.resolve(`${config.mainDir}/${project}`)
        alias[`@${app}`] = path.resolve(`${config.mainDir}/${project}/${app}`)
        plugins.push(new HtmlWebpackPlugin({
            filename: `${app}/index.html`,//真正输出的地址output.path+filename=./dist/index.html
            template:`${config.mainDir}/${project}/${app}/index.html`,//INdex的模板
            inject: true,
            hash:true,
            title:app,
            minify: {
                removeAttributeQuotes: true, // 移除属性的引号
                collapseWhitespace:true,//html片段变成一行
                removeComments: true
            },
            excludeChunks: config.apps.filter((item)=> {
                return item !== app
            }).map((item)=>{
                return `${item}/app`
            }),
            chunks:[`${app}/app`]//按需映入入口JS
        }))
    })
    return {
        entry: Object.assign(entry,{}),
        output:{
            path:path.resolve(__dirname,config.dist,project),
            filename:'[name].bundle.js',
            //filename:'js/[name].[hash:8].bundle.js',
            // publicPath: 'http://127.0.0.1:8080/'+which+'/'
            // publicPath: which+'/'
            publicPath:"/"//页面上引入的路径 比如js/xxx就会变成dist/js/xxx
        },
        externals: {
            // 使用动态连接库的VUE模块，这样就可以直接在项目中require('Vue')使用 webpack不会进行打包
            //'Vue': 'window._dll_vueAll(\'./node_modules/vue/dist/vue.min.js\')'
        },
        resolve: {
            //import时可以省去后缀名js vue json默认require先找.js从左到右
            //作用于项目中，webpack配置文件中无法使用
            extensions: ['.js', '.vue', '.json'],
            //require('xxx')先去src目录下找没有才去node_modules从左到右
            //作用于项目中，webpack配置文件中无法使用
            modules: [path.resolve("node_modules")],
            //原本在文件夹里去找package.json只会找main和module现在fuck和shit也会去找优先级从左到右
            mainFields:['main','module','fuck','shit'],
            //给引入的模块取个别名可以是文件全路径也可以是文件夹
            alias:Object.assign(alias,{
                '@parent':path.resolve(config.parentMainDir),
                'vue$': 'vue/dist/vue.esm.js',
                'nms':path.resolve(__dirname,'node_modules')
            })
        },
        resolveLoader: {
            // alias: {
            //     testLoader:path.resolve('./loaders/testLoader.js')
            // },
            //mainFields:['main'],
            modules: [path.resolve("node_modules"),path.resolve("loaders")]
        },
        module:{
            //不去解析的文件
            //noParse: [/lwh\.js/],
            rules:rules.concat([
                {
                    test: /\.vue$/,
                    use: {
                        loader:'vue-loader'
                    }
                },
                {
                    test:/\.(js|vue)$/,
                    //test: /\.(js)(\?.*)?$/,
                    use:{
                        loader:'notFoudLoader',
                        options:{
                            mainDir:config.mainDir.replace('./','')
                        }
                    },
                    exclude:[path.resolve(`./${config.dist}`),/node_modules/],
                    //exclude: file => (
                    //    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                    //),
                    include:[path.resolve(`${config.mainDir}`),path.resolve(`${config.parentMainDir}`)]
                },
                {
                    test:/\.(html|htm)/,
                    loader:'html-withimg-loader'
                },
                {
                    //ttf和woff全部都转成base64
                    test:/node_modules\\.+\.(ttf|woff)/,
                    use:{
                        loader:'url-loader',
                        options: {
                            // outputPath:`${app}/images`,
                            publicPath:'/',
                            limit:1024*1000000//小于8KB会被转成base64
                        }
                    },
                    exclude:[path.resolve(`./${config.dist}`)]//排除解析dist文件夹
                    //include:[path.resolve('./projects/project1/src')]//只编译src文件夹 但是node_modules除外
                },
                // env（替代es2015那些），stage-0，transform-runtime垫片
                {
                    test:/\.js/,
                    use: ['happypack/loader?id=babel'],
                    // 不设置这个会报错
                    exclude: /node_modules/
                },
                {
                    test: /\.less/,
                    //loader:'style-loader!css-loader'
                    use: [
                        {
                            //loader: 'style-loader'
                            loader: 'vue-style-loader'
                        },

                        {
                            loader: 'css-loader'
                        },
                        {loader: 'postcss-loader'},//配合postcss.config文件来加CSS前缀
                        {
                            loader: "less-loader"
                        }
                    ],
                    exclude: [path.resolve(`./${config.dist}`)],//排除解析dist文件夹
                    include: [path.resolve(`${config.mainDir}/${project}`),path.resolve(`${config.parentMainDir}`)]//只编译src文件夹 但是node_modules除外
                },
                {
                    test: /\.css$/,
                    //loader:'style-loader!css-loader'
                    //从右到左执行
                    use: [
                        {
                            //loader: 'style-loader'
                            loader: 'vue-style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {loader: 'postcss-loader'}//配合postcss.config文件来加CSS前缀
                    ],
                    exclude: [path.resolve(`./${config.dist}`)],//排除解析dist文件夹
                    include: [path.resolve(`${config.mainDir}/${project}`),path.resolve(`${config.parentMainDir}`),/node_modules/]//只编译src文件夹 但是node_modules除外
                },
                //解析打包json文件
                {
                    test:/\.json/i,
                    type: 'javascript/auto',
                    loader:'json-loader'
                }
            ])
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
                cacheGroups:Object.assign(cacheGroups,{
                    vendor: {
                        chunks: 'initial',// 只对入口文件处理
                        test:/[\\/]node_modules[\\/]/,
                        name: 'common/vendor',
                        priority: 10,
                        enforce: true,
                        // minChunks:1//最小被引用两次的公共库才被抽离到公共代码
                    }
                })
            },
            //抽取webpack运行文件代码
            runtimeChunk: {
                name: 'common/manifest'
            }
        },
        plugins:plugins.concat([
            new VueLoaderPlugin(),
            /*//在这边配置全局引入后哪个模块不用require都可以用
            new webpack.ProvidePlugin({
                $:'jquery'
            }),*/
            new CleanWebpackPlugin([`./${config.dist}/${project}`]),//删除文件夹插件
            //清除没用到的样式，只有在抽离css的模式生效,指定的是模板html文件
            new PurifyCSSPlugin({
                // Give paths to parse for rules. These should be absolute!
                paths: glob.sync(path.join(__dirname, './*.html')),
            }),
            //new uglifyjsWebpackPlugin(),//webpack4会对JS进行自动压缩
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
                                },
                                "component",
                                {
                                    "libraryName": "element-ui",
                                    "styleLibraryName": "theme-chalk"
                                }
                            ]
                        ]
                    }
                }],
                threads: 3,//你要开启多少个子进程去处理这一类型的文件
                verbose: true//是否要输出详细的日志 verbose
            }),
            new NotFoudEntryPlugin({
                mainDir:config.mainDir,
                parentDir:config.parentMainDir
            }),
            new AddMainDirFilePlugin({
               mainDir:config.mainDir,
               parentDir:config.parentMainDir
            }),
            new webpack.HotModuleReplacementPlugin(),
            new FriendlyErrorsPlugin(),
            //new MoveAssetsToDirPlugin()
            //抽取CSS
        ])
    }
}


module.exports = getExports(config.project)