
console.log('当前是否开发环境'+dev);
//全局ajax拦截器
import interceptors from '@portal/utils/interceptors'
import Vue from 'vue'
import App from '@portal/App.vue'
import router from '@portal/router/router'
import store from '@portal/store/store'
import axios from 'axios'
import mixin from '@portal/utils/mixin'
//把axios挂载到Vue原型链上
Vue.prototype.$http = axios
// 混合
Vue.mixin(mixin)
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
