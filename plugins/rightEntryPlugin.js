/**
 * Created by admin on 2019/2/12.
 */
let config = require('../config/config.js')
let fs = require('fs')
let argv = require('yargs').argv
let colors = require('colors/safe');
let buildAll = argv.all
class rightEntryPlugin{
    apply(compiler){
        function getDirs(){
            let dirs
            try {dirs = fs.readdirSync('./projects')}catch(e){
                throw new Error(colors.red('项目主文件夹projects没建！！！'))
                //console.log(colors.red('项目主文件夹projects没建！！！'));
                return
            }
            if(!dirs.length){
                throw new Error(colors.red('没有子项目文件夹!!!!'))
                //console.log(colors.red('没有子项目文件夹!!!!'));
                return
            }
            return dirs
        }
        compiler.hooks.entryOption.tap('rightEntryPlugin',(context,entry)=>{
            if(!buildAll){
                let portalIsExist = fs.existsSync(`${config.mainDir}/${config.project}/portal/js/index.js`)
                let centerIsExist = fs.existsSync(`${config.mainDir}/${config.project}/center/js/index.js`)
                if (!portalIsExist) {
                    entry.portal = [`${config.parentMainDir}/portal/js/index.js`]
                }
                if (!centerIsExist) {
                    entry.center = [`${config.parentMainDir}/center/js/index.js`]
                }
            } else {
                let dirs = getDirs()
                dirs.forEach((dir)=>{
                    let portalIsExist = fs.existsSync(`${config.mainDir}/${dir}/portal/js/index.js`)
                    let centerIsExist = fs.existsSync(`${config.mainDir}/${dir}/center/js/index.js`)
                    if (!portalIsExist) {
                        entry.portal = [`${config.parentMainDir}/portal/js/index.js`]
                    }
                    if (!centerIsExist) {
                        entry.center = [`${config.parentMainDir}/center/js/index.js`]
                    }
                    // console.log(entry,'entry');
                })
            }
            //console.log(config);
            //console.log('context',context);
            //entry.main=['./parentProject/src/js/index.js']
            //console.log('entry',entry);
        })
    }
}
module.exports = rightEntryPlugin