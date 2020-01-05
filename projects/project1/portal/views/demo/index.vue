<template>
    <div>
        <div v-if="showNav">
            <ul>
                <li><a href="javascript:void(0)" @click="stateGo('demo-sku')">sku组件</a></li>
                <li><a href="javascript:void(0)" @click="stateGo('demo-shoppingCart')">购物车组件</a></li>
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
                var urlParams = [
                    {
                        propertyCode:'year',
                        value:'skuItem002',
                        valueCode:'2019',
                        valueName:'2019'
                    },
                    {
                        propertyCode:'area',
                        value:'skuItem103',
                        valueCode:'quanzhou',
                        valueName:'泉州'
                    }
                ]
                this.$router.push({
                    name:name,
//                    query:{
//                        urlParams:JSON.stringify(urlParams)
//                    }
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
