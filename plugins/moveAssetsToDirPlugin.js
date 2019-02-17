/**
 * Created by Allen on 2019/2/12.
 */
/**
 * 把asset entry vendor manifest都分配到center或者portal里面去
 * 相应更改生成的index.html引资源的位置
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
class moveAssetsToDirPlugin{
    //处理manifest和vendor等通用的
    processCommon(itemTag,compilation){
        this.oldAssetFullFile = `js/${this.assetFileName}`
        this.assetFileFullName1 = `center/js/${this.assetFileName}`
        this.assetFileFullName2 = `portal/js/${this.assetFileName}`
        //console.log(compilation.assets[oldAssetFullFile],1212);
        compilation.assets[this.assetFileFullName1] = compilation.assets[this.oldAssetFullFile]
        compilation.assets[this.assetFileFullName2] = compilation.assets[this.oldAssetFullFile]
        if (compilation.assets[this.oldAssetFullFile + '.map']) {
            compilation.assets[this.assetFileFullName1 + '.map'] = compilation.assets[this.oldAssetFullFile + '.map']
            compilation.assets[this.assetFileFullName2 + '.map'] = compilation.assets[this.oldAssetFullFile + '.map']
        }
        itemTag.attributes.src = `$$$$dir$$$$/js/${this.assetFileName}${this.hash}`
        //console.log(src,1212);
        //console.log(this.HtmlWebpackPluginCount);
        //if (this.HtmlWebpackPluginCount === 2) {
        //    if(compilation.assets[this.oldAssetFullFile]){
        //        delete compilation.assets[this.oldAssetFullFile]
        //    }
        //    if (compilation.assets[this.oldAssetFullFile + '.map']) {
        //        delete compilation.assets[this.oldAssetFullFile + '.map']
        //    }
        //}
    }
    //处理assets下的文件
    processAssets(dir,itemTag,compilation){
        this.oldAssetFullFile = `js/${dir}/${this.assetFileName}`
        this.assetFileFullName = `${dir}/js/${this.assetFileName}`
        itemTag.attributes.src = this.assetFileFullName+this.hash
        compilation.assets[this.assetFileFullName] = compilation.assets[this.oldAssetFullFile]
        if(compilation.assets[this.oldAssetFullFile+'.map']){
            compilation.assets[this.assetFileFullName+'.map'] = compilation.assets[this.oldAssetFullFile+'.map']
            delete compilation.assets[this.oldAssetFullFile+'.map']
        }
        if(compilation.assets[this.oldAssetFullFile]){
            delete compilation.assets[this.oldAssetFullFile]
        }
    }
    //处理入口文件
    processEntry(dir,itemTag,compilation){
        this.oldAssetFullFile = `js/${this.assetFileName}`
        this.assetFileFullName = `${dir}/js/${this.assetFileName}`
        itemTag.attributes.src = this.assetFileFullName + this.hash
        compilation.assets[this.assetFileFullName] = compilation.assets[this.oldAssetFullFile]
        if (compilation.assets[this.oldAssetFullFile + '.map']) {
            compilation.assets[this.assetFileFullName + '.map'] = compilation.assets[this.oldAssetFullFile + '.map']
            delete compilation.assets[this.oldAssetFullFile + '.map']
        }
        if(compilation.assets[this.oldAssetFullFile]){
            delete compilation.assets[this.oldAssetFullFile]
        }
    }
    apply(compiler){
        compiler.hooks.compilation.tap('moveAssetsToDirPlugin',(compilation)=>{
            let portalReg1 = /([\\/]portal[\\/])/
            let portalReg2 = /([\\/]portal\.)/
            let centerReg1 = /([\\/]center[\\/])/
            let centerReg2 = /([\\/]center\.)/
            let vendorReg = /([\\/]vendor\.)/
            let manifestReg = /([\\/]manifest\.)/
            let hotUpdateReg = /hot-update/
            this.HtmlWebpackPluginCount = 0
            this.vendorLoadObj = {count:0}
            this.maniFestLoadObj = {count:0}
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'alterAssetTagGroups',
                (data, cb) => {
                    //Object.keys(compilation.assets).forEach((itemAsset)=>{
                    //    console.log(itemAsset);
                    //})
                    //console.log(222222222);
                    this.HtmlWebpackPluginCount++
                    console.log(this.HtmlWebpackPluginCount);
                    data.bodyTags.forEach((itemTag)=>{
                        // console.log(itemTag);
                        let tagSrcReg = /.+\?(.+)/
                        let src = itemTag.attributes.src
                        console.log(src,this.HtmlWebpackPluginCount);
                        let beforeHashSrc = itemTag.attributes.src.replace(/\?(.+)/,'')
                        this.hash = src.match(tagSrcReg)?'?'+src.match(tagSrcReg)[1]:''
                        // console.log(hash);
                        this.assetFileName = beforeHashSrc.split('/').pop()
                        //let assetFileFullName,oldAssetFullFile,assetFileFullName1,assetFileFullName2
                        if(portalReg1.test(src)){
                            this.processAssets('portal',itemTag,compilation)
                        }else if(portalReg2.test(src)&&!hotUpdateReg.test(src)){
                            this.processEntry('portal',itemTag,compilation)
                        } else if(centerReg1.test(src)){
                            this.processAssets('center',itemTag,compilation)
                        }else if(centerReg2.test(src)&&!hotUpdateReg.test(src)){
                            this.processEntry('center',itemTag,compilation)
                        }else if(vendorReg.test(src)){
                            //console.log(222222);
                            //this.oldAssetFullFile = `js/${this.assetFileName}`
                            this.processCommon(itemTag,compilation)
                            this.vendorLoadObj.fullFile = this.oldAssetFullFile
                            this.vendorLoadObj.count ++
                        }else if(manifestReg.test(src)){
                            this.processCommon(itemTag,compilation)
                            this.maniFestLoadObj.fullFile = this.oldAssetFullFile
                            this.maniFestLoadObj.count ++
                        } else{

                        }
                    })
                    //console.log(this.vendorLoadObj.count,'vvvvv');
                    //console.log(this.maniFestLoadObj.count,'mmmmm');
                    if (this.HtmlWebpackPluginCount===2&&(this.vendorLoadObj.count===1||this.vendorLoadObj.count===2)) {
                        console.log(this.vendorLoadObj.count,'vvvvv');
                        if(compilation.assets[this.vendorLoadObj.fullFile]){
                            delete compilation.assets[this.vendorLoadObj.fullFile]
                        }
                        if (compilation.assets[this.vendorLoadObj.fullFile+'map']) {
                            delete compilation.assets[this.vendorLoadObj.fullFile+'map']
                        }
                    }
                    if (this.HtmlWebpackPluginCount===2&&this.maniFestLoadObj.count===2) {
                        console.log(this.maniFestLoadObj.count,'mmmmm');
                        if(compilation.assets[this.maniFestLoadObj.fullFile]){
                            delete compilation.assets[this.maniFestLoadObj.fullFile]
                        }
                        if (compilation.assets[this.maniFestLoadObj.fullFile+'map']) {
                            delete compilation.assets[this.maniFestLoadObj.fullFile+'map']
                        }
                    }
                    cb(null, data)
                }
            )
            // beforeEmit
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                'beforeEmit',
                (data, cb) => {
                    function replace(which){
                        let reg = new RegExp(which,'img')
                        if(reg.test(data.plugin.options.filename)){
                            // console.log(data.html);
                            data.html = data.html.replace(/\$\$\$\$dir\$\$\$\$/ig,which)
                        }
                    }
                    replace('portal')
                    replace('center')
                    cb(null, data)
                }
            )
        })
    }
}
module.exports = moveAssetsToDirPlugin