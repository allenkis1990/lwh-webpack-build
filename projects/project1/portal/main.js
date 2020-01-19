// import 'babel-polyfill'
console.log('当前是否开发环境'+dev);
import Vue from 'vue'
import App from '@portal/App.vue'
import router from '@portal/router/router'
import store from '@portal/store/store'
import mixin from '@portal/utils/mixin'
import elementUi from '@portal/utils/element-ui'
import dialogPlugin from '@portal/utils/dialog'
import { sync } from 'vuex-router-sync'
//把路由的对象放在全局的store里 this.$store.state.route
sync(store, router);
Vue.use(dialogPlugin)


// import instance from '@portal/utils/ajaxRequest'
// var $http = instance.create()
// $http.request({
//     url:'/aaaaaa',
//     method:'get'
// })


//使用element-ui并且把各插件挂载到Vue上
elementUi(Vue)
// 混合
Vue.mixin(mixin)


//路由就绪的时候
router.onReady(()=>{
    // console.log('lwh111');
    let matchedComponents = router.getMatchedComponents()
    console.log('被匹配到的路由',matchedComponents);//返回的是一个被匹配到的路由集合比如反问首页会匹配到root和home
    //路由准备完再挂载到dom
    // vm.$mount('#app')
})


router.beforeEach(function(to,form,next){
    let matchedComponents = router.getMatchedComponents()
    console.log(matchedComponents);
    console.log(`全局的router拦截from+to`,form,to)
    next()
})

router.beforeResolve(function(to,form,next){
    let matchedComponents = router.getMatchedComponents(to)
    console.log(matchedComponents,99);
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
