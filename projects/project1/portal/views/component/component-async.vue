
<template>
    <div>

        <async></async>
        <button @click="fn()">click</button>
        <div>{{obj.a}}</div>
        <temp-component></temp-component>
    </div>
</template>
<script>
    var a1 = {template:'<div>a1</div>'}
    export default {
        data(){
            return {
                obj:{},
                tempCount:2
            }
        },
        mounted(){
        },
        methods: {
            fn(){
                this.obj.a = 1;
                this.$forceUpdate()
            }
        },
        components:{
            async:function(){
                return {
                    //注释定义分割后代码存放的位置
                    component:import(/* webpackChunkName: "portal/chunk/component-async-component-async" */'@portal/views/component/components/component-async.vue')
                }
            },
            tempComponent:function(){
                //如果是需要判断的话只能是异步引入组件
                return new Promise(function(resolve){
                    setTimeout(function(){
                        if(window.$$$vm.$route.query.a==1){
                            resolve(import(/* webpackChunkName: "portal/chunk/component-vModel" */'@portal/views/component/component-vModel.vue'))
                        }else{
                            resolve(import(/* webpackChunkName: "portal/chunk/component-demoOrderList" */'@portal/views/component/component-demo-orderList.vue'))
                        }
                    },3000)
                })
            }
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
