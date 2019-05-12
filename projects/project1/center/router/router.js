import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Home from '@center/views/home/home.vue'


export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/center',
            component: Home,
            children: [
                /*{
                    name: 'test2',
                    path: 'test2',
                    component: Test2
                }*/
            ]
        },
        {
            name: 'test1',
            path: '/center/test1',
            component: () => import(/* webpackChunkName: "center/chunk/test1" */'@center/views/test1/test1.vue')
        },
        {
            name:'test2',
            path: '/center/test2',
            component: () => import(/* webpackChunkName: "center/chunk/test2" */'@center/views/test2/test2.vue')
        },
        {
            name:'onlyCenter',
            path: '/portal/onlyCenter',
            component: () => import(/* webpackChunkName: "center/chunk/onlyCenter" */'@center/views/onlyCenter/onlyCenter.vue')
        }
    ]
});






