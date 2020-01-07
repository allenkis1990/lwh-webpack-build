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
let path = require('path')
if(argv.project&&typeof argv.project==='string'){
    dirs = getDirs()
    // console.log(dirs,33);
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
    try {dirs = fs.readdirSync(path.resolve(__dirname,'..','..',`${projects}`))}catch(e){
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
    mainDir:!argv.design?'../projects':'../design',
    parentMainDir:!argv.design?'../parentProject':'../designParent',
    project:_project,
    dist:'dist',
    //port:!argv.design?'8080':'8181',
    port:'9999',
    designPort:'8181',
    // apps:['portal','center'],
    apps:['portal'],
    host:'127.0.0.1',
     // host:'192.168.28.253',
    dev:{
        publicPath:'/'
    },
    build:{
        publicPath:'/'
    },
    mockUrl:path.resolve(__dirname,'../mock',_project,'index.js'),
    proxyList : {
        '/actions': {
            target: 'http://127.0.0.1:8787/'
            // changeOrigin: false
        },
        '/socket.io': {
            target: 'http://192.168.28.248:8080/'
            // changeOrigin: false
        }
    }
}
if(argv.design){
    config.port = config.designPort;
}
if(!argv.devdist){
    deleteDist(config)
}
module.exports = config