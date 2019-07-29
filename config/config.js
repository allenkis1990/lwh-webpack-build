/**
 * Created by allen on 2019/2/11.
 */
let argv = require('yargs').argv
let fs = require('fs')
let colors = require('colors/safe');
let dirs
let _project
let isBuildAll = argv.all
let projects = !argv.design?'projects':'design'
let deleteDist = require('../task/deleteDist')
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
    try {dirs = fs.readdirSync(`./${projects}`)}catch(e){
        throw new Error(colors.red('项目主文件夹没建！！！'))
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
if(!argv.devdist){
    if(!isBuildAll){
        console.log(colors.green(`现在开始构建项目：${_project}   >>>>>>>>>>>>>>>>>>>>>>>>>`));
    } else {
        console.log(colors.green(`现在开始构建${projects}下的所有项目   >>>>>>>>>>>>>>>>>>>>>>>>>`));
    }
}
let config = {
    isDesign:argv.design,
    mainDir:!argv.design?'./projects':'./design',
    parentMainDir:!argv.design?'./parentProject':'./designParent',
    project:_project,
    dist:'dist',
    //port:!argv.design?'8080':'8181',
    port:'8080',
    designPort:'8181',
    //apps:['portal','center'],
    apps:['portal'],
    // host:'127.0.0.1',
    host:'192.168.0.112',
    dev:{
        publicPath:'/'
    },
    build:{
        publicPath:'/'
    }
}
if(argv.design){
    config.port = config.designPort;
}
if(!argv.devdist){
    deleteDist(config)
}
module.exports = config