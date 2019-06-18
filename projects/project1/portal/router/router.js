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
            component: Home,
            children: [
                {
                    name: 'test1',
                    path: 'test1',
                    component: () => import(/* webpackChunkName: "portal/chunk/test1" */'@portal/views/test1/test1.vue')
                },
                {
                    name:'test2',
                    path: 'test2',
                    component: () => import(/* webpackChunkName: "portal/chunk/test2" */'@portal/views/test2/test2.vue')
                },
                {
                    name:'onlyPortal',
                    path: 'onlyPortal',
                    component: () => import(/* webpackChunkName: "portal/chunk/onlyPortal" */'@portal/views/onlyPortal/onlyPortal.vue')
                },
                {
                    name:'directive',
                    path: 'directive',
                    meta: {
                        keepAlive: false // 需要被缓存
                    },
                    component: () => import(/* webpackChunkName: "portal/chunk/directive" */'@portal/views/directive/directive.vue')
                },
                {
                    name:'filter',
                    path: 'filter',
                    component: () => import(/* webpackChunkName: "portal/chunk/filter" */'@portal/views/filter/filter.vue')
                },
                {
                    name:'component',
                    path: 'component',
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
                        },
                        {
                            name: '$attrs$listeners',
                            path: '$attrs$listeners',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/$attrs$listeners" */'@portal/views/component/$attrs$listeners.vue')
                                }
                            }
                        }
                    ]
                },
                {
                    name:'vuex',
                    path: 'vuex',
                    component: () => import(/* webpackChunkName: "portal/chunk/vuex" */'@portal/views/vuex/vuex.vue'),
                    children:[
                        {
                            name: 'vuex-state',
                            path: 'state',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/vuex-state" */'@portal/views/vuex/vuex-state.vue')
                                }
                            }
                        },
                        {
                            name: 'vuex-getter',
                            path: 'getter',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/vuex-getter" */'@portal/views/vuex/vuex-getter.vue')
                                }
                            }
                        },
                        {
                            name: 'vuex-mutation',
                            path: 'mutation',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/vuex-mutation" */'@portal/views/vuex/vuex-mutation.vue')
                                }
                            }
                        },
                        {
                            name: 'vuex-actions',
                            path: 'actions',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/vuex-actions" */'@portal/views/vuex/vuex-actions.vue')
                                }
                            }
                        },
                        {
                            name: 'vuex-modules',
                            path: 'modules',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/vuex-modules" */'@portal/views/vuex/vuex-modules.vue')
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});






