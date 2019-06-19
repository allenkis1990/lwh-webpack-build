<template>
    <div>
        <div>最外层state数据name:{{$store.state.name}}</div>
        <div>moduleA的state数据moduleAName：{{$store.state.moduleA.moduleAName}}</div>
        <div><button @click="mutationChange()">mutation change</button></div>
        <div><button @click="actionsChange()">actions change</button></div>
        <div><button @click="fn()">和最外层的mutation同名changeName</button></div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data() {
            return {}
        },
        mounted() {
        },
        methods: {
            mutationChange(){
                this.$store.commit('moduleAChangeName','change!!!')
            },
            actionsChange(){
                this.$store.dispatch('moduleAChangeName','moduleA actions change!!!')
            },
            fn(){
                //modules那边加上namespaced:true然后调用  this.$store.commit（模块/方法）
                this.$store.commit('moduleA/changeName','fuck!!!!')
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


