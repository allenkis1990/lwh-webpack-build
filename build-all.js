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
        let command = 'replace'
        let reg = new RegExp(`"${command}".+,`)
        let result = ''
        let dirs
        try {dirs = fs.readdirSync('./projects')}catch(e){
            throw new Error(colors.red('项目主文件夹projects没建！！！'))
            //console.log(colors.red('项目主文件夹projects没建！！！'));
            return
        }
        // console.log(dirs);
        dirs.forEach((dir,index)=>{
            if(index!==dirs.length-1){
                result+=`webpack --mode production --config webpack.pro.config.js --project=${dir}&&`
            } else {
                result+=`webpack --mode production --config webpack.pro.config.js --project=${dir}`
            }
        })
        console.log(colors.green(`正在执行node指令：${result}  >>>>>>>>>>>>>>>>>>>>>>`));
        fs.readFile('./package.json','utf-8',function(err,data){
            let newData = data.replace(reg,`"${command}":"${result}",`)
            //把要替换的内容重新写入package.json
            fs.writeFileSync('./package.json',newData)
        })
    }
});
