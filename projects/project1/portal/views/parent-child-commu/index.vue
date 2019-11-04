<template>
    <div>
        <div v-if="showNav">
            <h5>父子组件通讯方式：</h5>
            <ul>
                <li><a href="javascript:void(0)" @click="stateGo('$parent$children')">$parent和$children</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('attrs&listeners')">$attrs和$listeners</a></li>
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
                return this.$route.name==='commu'
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
