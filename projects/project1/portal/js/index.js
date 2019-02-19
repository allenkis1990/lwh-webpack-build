
console.log('当前是否开发环境'+dev);
console.log('project1的9999999999')
require('jquery')
console.log('我是project1的portal')
let data = require('@portal/assets/test.js')
let req = require('@portal/data/require.js')
alert(req.name);
if(module.hot){
    module.hot.accept();
}
