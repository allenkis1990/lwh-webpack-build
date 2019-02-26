
console.log('当前是否开发环境'+dev);
import Vue from 'vue'
import App from '@portal/App.vue'
import router from '@portal/router/router.js'
console.log(router);
new Vue({
    el:'#app',
    router,
    template:'<App/>',
    components:{App}
});

if(module.hot){
    module.hot.accept();
}
