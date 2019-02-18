module.exports = loader
let path = require('path')
function loader(source){
    let moduleMatchs = []
    let requireMatchs = source.match(/require.*?\(.*?\)/g) || []
    let importMatchs = source.match(/import.*?from.*?('|").*?('|")/g) || []
    if(requireMatchs.length||importMatchs.length){
        moduleMatchs = moduleMatchs.concat(requireMatchs)
        moduleMatchs = moduleMatchs.concat(importMatchs)
        // console.log(moduleMatchs);
        moduleMatchs.forEach((item)=>{
            let filename = item.match(/['"](.*)['"]/g)
            console.log(filename[0]);
        })
    }
    let project = this.resourcePath.replace(/.+\\projects\\/,'').split(path.sep)[0]
    // console.log(project);
    // console.log(this.resourcePath);
    // console.log(path.sep,12);
    return source
}