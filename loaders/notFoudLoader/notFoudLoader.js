module.exports = loader
let path = require('path')
let buildAll = require('yargs').argv.all
let loaderUtils = require('loader-utils')

function findCurrentWebpackConfig(configArr,project){
    let currentWebpackConfig = configArr.find((config)=>{
        return config.output.path.includes(project)
    })
    return currentWebpackConfig
}

function loader(source){
    // console.log(this.resourcePath,88888888888888);
    let options = loaderUtils.getOptions(this)
    let moduleMatchs = []
    //匹配require('xxx')
    let requireMatchs = source.match(/require.*?\(.*?\)/g) || []
    //匹配import xxx from 'xxx'
    let importMatchs = source.match(/import.*?from.*?('|").*?('|")/g) || []
    //匹配import(/* webpackChunkName: "portal/chunk/test3" */'@portal/views/test3/test3.vue')
    //或者import('@portal/views/test3/test3.vue')
    let importAsyncMatchs = source.match(/import.*?\((\/\*.*?\*\/)?.*?['"].*?['"].*?\)/g) || []
    //匹配@import 'xxx'
    let importStyleMatchs = source.match(/@import.*?['"].*?['"]/g) || []
    //匹配src = 'xxx'
    let srcMatchs = source.match(/src.*?=.*?['"].*?['"]/g) || []
    //匹配url('xxx')
    let bgMatchs = source.match(/url.*?\(.*?['"].*?['"].*?\)/g) || []
    //let projectBaseSrc = this.resourcePath.match(/(.+\\)projects\\/)[1]
    //console.log(projectBaseSrc);
    let project = this.resourcePath.replace(new RegExp(`.+\\\\${options.mainDir}\\\\`),'').split(path.sep)[0]
    //console.log(project);
    if(requireMatchs.length||importMatchs.length||importStyleMatchs.length||srcMatchs.length||bgMatchs.length||importAsyncMatchs.length){
        let alias
        if(!buildAll){
            //非build-all的时候就直接取alias
            alias = require('../../webpack.pro.config.js').resolve.alias
        } else {
            //build-all的时候根据是哪个project来取相应的alias
            let webpackConfigArr = require('../../webpack.buildAll.config.js')
            let currentWebpackConfig = findCurrentWebpackConfig(webpackConfigArr,project)
            // console.log(currentWebpackConfig,3333);
            if(currentWebpackConfig){
                alias = currentWebpackConfig.resolve.alias
                // console.log(alias,12311);
            }
        }
        //console.log(alias);
        moduleMatchs = moduleMatchs.concat(requireMatchs)
        moduleMatchs = moduleMatchs.concat(importMatchs)
        moduleMatchs = moduleMatchs.concat(importStyleMatchs)
        moduleMatchs = moduleMatchs.concat(srcMatchs)
        moduleMatchs = moduleMatchs.concat(bgMatchs)
        moduleMatchs = moduleMatchs.concat(importAsyncMatchs)
        moduleMatchs.forEach((item)=>{
            // console.log(item,'kkk');
            let filePath
            if(/\/\*.*?\*\//.test(item)){
                //import()有带/**/的情况
                filePath = item.match(/['"](.*?)['"]/g)[1].replace(/('|")/g,'')
            } else {
                //import()不带/**/的情况
                filePath = item.match(/['"](.*)['"]/g)[0].replace(/('|")/g,'')
            }
            // console.log(filePath,886);
            let aliasKeys = Object.keys(alias)
            let firstWord = filePath.split('/')[0]
            let aliasKeysIndex
            let parentAliasKey
            if(firstWord.indexOf('~')>-1){
                aliasKeysIndex = aliasKeys.indexOf(firstWord.replace('~',''))
                parentAliasKey = '~@parent'
            } else {
                aliasKeysIndex = aliasKeys.indexOf(firstWord)
                parentAliasKey = '@parent'
            }
            if(aliasKeysIndex>-1){
                let aliasKey = aliasKeys[aliasKeysIndex]
                let aliasKeyPath = alias[aliasKey]
                let path = filePath.replace((firstWord.indexOf('~')>-1?`~${aliasKey}`:aliasKey),'')
                let fullPath = aliasKeyPath + path.replace(/\//g,'\\')
                try{
                    let aa = require.resolve(fullPath)
                    // console.log(aa,'normal');
                }catch (e){
                    // console.log(fullPath,'err')
                    let parentPath = `${parentAliasKey}/${aliasKey.replace('@','')}${path}`
                    //console.log(parentPath);
                    source = source.replace(filePath,parentPath)
                    if(/\/\*.*?\*\//.test(item)){
                        console.log(source);
                    }
                }
                //console.log(fullPath);
            }

            //console.log(aliasKeys.indexOf(filePath.split('/')[0]),'index');
            //let app = filePath.match()
            //try{
            //
            //}catch(e){
            //
            //}
            // console.log(filePath,12);
        })
    }
    //console.log(this.context);
    // console.log(this.resourcePath);
    // console.log(path.sep,12);
    return source
}