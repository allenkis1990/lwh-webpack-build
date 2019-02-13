/**
 * Created by Allen on 2019/2/11.
 */

let argv = require('yargs').argv
let fs = require('fs')
let colors = require('colors/safe');
let dirs
let _project
if(argv.project&&typeof argv.project==='string'){
    dirs = getDirs()
    if(dirs){
        if(dirs.indexOf(argv.project)===-1){
            throw new Error(colors.red('当前要构建的项目不存在'))
            //console.log(colors.red('当前要构建的项目不存在'));
        }
    }
    _project = argv.project
} else {
    dirs = getDirs()
    if(dirs){
        //找不到project这个参数默认找主文件夹下的第一个项目
        _project = dirs[0]
    }
}
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
console.log(colors.green(`当前项目：'${_project}   >>>>>>>>>>>>>>>>>>>>>>>>>`));
module.exports = {
    projectPath:'./projects/'+_project,
    project:_project,
    parentProject:'parentProject',
    indexPath:'./projects/'+_project+'/src/index.html',
    portal:'portal',
    center:'center'
}