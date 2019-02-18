module.exports = loader
let path = require('path')
function loader(source){
    let moduleMatchs = []
    let requireMatchs = source.match(/require.*?\(.*?\)/g) || []
    let importMatchs = source.match(/import.*?from.*?('|").*?('|")/g) || []
    let projectBaseSrc = this.resourcePath.match(/(.+\\)projects\\/)[1]
    //console.log(projectBaseSrc);
    let project = this.resourcePath.replace(/.+\\projects\\/,'').split(path.sep)[0]
    //console.log(project);
    if(requireMatchs.length||importMatchs.length){
        moduleMatchs = moduleMatchs.concat(requireMatchs)
        moduleMatchs = moduleMatchs.concat(importMatchs)
        // console.log(moduleMatchs);
        moduleMatchs.forEach((item)=>{
            let filename = item.match(/['"](.*)['"]/g)[0].replace(/\//g,'\\').replace(/('|")/g,'')
            try{
                let requireUrl = require.resolve(filename)
                console.log(requireUrl,'node_modules');
            }catch(e){
                let fullFilePath = `${projectBaseSrc}projects\\${project}\\${filename}`
                try{
                    let requireUrl = require.resolve(fullFilePath)
                    console.log(requireUrl,'normal');
                }catch(err){
                    console.log(item,'err');
                    console.log(item.match(/['"](.*)['"]/)[1].replace('/','\\'));
                    let replaceStr = `${projectBaseSrc}parentProject\\${filename}`
                    replaceStr = replaceStr.replace(/\\/g,'\\\\')
                    console.log(replaceStr,'ee');
                    source = source.replace(filename,replaceStr)
                }
                //console.log(requireUrl,1212);
                //console.log('errrrrr');
            }
            //console.log(filename[0]);
        })
    }
    //console.log(this.context);
    // console.log(this.resourcePath);
    // console.log(path.sep,12);
    return source
}