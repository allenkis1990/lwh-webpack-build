/**
 * Created by admin on 2019/2/12.
 */
let webpackConfig = require('../webpack.dev.config.js')
class rightEntryIndexPlugin{
    apply(compiler){
        compiler.hooks.afterPlugins.tap('afterPlugins',(compiler)=>{

        })
    }
}
module.exports = rightEntryIndexPlugin