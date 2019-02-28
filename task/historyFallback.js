/**
 * Created by admin on 2019/2/12.
 */
let history = require('connect-history-api-fallback')
let config = require('../config/config.js')
function historyFallback(app){
    let rewrites = []
    config.apps.forEach((app)=>{
        let homeReg = new RegExp(`^\\/${app}$`)
        let otherPagesReg = new RegExp(`\\/portal\\/.+$`)
        rewrites.push({
            from:homeReg,
            to:function(){
                return `/${app}`
            }
        })
        rewrites.push({
            from:otherPagesReg,
            to:function(context){
                if(!/\..+/.test(context.parsedUrl.pathname)){
                    console.log(context.parsedUrl.pathname)
                    return `/${app}`;
                } else {
                    return context.parsedUrl.pathname
                }
            }
        })
    })
    app.use(history({
        //index:'/portal'
        rewrites: rewrites
    }))
}
module.exports = historyFallback
