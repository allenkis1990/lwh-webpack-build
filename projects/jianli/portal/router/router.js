import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Home from '@portal/views/home/home.vue'
import Test from '@portal/views/test/test.vue'
import Page404 from '@portal/views/Page404/Page404.vue'


export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: dev?'/portal':'/',
            name:'home',
            component: Home,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: dev?'/portal/test':'/test',
            name:'test',
            component: Test
        },
        {
            path: '*',
            name:'page404',
            component: Page404
        }
    ]
});






