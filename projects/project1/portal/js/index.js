
console.log('当前是否开发环境'+dev);
console.log('project1的portal12121222222')
//require('style/style1.css');
//require('@/less/style1.less');
//let data1 = require('data/data1.js')
//let data2 = require('@/data/data2.js')
//console.log(data2);
//require('portal/assets/test.js')
require('portal/assets/vue.min.js')
let data1 = require('portal/data/data1.js')
console.log(data1);
//require('portal/assets/vueAll_dll.js')
if(module.hot){
    module.hot.accept();
}
