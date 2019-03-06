/**
 * Created by allen on 2019/2/12.
 * 找不到项目中的entry会去parent里面去找
 */
let config = require('../config/config.js')
let fs = require('fs')
let argv = require('yargs').argv
let colors = require('colors/safe');
let buildAll = argv.all
class notFoudEntryPlugin{
    constructor(options){
        this.mainDir = options.mainDir
        this.parentDir = options.parentDir
    }
    apply(compiler){
        console.log(this.mainDir,123);
        let _this = this
        function getDirs(){
            let dirs
            try {dirs = fs.readdirSync(_this.mainDir)}catch(e){
                throw new Error(colors.red(`项目主文件夹${_this.mainDir.replace('./','')}没建！！！`))
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
        compiler.hooks.entryOption.tap('notFoudEntryPlugin',(context,entry)=>{
            let appIsExist = {}
            if(!buildAll){
                config.apps.forEach((app)=>{
                    appIsExist[app+'IsExist'] = fs.existsSync(`${_this.mainDir}/${config.project}/${app}/main.js`)
                    if (!appIsExist[app+'IsExist']) {
                        entry[app] = [`${_this.parentDir}/${app}/main.js`]
                    }
                })
            } else {
                let dirs = getDirs()
                dirs.forEach((dir)=>{
                    config.apps.forEach((app)=>{
                        appIsExist[app+'IsExist'] = fs.existsSync(`${_this.mainDir}/${dir}/${app}/main.js`)
                        if (!appIsExist[app+'IsExist']) {
                            entry[app] = [`${_this.parentDir}/${app}/main.js`]
                        }
                    })
                })
            }
            //console.log(config);
            //console.log('context',context);
            //entry.main=['./parentProject/src/js/index.js']
            //console.log('entry',entry);
        })
    }
}
module.exports = notFoudEntryPlugin