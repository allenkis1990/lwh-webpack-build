
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');//构建进度条插件
const Happypack = require('happypack')
const config = require('./config/config.js')
const NotFoudEntryPlugin = require('./plugins/notFoudEntryPlugin.js')
const AddFavIcoPlugin = require('./plugins/addFavIcoPlugin.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
let env = process.env.NODE_ENV
if(env){
    //除空格
    env = env.replace(/\s+/ig,'')
}
// let fs = require('fs')
// fs.writeFileSync('./aa.json',env)
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
function getExports(project){
    let entry = {}
    let cacheGroups = {}
    let plugins = []
    let alias = {}
    config.apps.forEach((app)=>{
        var dirName = ''
        if(env==='production'){
            if(config.apps.length>1){
                dirName = `${app}/`
            }
        }else{
            dirName = `${app}/`
        }
        alias[`@${app}`] = path.resolve(__dirname,`${config.mainDir}/${project}/${app}`)
        plugins.push(new HtmlWebpackPlugin({
            filename: `${dirName}index.html`,//真正输出的地址output.path+filename=./dist/index.html
            template:path.resolve(__dirname,`${config.mainDir}/${project}/${app}/index.html`),//INdex的模板
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
            chunks:[`${dirName}app`]//按需映入入口JS
        }))
    })
    let rules = []
    config.apps.forEach((app)=>{
        var dirName = ''
        if(config.apps.length>1){
            dirName = `${app}/`
        }
        //portal,center等app下的图片资源解析
        let reg  = new RegExp(`${app}\\\\images\\\\.+\\.(gif|png|jpg|svg|ttf|woff|mp4|swf|mp3|m4a)`)
        rules.push(
            {
                test:reg,
                use:{
                    loader:'url-loader',
                    options: {
                        // outputPath:`/${app}/images`,
                        publicPath:'/',
                        name:`${dirName}images/[name].[hash:8].[ext]`,
                        limit:1024*8//小于8KB会被转成base64
                    }
                },
                exclude:[path.resolve(__dirname,'..',config.dist),/node_modules/]//排除解析dist文件夹
                //include:[path.resolve('./projects/project1/src')]//只编译src文件夹 但是node_modules除外
            }
        )
    })


    return {
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
            // path.resolve(config.parentMainDir)
            modules: [path.resolve(__dirname,'..',"node_modules")/*path.resolve(`${config.mainDir}/${project}`)*/],
            //原本在文件夹里去找package.json只会找main和module现在fuck和shit也会去找优先级从左到右
            mainFields:['main','module','fuck','shit'], 
            //给引入的模块取个别名可以是文件全路径也可以是文件夹
            alias:Object.assign(alias,{
                '@parent':path.resolve(__dirname,config.parentMainDir),
                'vue$': 'vue/dist/vue.esm.js',
                'nms':path.resolve(__dirname,'..','node_modules')
            })
        },
        resolveLoader: {
            // alias: {
            //     testLoader:path.resolve('./loaders/testLoader.js')
            // },
            mainFields:['main'],
            modules: [path.resolve(__dirname,'..',""),path.resolve(__dirname,"loaders"),path.resolve(__dirname,"../node_modules")]
        },
        module:{
            //不去解析的文件node_modules
            // noParse: [/lwh\.js/],
            rules:rules.concat([

                {
                    test: /\.vue$/,
                    use: {
                        loader:'vue-loader'
                    }
                },
                {
                    test:/\.(md)$/,
                    //test: /\.(js)(\?.*)?$/,
                    use:{
                        loader:'strLoader'
                    },
                    exclude:[path.resolve(__dirname,'..',`${config.dist}`),/node_modules/],
                    include:[path.resolve(__dirname,`${config.mainDir}`),path.resolve(__dirname,`${config.parentMainDir}`)]
                },
                {
                    test:/\.(js|vue)$/,
                    //test: /\.(js)(\?.*)?$/,
                    use:{
                        loader:'notFoudLoader',
                        options:{
                            mainDir:config.mainDir.replace('../',''),
                            project:project
                        }
                    },
                    exclude:[path.resolve(__dirname,'..',config.dist),/node_modules/],
                    //exclude: file => (
                    //    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                    //),
                    include:[path.resolve(__dirname,`${config.mainDir}`),path.resolve(__dirname,`${config.parentMainDir}`)]
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
                {
                    //node_modules下的ttf和woff解析
                    test:/node_modules\\.+\.(gif|png|jpg|svg|ttf|woff|mp4|swf)/,
                    use:{
                        loader:'url-loader',
                        options: {
                            name:`images/[name].[hash:8].[ext]`,
                            publicPath:'/',
                            limit:1024*8//小于8KB会被转成base64
                        }
                    },
                    exclude:[path.resolve(__dirname,'..',`${config.dist}`)]//排除解析dist文件夹
                    //include:[path.resolve('./projects/project1/src')]//只编译src文件夹 但是node_modules除外
                },
                //解析打包json文件
                {
                    test:/\.json/i,
                    type: 'javascript/auto',
                    loader:'json-loader'
                }
            ])
        },
        optimization: {
            splitChunks: {
                cacheGroups:Object.assign(cacheGroups,{
                    vendor: {
                        //initial(初始块)、async(按需加载块)、 all(全部块)
                        chunks: 'all',
                        test:/[\\/]node_modules[\\/]/,
                        name: 'common/vendor',
                        priority: 10,
                        enforce: true,
                        // minChunks:1//最小被引用两次的公共库才被抽离到公共代码
                    }
                    //引用parent的assets另外写规则
                    //由于portal和center如果都引了assets会用一个导致会引入互相都没的代码故不用此策略
                    /*parentAssets : {
                        //initial(初始块)、async(按需加载块)、 all(全部块)
                        chunks: 'all',
                        test: /[\\/]assets[\\/]/,
                        // test: /assets/,
                        name: 'common/assets',
                        priority: 10,
                        enforce: true,
                        minChunks:1//最小被引用两次的公共库才被抽离到公共代码
                    }*/
                })
            },
            //抽取webpack运行文件代码
            runtimeChunk: {
                name: 'common/manifest'
            }
        },
        plugins: plugins.concat([
            /*new copyWebpackPlugin([
                {from:path.resolve(__dirname,`${config.mainDir}/${config.project}/portal/static`),to:path.resolve(__dirname,`./dist/${config.project}/portal/static`)}
            ])*/
            new VueLoaderPlugin(),
            //在这边配置全局引入后哪个模块不用require都可以用
            // new webpack.ProvidePlugin({
            //     $:path.resolve(__dirname,`${config.mainDir}/${project}/portal/assets/jquery-1.11.1.min.js`)
            // }),
            new CleanWebpackPlugin([path.resolve(__dirname,'..',config.dist,project)]),//删除文件夹插件
            //指定html位置指定后打包的js会自动被引入
            new ProgressBarPlugin(),
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
                            ],
                            [
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
            //开发环境一定有portal，生产环境apps长度大于1才有portal
            new webpack.DefinePlugin({
                multiApp:(config.apps.length>1||env!=='production')?true:false
            }),
            new AddFavIcoPlugin(),
            //服务端预渲染，适合静态页面
            // new PrerenderSPAPlugin({
            //     staticDir:path.resolve(__dirname,'..',config.dist,project),
            //     routes:['/home']
            // })
            //new MoveAssetsToDirPlugin()
        ])
    }
}


module.exports = getExports(config.project)