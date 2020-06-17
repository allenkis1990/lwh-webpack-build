
NodeList.prototype.forEach = Array.prototype.forEach;
// console.log('当前是否开发环境'+dev);
//全局ajax拦截器
import interceptors from '@portal/utils/interceptors'
import Vue from 'vue'
import App from '@portal/App.vue'
import router from '@portal/router/router'
import store from '@portal/store/store'
import axios from 'axios'
import mixin from '@portal/utils/mixin'
import elementUi from '@portal/utils/element-ui'
import validationPlugin from '@portal/utils/validationPlugin'

Vue.use(validationPlugin)
//使用element-ui并且把各插件挂载到Vue上
elementUi(Vue)
//把axios挂载到Vue原型链上
Vue.prototype.$http = axios
// 混合
Vue.mixin(mixin)

//引入js的组件
Vue.component('remote-js', {
    render(createElement) {
        let self = this;
        let attrs = {
            type: 'text/javascript'
        };
        self.async && (attrs.async = self.async);
        self.defer && (attrs.defer = self.defer);
        //虚拟节点不受BOM控制，模拟延迟效果
        if (self.start) {
            attrs.src = self.src;
        }
        let node = createElement('script', {
            attrs
        });
        return node;
    },
    data() {
        return {}
    },
    props: {
        src: {
            type: String,
            required: true
        },
        async: {
            type: Boolean,
            default: false
        },
        defer: {
            type: Boolean,
            default: false
        },
        start: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        start(newValue) {
            let self = this;
            if (newValue) {
                self.$el.src = self.src;
            }
        }
    }
})
//引入css的组件
Vue.component('remote-css', {
    render(createElement) {
        return createElement('link', {
            attrs: {
                type: 'type="text/css"',
                rel: "stylesheet",
                href: this.href
            }
        });
    },
    props: {
        href: {
            type: String,
            required: true
        }
    }
})


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
