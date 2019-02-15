/**
 * Created by admin on 2019/2/12.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
class moveEntryToDirPlugin{
    apply(compiler){
        compiler.hooks.compilation.tap('moveEntryToDirPlugin',(compilation)=>{
            let portalReg1 = /([\\/]portal[\\/])/
            let portalReg2 = /([\\/]portal\.)/
            let centerReg1 = /([\\/]center[\\/])/
            let centerReg2 = /([\\/]center\.)/
            let vendorReg = /([\\/]vendor\.)/
            let manifestReg = /([\\/]manifest\.)/
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'alterAssetTagGroups',
                (data, cb) => {
                    Object.keys(compilation.assets).forEach((itemAsset)=>{
                        console.log(itemAsset);
                    })
                    data.bodyTags.forEach((itemTag)=>{
                        // console.log(itemTag);
                        let tagSrcReg = /.+\?(.+)/
                        let src = itemTag.attributes.src
                        let beforeHashSrc = itemTag.attributes.src.replace(/\?(.+)/,'')
                        let hash = src.match(tagSrcReg)?src.match(tagSrcReg)[1]:''
                        // console.log(hash);
                        let assetFileName = beforeHashSrc.split('/').pop()
                        let assetFileFullName,oldAssetFullFile,assetFileFullName1,assetFileFullName2
                        if(portalReg1.test(src)){
                            oldAssetFullFile = `js/portal/${assetFileName}`
                            assetFileFullName = `portal/js/${assetFileName}`
                            itemTag.attributes.src = assetFileFullName
                            compilation.assets[assetFileFullName] = compilation.assets[oldAssetFullFile]
                            delete compilation.assets[oldAssetFullFile]
                        }else if(portalReg2.test(src)){
                            oldAssetFullFile = `js/${assetFileName}`
                            assetFileFullName = `portal/js/${assetFileName}`
                            itemTag.attributes.src = assetFileFullName
                            compilation.assets[assetFileFullName] = compilation.assets[oldAssetFullFile]
                            delete compilation.assets[oldAssetFullFile]
                        } else if(centerReg1.test(src)){
                            oldAssetFullFile = `js/center/${assetFileName}`
                            assetFileFullName = `center/js/${assetFileName}`
                            itemTag.attributes.src = assetFileFullName
                            compilation.assets[assetFileFullName] = compilation.assets[oldAssetFullFile]
                            delete compilation.assets[oldAssetFullFile]
                        }else if(centerReg2.test(src)){
                            oldAssetFullFile = `js/${assetFileName}`
                            assetFileFullName = `center/js/${assetFileName}`
                            itemTag.attributes.src = assetFileFullName
                            compilation.assets[assetFileFullName] = compilation.assets[oldAssetFullFile]
                            delete compilation.assets[oldAssetFullFile]
                        }
                        /*else if(vendorReg.test(src)){
                            oldAssetFullFile = `js/${assetFileName}`
                            assetFileFullName1 = `center/js/${assetFileName}`
                            assetFileFullName2 = `portal/js/${assetFileName}`
                            compilation.assets[assetFileFullName1] = compilation.assets[oldAssetFullFile]
                            compilation.assets[assetFileFullName2] = compilation.assets[oldAssetFullFile]
                            itemTag.attributes.src = `$$$$dir$$$$/js/${assetFileName}`
                            delete compilation.assets[oldAssetFullFile]
                        } else if(manifestReg.test(src)){
                            oldAssetFullFile = `js/${assetFileName}`
                            assetFileFullName1 = `center/js/${assetFileName}`
                            assetFileFullName2 = `portal/js/${assetFileName}`
                            compilation.assets[assetFileFullName1] = compilation.assets[oldAssetFullFile]
                            compilation.assets[assetFileFullName2] = compilation.assets[oldAssetFullFile]
                            itemTag.attributes.src = `$$$$dir$$$$/js/${assetFileName}`
                            delete compilation.assets[oldAssetFullFile]
                        } else{

                        }*/

                        /*Object.keys(compilation.assets).forEach((itemAsset)=>{
                            if(/(\.js)$/.test(itemAsset)){
                                let newAssetUrl1,newAssetUrl2,newAssetUrl
                                let assetFileName = itemAsset.split('/').pop()
                                let assetFileNameReg = new RegExp(assetFileName)
                                function processNormalAssets(dir) {
                                    newAssetUrl = `${dir}/js/${assetFileName}`
                                    itemTag.attributes.src = `${newAssetUrl}?${hash}`
                                    compilation.assets[newAssetUrl] = compilation.assets[itemAsset]
                                    if(compilation.assets[itemAsset+'.map']){
                                        compilation.assets[newAssetUrl+'.map'] = compilation.assets[itemAsset+'.map']
                                    }
                                    // delete compilation.assets[itemAsset]
                                    // delete compilation.assets[itemAsset+'.map']
                                }
                                function processCommonAssets(){
                                    newAssetUrl1 = `portal/js/${assetFileName}`
                                    newAssetUrl2 = `center/js/${assetFileName}`
                                    itemTag.attributes.src = `$$$$dir$$$$/js/${assetFileName}?${hash}`
                                    compilation.assets[newAssetUrl1] = compilation.assets[itemAsset]
                                    compilation.assets[newAssetUrl2] = compilation.assets[itemAsset]
                                    if(compilation.assets[itemAsset+'.map']){
                                        compilation.assets[newAssetUrl1+'.map'] = compilation.assets[itemAsset+'.map']
                                        compilation.assets[newAssetUrl2+'.map'] = compilation.assets[itemAsset+'.map']
                                    }
                                    // delete compilation.assets[itemAsset]
                                    // delete compilation.assets[itemAsset+'.map']
                                }
                                // console.log(src);
                                if(assetFileNameReg.test(src)&&portalReg.test(src)){
                                    processNormalAssets('portal')
                                    // console.log(itemAsset);
                                }
                                if(assetFileNameReg.test(src)&&centerReg.test(src)){
                                    // console.log(src);
                                    // console.log(assetFileNameReg);
                                    processNormalAssets('center')
                                }
                                console.log(itemAsset);
                                if(assetFileNameReg.test(src)&&vendorReg.test(src)){
                                    processCommonAssets()
                                }
                                if(assetFileNameReg.test(src)&&manifestReg.test(src)){
                                    processCommonAssets()
                                }
                            }
                        })*/
                    })
                    //删除之前的js和jsmap assets
                    // Object.keys(compilation.assets).forEach((itemAsset)=>{
                    //     if(/(\.js|\.js\.map)$/.test(itemAsset)){
                    //         if(itemAsset.split('/').shift()!=='center'&&itemAsset.split('/').shift()!=='portal'){
                    //             delete compilation.assets[itemAsset]
                    //         }
                    //     }
                    //     console.log(itemAsset);
                    // })
                    //console.log(data,111);
                    cb(null, data)
                }
            )
            // beforeEmit
            /*HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
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
            )*/
        })
    }
}
module.exports = moveEntryToDirPlugin