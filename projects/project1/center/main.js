
console.log('当前是否开发环境'+dev);
console.log('我是project1的center')
require('@center/style/style1.css')
require('@center/assets/test.js')

let $ = require('jquery');
$.ajax({
    method:'get',
    url:'/center/static/jsonData.json'
}).then(function(data){
    console.log(data);
})

if(module.hot){
    module.hot.accept();
}

