/**
 * Created by allen on 2019/3/10.
 */
let fs = require('fs')
let path = require('path')
module.exports = function(designDir,project){
    let baseDir =  path.resolve(__dirname,`../${designDir.replace('./','')}/${project}`)
    fs.readdir(baseDir,(err,apps)=>{
        if(err){
            console.log(err);
        } else {
            //console.log(apps,121212);
            apps.forEach((app)=>{
                let appPath = path.join(baseDir,app)
                let views = fs.readdirSync(`${appPath}/views`)
                let vueMapperContent = ''
                let exportContent = 'export default { '
                views.forEach((view,index)=>{
                    if(/\.vue$/.test(view)){
                        let viewName = view.replace('.vue','')
                        vueMapperContent += `import ${viewName} from '@${app}/views/${view}';`
                        exportContent += `${viewName}${index===views.length-1?'':','}`
                    }
                })
                exportContent += ` }`
                vueMapperContent +=  `\n${exportContent}`
                //console.log(vueMapperContent,111222);
                fs.writeFileSync(path.join(appPath,'vueMapper.js'),vueMapperContent)
            })
        }
    })
}
