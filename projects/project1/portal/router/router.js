
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Root from '@portal/views/root/root.vue'

// meta: {
//     keepAlive: false // 不需要被缓存
// },
export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: dev?'/portal':'/',
            redirect: function () {
                if(dev){
                    return '/portal/home'
                }else{
                    return '/home'
                }
            },
            name:'root',
            component: Root,
            children: [
                {
                    name: 'home',
                    path: 'home',
                    component: () => import(/* webpackChunkName: "portal/chunk/home" */'@portal/views/home/home.vue')
                },
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
                                    return import(/* webpackChunkName: "portal/chunk/component-demo-orderList" */'@portal/views/component/component-demo-orderList.vue')
                                }
                            }
                        },
                        {
                            name: 'component-list',
                            path: 'list',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/component-demo-digui" */'@portal/views/component/component-demo-digui.vue')
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
                    name:'commu',
                    path: 'commu',
                    component: () => import(/* webpackChunkName: "portal/chunk/commu" */'@portal/views/parent-child-commu/index.vue'),
                    children:[
                        {
                            name: '$parent$children',
                            path: '$parent$children',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/$parent$children" */'@portal/views/parent-child-commu/$parent$children.vue')
                                }
                            }
                        },
                        {
                            name: 'attrs&listeners',
                            path: 'attrs&listeners',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/attrs&listeners" */'@portal/views/parent-child-commu/attrs&listeners.vue')
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


















