
console.log('当前是否开发环境'+dev);
import Vue from 'vue'
import App from '@portal/App.vue'
import data from '@portal/data.js'

console.log(data,111111111);
new Vue({
    el:'#app',
    template:'<App/>',
    components:{App}
});

if(module.hot){
    module.hot.accept();
}
