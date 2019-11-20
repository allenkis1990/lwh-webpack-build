
console.log('当前是否开发环境'+dev);
//全局ajax拦截器
import interceptors from '@portal/utils/interceptors'
import Vue from 'vue'
import App from '@portal/App.vue'
import router from '@portal/router/router'
import store from '@portal/store/store'
import axios from 'axios'
import mixin from '@portal/utils/mixin'
import elementUi from '@portal/utils/element-ui'
import dialogPlugin from '@portal/utils/dialog'
import Demo1 from '@portal/selfPlugins/demo1/index'
Vue.use(dialogPlugin)
Vue.use(Demo1)

//使用element-ui并且把各插件挂载到Vue上
elementUi(Vue)
//把axios挂载到Vue原型链上
Vue.prototype.$http = axios
// 混合
Vue.mixin(mixin)

router.beforeEach(function(to,form,next){
    console.log(`全局的router拦截from+to`,form,to)
    next()
})

router.beforeResolve(function(to,form,next){
    console.log('beforeResolve')
    next()
})

router.afterEach(function(){
    console.log('路由跳转完成');
})

var vm = new Vue({
    el:'#app',
    router,
    store,
    template:'<App/>',
    components:{App}
});
window.$$$vm = vm

if(module.hot){
    module.hot.accept();
}
