<template>
    <div>
        <div v-if="showNav">
            <h5>组件知识点：</h5>
            <ul>
                <li><a href="javascript:void(0)" @click="stateGo('component-props')">props</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('component-vModel')">v-model</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('component-slot')">slot</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('component-async')">component-async</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('component-orderList')">demo-orderList</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('component-list')">demo-diguiList</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('component-ball')">demo-ball</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('$attrs$listeners')">$attrs$listeners</a></li>
            </ul>
        </div>
        <!--exclude="component-orderList"-->
        <!--一个路由属于keep-alive状态下，这个路由内的组件就算设置了exclude也无效-->
        <!--<keep-alive :exclude="excludes">-->
            <!--<router-view></router-view>-->
        <!--</keep-alive>-->


        <transition name="fuck"
                    appear>
            <keep-alive :exclude="excludes">
                <router-view></router-view>
            </keep-alive>
        </transition>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                excludes:['component-orderList']
            }
        },
        computed:{
            showNav(){
                return this.$route.name==='component'
            }
        },
        mounted(){
        },
        methods: {
            stateGo(name){
                this.$router.push({
                    name:name
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
