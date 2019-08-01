var fs = require('fs')
var path = require('path')
class addFavIcoPlugin{
    constructor(options){

    }
    apply(compiler){
        var _this = this
        var favIcoContent = fs.readFileSync(path.resolve(__dirname,'../favicon.ico'))
        // console.log(path.resolve(__dirname,'../favicon.ico'))
        compiler.hooks.emit.tapAsync('addFavIcoPlugin',(compilation,cb)=>{
            // let fileContent = ``
            // Object.keys(compilation.assets).forEach((key)=>{
            //     fileContent+=`fileName:${key}    fileSize:${compilation.assets[key].size()}\r\n`
            // })
            //console.log(fileContent);
            // console.log(_this.project);
            compilation.assets['favicon.ico']={
                source(){
                    return favIcoContent
                },
                size(){
                    //获取字符串长度可把中文拆成字节
                    return Buffer.byteLength(favIcoContent)
                }
            }
            cb()

        })
    }
}
module.exports = addFavIcoPlugin