
console.log('当前是否开发环境'+dev);

console.log('我是project2的portal')
require('portal/style/style1.css')
require('jquery')
let test = require('portal/assets/test.js')
console.log(test);
if(module.hot){
    module.hot.accept();
}
