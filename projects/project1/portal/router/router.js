import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Home from '@portal/views/home/home.vue'
import Test1 from '@portal/views/test1/test1.vue'
import Test2 from '@portal/views/test2/test2.vue'

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
            component: Test1
        },
        {
            name:'test2',
            path: '/portal/test2',
            component: Test2
        }
    ]
});






