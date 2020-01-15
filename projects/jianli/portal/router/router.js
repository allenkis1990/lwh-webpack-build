import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Root from '@portal/views/root/root.vue'
import Page404 from '@portal/views/Page404/Page404.vue'

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
                    name:'home',
                    path: 'home',
                    component: () => import(/* webpackChunkName: "chunk/home" */'@portal/views/home/home.vue')
                },
                {
                    name: 'test',
                    path: 'test',
                    component: () => import(/* webpackChunkName: "chunk/test" */'@portal/views/test/test.vue')
                },
                {
                    name: 'player',
                    path: 'player',
                    component: () => import(/* webpackChunkName: "chunk/player" */'@portal/views/player/player.vue')
                },
                {
                    name: 'faceDetect',
                    path: 'faceDetect',
                    component: () => import(/* webpackChunkName: "chunk/faceDetect" */'@portal/views/faceDetect/faceDetect.vue')
                },
                {
                    name: 'projectPc',
                    path: 'projectPc',
                    component: () => import(/* webpackChunkName: "chunk/projectPc" */'@portal/views/projectJy/projectPc.vue')
                },
                {
                    name: 'projectFwh',
                    path: 'projectFwh',
                    component: () => import(/* webpackChunkName: "chunk/projectFwh" */'@portal/views/projectJy/projectFwh.vue')
                },
                {
                    name: 'projectXcx',
                    path: 'projectXcx',
                    component: () => import(/* webpackChunkName: "chunk/projectXcx" */'@portal/views/projectJy/projectXcx.vue')
                },
                {
                    name:'demo',
                    path:'demo',
                    component:()=>import(/* webpackChunkName: "chunk/demo" */'@portal/views/demo/index.vue'),
                    children:[
                        {
                            name:'demo-sku',
                            path:'demo-sku',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "chunk/demo-sku" */'@portal/views/demo/sku.vue')
                                }
                            }
                        },
                        {
                            name:'demo-shoppingCart',
                            path:'demo-shoppingCart',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "chunk/demo-shoppingCart" */'@portal/views/demo/shoppingCart.vue')
                                }
                            }
                        },
                        {
                            name:'demo-formComponent',
                            path:'demo-formComponent',
                            components:{
                                default:function(){
                                    return import(/* webpackChunkName: "chunk/demo-formComponent" */'@portal/views/demo/formComponent.vue')
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '*',
            name:'page404',
            component: Page404
        }
    ]
});






