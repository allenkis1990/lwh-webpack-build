module.exports = loader
let path = require('path')
let buildAll = require('yargs').argv.all
function findCurrentWebpackConfig(configArr){
    let currentWebpackConfig = configArr.find((config)=>{
        return config.output.path.includes(project)
    })
    return currentWebpackConfig
}

function loader(source){
    let moduleMatchs = []
    let requireMatchs = source.match(/require.*?\(.*?\)/g) || []
    let importMatchs = source.match(/import.*?from.*?('|").*?('|")/g) || []
    //let projectBaseSrc = this.resourcePath.match(/(.+\\)projects\\/)[1]
    //console.log(projectBaseSrc);
    let project = this.resourcePath.replace(/.+\\projects\\/,'').split(path.sep)[0]
    //console.log(project);
    if(requireMatchs.length||importMatchs.length){
        let alias
        if(!buildAll){
            //非build-all的时候就直接取alias
            alias = require('../../webpack.pro.config.js').resolve.alias
        } else {
            //build-all的时候根据是哪个project来取相应的alias
            let webpackConfigArr = require('../../webpack.buildAll.config.js')
            let currentWebpackConfig = findCurrentWebpackConfig(webpackConfigArr)
            // console.log(currentWebpackConfig,3333);
            if(currentWebpackConfig){
                alias = currentWebpackConfig.resolve.alias
                // console.log(alias,12311);
            }
        }
        //console.log(alias);
        moduleMatchs = moduleMatchs.concat(requireMatchs)
        moduleMatchs = moduleMatchs.concat(importMatchs)
        moduleMatchs.forEach((item)=>{
            let filePath = item.match(/['"](.*)['"]/g)[0].replace(/('|")/g,'')
            let aliasKeys = Object.keys(alias)
            let aliasKeysIndex = aliasKeys.indexOf(filePath.split('/')[0])
            if(aliasKeysIndex>-1){
                let aliasKey = aliasKeys[aliasKeysIndex]
                let aliasKeyPath = alias[aliasKey]
                let path = filePath.replace(aliasKey,'')
                let fullPath = aliasKeyPath + path.replace(/\//g,'\\')
                try{
                    let aa = require.resolve(fullPath)
                    // console.log(aa,'normal');
                }catch (e){
                    // console.log(fullPath,'err')
                    let parentPath = `@parent/${aliasKey.replace('@','')}${path}`
                    //console.log(parentPath);
                    source = source.replace(filePath,parentPath)
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
            console.log(filePath,12);
        })
    }
    //console.log(this.context);
    // console.log(this.resourcePath);
    // console.log(path.sep,12);
    return source
}