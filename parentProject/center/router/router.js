import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Home from '@center/views/home/home.vue'
export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: multiApp?'/center':'/',
            name:'home',
            component: Home,
            children: [
                {
                    name: 'test1',
                    path: 'test1',
                    component: () => import(/* webpackChunkName: "center/chunk/test1" */'@center/views/test1/test1.vue')
                },
                {
                    name:'test2',
                    path: 'test2',
                    component: () => import(/* webpackChunkName: "center/chunk/test2" */'@center/views/test2/test2.vue')
                }
            ]
        }
    ]
});






