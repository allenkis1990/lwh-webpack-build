import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Home from '@portal/views/home/home.vue'


export default new VueRouter({
    mode: isHistoryModel?'history':'hash',
    base: __dirname,
    routes: [
        {
            path: isHistoryModel?'/portal':'/',
            name:'home',
            component: Home
        }
    ]
});






