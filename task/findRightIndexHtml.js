/**
 * Created by admin on 2019/2/12.
 */
const fs = require('fs')
module.exports = function(config){
    let indexIsExist = fs.existsSync(config.indexPath)
    console.log('index是否存在：'+ indexIsExist);
    if (!indexIsExist) {
        config.indexPath = `./${config.parentProject}/src/index.html`
    }
}