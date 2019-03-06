
console.log('当前是否开发环境'+dev);
import Vue from 'vue'
import App from '@portal/App.vue'
import router from '@portal/router/router'
import store from '@portal/store/store'
// import data from '@portal/data/data1.js'
// let $ = require('jquery');
// $.ajax({
//     method:'get',
//     url:'/portal/static/jsonData.json'
// }).then(function(data){
//     console.log(data);
// })
console.log(router);
new Vue({
    el:'#app',
    router,
    store,
    template:'<App/>',
    components:{App}
});

if(module.hot){
    module.hot.accept();
}
