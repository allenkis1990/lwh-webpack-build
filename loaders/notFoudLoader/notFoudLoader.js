module.exports = loader
let path = require('path')
function loader(source){
    let moduleMatchs = []
    let requireMatchs = source.match(/require.*?\(.*?\)/g) || []
    let importMatchs = source.match(/import.*?from.*?('|").*?('|")/g) || []
    //let projectBaseSrc = this.resourcePath.match(/(.+\\)projects\\/)[1]
    //console.log(projectBaseSrc);
    let project = this.resourcePath.replace(/.+\\projects\\/,'').split(path.sep)[0]
    //console.log(project);
    if(requireMatchs.length||importMatchs.length){
        let alias = require('../../webpack.pro.config.js').resolve.alias
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
                    console.log(aa,'normal');
                }catch (e){
                    console.log(fullPath,'err')
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