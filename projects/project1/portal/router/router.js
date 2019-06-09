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
            meta: {
            keepAlive: false // 需要被缓存
            },
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
            component: () => import(/* webpackChunkName: "portal/chunk/component" */'@portal/views/component/component.vue'),
            children:[
                {
                    name: 'component-props',
                    path: 'props',
                    components:{
                        default:function(){
                            return import(/* webpackChunkName: "portal/chunk/component-props" */'@portal/views/component/component-props.vue')
                        }
                    }
                },
                {
                    name: 'component-vModel',
                    path: 'vModel',
                    components:{
                        default:function(){
                            return import(/* webpackChunkName: "portal/chunk/component-vModel" */'@portal/views/component/component-vModel.vue')
                        }
                    }
                },
                {
                    name: 'component-slot',
                    path: 'slot',
                    components:{
                        default:function(){
                            return import(/* webpackChunkName: "portal/chunk/component-slot" */'@portal/views/component/component-slot.vue')
                        }
                    }
                },
                {
                    name: 'component-orderList',
                    path: 'orderList',
                    components:{
                        default:function(){
                            return import(/* webpackChunkName: "portal/chunk/component-demoOrderList" */'@portal/views/component/component-demo-orderList.vue')
                        }
                    }
                },
                {
                    name: 'component-async',
                    path: 'async',
                    components:{
                        default:function(){
                            return import(/* webpackChunkName: "portal/chunk/component-async" */'@portal/views/component/component-async.vue')
                        }
                    }
                }
            ]
        }
    ]
});






