
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Root from '@portal/views/root/root.vue'
import Top from '@portal/views/root/top.vue'

// meta: {
//     keepAlive: false // 不需要被缓存
// },
//App.vue被作为初始化实例的组件标签

//Root.vue被作为第一个页面，其他路由全在Root的children里
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
            components: {
                default:Root,
                top:Top
            },
            children: [
                {
                    name: 'home',
                    path: 'home',
                    component: () => import(/* webpackChunkName: "portal/chunk/home" */'@portal/views/home/home.vue')
                },
                {
                    name:'router',
                    path:'router',
                    meta:{
                        name:'allen'
                    },
                    component:function(){
                        return import(/* webpackChunkName: "portal/chunk/router" */'@portal/views/router/router.vue')
                    },
                    beforeEnter(to,form,next){
                        console.log(form,'路由表里的form');
                        next()
                    }
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
                    name:'ajaxRequest',
                    path: 'ajaxRequest',
                    component: () => import(/* webpackChunkName: "portal/chunk/ajaxRequest" */'@portal/views/ajaxRequest/index.vue')
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
                    name:'render',
                    path: 'render',
                    component: () => import(/* webpackChunkName: "portal/chunk/render" */'@portal/views/render/render.vue')
                },
                {
                    name:'demo',
                    path:'demo',
                    component:()=>import(/* webpackChunkName: "portal/chunk/demo" */'@portal/views/demo/index.vue'),
                    children:[
                        {
                            name:'demo-sku',
                            path:'demo-sku',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/demo-sku" */'@portal/views/demo/sku.vue')
                                }
                            }
                        },
                        {
                            name:'demo-shoppingCart',
                            path:'demo-shoppingCart',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/demo-shoppingCart" */'@portal/views/demo/shoppingCart.vue')
                                }
                            }
                        },
                        {
                            name:'demo-formComponent',
                            path:'demo-formComponent',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/demo-formComponent" */'@portal/views/demo/formComponent.vue')
                                }
                            }
                        }
                    ]
                },
                {
                    name:'component',
                    path: 'component',
                    meta:{
                        age:18
                    },
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
                            name: 'component-ball',
                            path: 'ball',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/component-demo-ball" */'@portal/views/component/component-demo-ball.vue')
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
                        },
                        {
                            name: 'vuex-demo1',
                            path: 'vuex-demo1',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "portal/chunk/vuex-demo1" */'@portal/views/vuex/vuex-demo1.vue')
                                }
                            }
                        }
                    ]
                },
                {
                    name:'eventBus',
                    path: 'eventBus',
                    component: () => import(/* webpackChunkName: "portal/chunk/eventBus" */'@portal/views/eventBus/index.vue')
                }
            ]
        }
    ]
});


















