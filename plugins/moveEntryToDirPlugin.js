/**
 * Created by admin on 2019/2/12.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
class moveEntryToDirPlugin{
    apply(compiler){
        compiler.hooks.compilation.tap('moveEntryToDirPlugin',(compilation)=>{

            Object.keys(compilation.assets).forEach((item)=>{
                //console.log(item,121212);
                /*if(/portalEntry/.test(item)){
                    compilation.assets[`portal/${item}`] = compilation.assets[item]
                    //delete compilation.assets[item]
                }
                if(/centerEntry/.test(item)){
                    compilation.assets[`center/${item}`] = compilation.assets[item]
                    //delete compilation.assets[item]
                }*/
            })
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'alterAssetTagGroups',
                (data, cb) => {
                    //console.log(data,111);
                    data.bodyTags.forEach((itemTag)=>{
                        let portalReg = /portalEntry/
                        let centerReg = /centerEntry/

                        Object.keys(compilation.assets).forEach((itemAsset)=>{
                            if(itemTag.tagName==='script'&&portalReg.test(itemTag.attributes.src)&&portalReg.test(itemAsset)){
                                console.log(itemTag.attributes.src);
                                console.log(itemAsset);
                                itemTag.attributes.src = itemAsset
                                compilation.assets[`portal/${itemAsset}`] = compilation.assets[itemAsset]
                                delete compilation.assets[itemAsset]
                            }
                            if(itemTag.tagName==='script'&&centerReg.test(itemTag.attributes.src)&&centerReg.test(itemAsset)){
                                console.log(itemTag.attributes.src);
                                console.log(itemAsset);
                                itemTag.attributes.src = itemAsset
                                compilation.assets[`center/${itemAsset}`] = compilation.assets[itemAsset]
                                delete compilation.assets[itemAsset]
                            }
                        })
                    })
                    cb(null, data)
                }
            )
            //compilation.assets['center/centerEntry.de436a62.bundle.js'] = compilation.assets['centerEntry.de436a62.bundle.js']
            //delete compilation.assets['centerEntry.de436a62.bundle.js']
        })
    }
}
module.exports = moveEntryToDirPlugin