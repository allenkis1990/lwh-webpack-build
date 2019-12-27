<template>
    <div>
        <div v-if="showNav">
            <ul>
                <li><a href="javascript:void(0)" @click="stateGo('demo-sku')">sku组件</a></li>
            </ul>
        </div>



        <transition name="fuck"
                    appear>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>

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
                return this.$route.name==='demo'
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
