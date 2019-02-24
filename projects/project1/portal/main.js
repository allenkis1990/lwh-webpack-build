
console.log('当前是否开发环境'+dev);
import Vue from 'vue'
import App from '@portal/App.vue'


new Vue({
    el:'#app',
    template:'<App/>',
    components:{App}
});

if(module.hot){
    module.hot.accept();
}
