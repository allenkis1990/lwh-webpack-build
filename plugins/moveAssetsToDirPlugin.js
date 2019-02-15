/**
 * Created by Allen on 2019/2/12.
 */
/**
 * 把asset entry vendor manifest都分配到center或者portal里面去
 * 相应更改生成的index.html引资源的位置
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
class moveAssetsToDirPlugin{
    apply(compiler){
        compiler.hooks.compilation.tap('moveAssetsToDirPlugin',(compilation)=>{
            let portalReg1 = /([\\/]portal[\\/])/
            let portalReg2 = /([\\/]portal\.)/
            let centerReg1 = /([\\/]center[\\/])/
            let centerReg2 = /([\\/]center\.)/
            let vendorReg = /([\\/]vendor\.)/
            let manifestReg = /([\\/]manifest\.)/
            let HtmlWebpackPluginCount = 0
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'alterAssetTagGroups',
                (data, cb) => {
                    //Object.keys(compilation.assets).forEach((itemAsset)=>{
                    //    console.log(itemAsset);
                    //})
                    HtmlWebpackPluginCount++
                    data.bodyTags.forEach((itemTag)=>{
                        // console.log(itemTag);
                        let tagSrcReg = /.+\?(.+)/
                        let src = itemTag.attributes.src
                        let beforeHashSrc = itemTag.attributes.src.replace(/\?(.+)/,'')
                        let hash = src.match(tagSrcReg)?'?'+src.match(tagSrcReg)[1]:''
                        // console.log(hash);
                        let assetFileName = beforeHashSrc.split('/').pop()
                        let assetFileFullName,oldAssetFullFile,assetFileFullName1,assetFileFullName2
                        //处理assets下的文件
                        function processAssets(dir){
                            oldAssetFullFile = `js/${dir}/${assetFileName}`
                            assetFileFullName = `${dir}/js/${assetFileName}`
                            itemTag.attributes.src = assetFileFullName+hash
                            compilation.assets[assetFileFullName] = compilation.assets[oldAssetFullFile]
                            if(compilation.assets[oldAssetFullFile+'.map']){
                                compilation.assets[assetFileFullName+'.map'] = compilation.assets[oldAssetFullFile+'.map']
                                delete compilation.assets[oldAssetFullFile+'.map']
                            }
                            delete compilation.assets[oldAssetFullFile]
                        }
                        //处理入口文件
                        function processEntry(dir){
                            oldAssetFullFile = `js/${assetFileName}`
                            assetFileFullName = `${dir}/js/${assetFileName}`
                            itemTag.attributes.src = assetFileFullName+hash
                            compilation.assets[assetFileFullName] = compilation.assets[oldAssetFullFile]
                            if(compilation.assets[oldAssetFullFile+'.map']){
                                compilation.assets[assetFileFullName+'.map'] = compilation.assets[oldAssetFullFile+'.map']
                                delete compilation.assets[oldAssetFullFile+'.map']
                            }
                            delete compilation.assets[oldAssetFullFile]
                        }
                        //处理manifest和vendor等通用的
                        function processCommon(){
                            oldAssetFullFile = `js/${assetFileName}`
                            assetFileFullName1 = `center/js/${assetFileName}`
                            assetFileFullName2 = `portal/js/${assetFileName}`
                            //console.log(compilation.assets[oldAssetFullFile],1212);
                            compilation.assets[assetFileFullName1] = compilation.assets[oldAssetFullFile]
                            compilation.assets[assetFileFullName2] = compilation.assets[oldAssetFullFile]
                            if(compilation.assets[oldAssetFullFile+'.map']){
                                compilation.assets[assetFileFullName1+'.map'] = compilation.assets[oldAssetFullFile+'.map']
                                compilation.assets[assetFileFullName2+'.map'] = compilation.assets[oldAssetFullFile+'.map']
                            }
                            itemTag.attributes.src = `$$$$dir$$$$/js/${assetFileName}${hash}`
                            //console.log(src,1212);
                            if(HtmlWebpackPluginCount===2){
                                delete compilation.assets[oldAssetFullFile]
                                if(compilation.assets[oldAssetFullFile+'.map']){
                                    delete compilation.assets[oldAssetFullFile+'.map']
                                }
                            }
                        }
                        if(portalReg1.test(src)){
                            processAssets('portal')
                        }else if(portalReg2.test(src)){
                            processEntry('portal')
                        } else if(centerReg1.test(src)){
                            processAssets('center')
                        }else if(centerReg2.test(src)){
                            processEntry('center')
                        }else if(vendorReg.test(src)){
                            processCommon()
                        } else if(manifestReg.test(src)){
                            processCommon()
                        } else{

                        }

                    })
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