/**
 * Created by admin on 2019/2/10.
 */
//删除dist文件夹
//循环主文件夹projects得到子文件夹 有多少个就构建多少次
//替换package.json里key为replace的value值
let argv = require('yargs').argv
//console.log(argv);
let fs = require('fs')
let colors = require('colors/safe');


const rimraf = require('rimraf');
rimraf('./dist', function (err) {
    if(err){
        console.log(colors.red(err));
    } else {
        fs.mkdirSync('./dist')
        //let command = 'replace'
        //let reg = new RegExp(`"${command}".+,`)
        let result = ''
        let dirs
        try {dirs = fs.readdirSync('./projects')}catch(e){
            throw new Error(colors.red('项目主文件夹projects没建！！！'))
            //console.log(colors.red('项目主文件夹projects没建！！！'));
            return
        }
        fs.readFile('./webpack.pro.config.js', 'utf-8', function (err, data) {
            //console.log(data);
            let reg = /module\.exports.+\)/ig
            console.log(dirs);
            let codeStr = ''
            //getExports(config.project)
            dirs.forEach((dir,index)=>{
                if(index!==dirs.length-1){
                    codeStr+=`getExports('${dir}'),`
                } else {
                    codeStr+=`getExports('${dir}')`
                }
            })
            data = data.replace(reg,`module.exports= [${codeStr}]`)
            //console.log(data);
            fs.writeFileSync('./webpack.buildAll.config.js', data)
        })
    }
});
