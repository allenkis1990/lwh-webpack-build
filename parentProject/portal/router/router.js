import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Home from '@portal/views/home/home.vue'

console.log('22688');

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
        }
    ]
});






