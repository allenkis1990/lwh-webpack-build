
console.log('当前是否开发环境'+dev);
console.log('project1的9999999999')
require('jquery')
console.log('我是project1的portal')
let test = require('portal/assets/test.js')
console.log(test);
require('portal/style/color.css')
//let color = require('portal/style/style1.css')
//let color = require('E:\\webpack-test\\lwh-webpack-build\\parentProject\\portal\\style\\color.css')

//alert(color,1)


//let data = require('portal/data/require.js')
//alert(data.name);
if(module.hot){
    module.hot.accept();
}
