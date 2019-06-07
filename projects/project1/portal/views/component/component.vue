<template>
    <div>
        <div v-if="showNav">
            <h5>组件知识点：</h5>
            <ul>
                <li><a href="javascript:void(0)" @click="stateGo('component-props')">props</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('component-vModel')">v-model</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('component-slot')">slot</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('component-orderList')">demo-orderList</a></li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {
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
