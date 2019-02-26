import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import Home from '@portal/views/home/home.vue'
import Test1 from '@portal/views/test1/test1.vue'

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/portal',
      component: Home,
      children:[
        {
          name:'test1',
          path: 'test1',
          component: Test1
        }
      ]
    },
    {
      path: '/test1',
      component: Test1
    },
    {
      path: '/',
      component: Test1
    }
    //{
    //  path: '/no1',
    //  component: no1,
    //  children:[
    //    {
    //      path: 'no1-1',
    //      component: no1_1
    //    }
    //  ]
    //}
  ]
});






