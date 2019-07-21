import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Home from '@portal/views/home/home.vue'
import Test from '@portal/views/test/test.vue'


export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: dev?'/portal':'/',
            name:'home',
            component: Home
        },
        {
            path: dev?'/portal/test':'/test',
            name:'test',
            component: Test
        }
    ]
});






