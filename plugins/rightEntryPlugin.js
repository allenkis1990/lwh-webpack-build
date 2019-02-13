/**
 * Created by admin on 2019/2/12.
 */
let config = require('../config/config.js')
let fs = require('fs')
class rightEntryPlugin{
    apply(compiler){
        compiler.hooks.entryOption.tap('rightEntryPlugin',(context,entry)=>{
            //console.log(config);
            let portalIsExist = fs.existsSync(config.projectPath+'/portal/js/index.js')
            let centerIsExist = fs.existsSync(config.projectPath+'/center/js/index.js')
            if(!portalIsExist){
                entry.portalEntry=[`./${config.parentProject}/portal/js/index.js`]
            }
            if(!centerIsExist){
                entry.centerEntry=[`./${config.parentProject}/center/js/index.js`]
            }
            //console.log('context',context);
            //entry.main=['./parentProject/src/js/index.js']
            //console.log('entry',entry);
        })
    }
}
module.exports = rightEntryPlugin