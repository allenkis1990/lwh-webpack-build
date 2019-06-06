import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Home from '@portal/views/home/home.vue'


export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/portal',
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
            path: '/portal/test1',
            component: () => import(/* webpackChunkName: "portal/chunk/test1" */'@portal/views/test1/test1.vue')
        },
        {
            name:'test2',
            path: '/portal/test2',
            component: () => import(/* webpackChunkName: "portal/chunk/test2" */'@portal/views/test2/test2.vue')
        },
        {
            name:'onlyPortal',
            path: '/portal/onlyPortal',
            component: () => import(/* webpackChunkName: "portal/chunk/onlyPortal" */'@portal/views/onlyPortal/onlyPortal.vue')
        },
        {
            name:'directive',
            path: '/portal/directive',
            component: () => import(/* webpackChunkName: "portal/chunk/directive" */'@portal/views/directive/directive.vue')
        },
        {
            name:'filter',
            path: '/portal/filter',
            component: () => import(/* webpackChunkName: "portal/chunk/filter" */'@portal/views/filter/filter.vue')
        },
        {
            name:'component',
            path: '/portal/component',
            component: () => import(/* webpackChunkName: "portal/chunk/component" */'@portal/views/component/component.vue')
        }
    ]
});






