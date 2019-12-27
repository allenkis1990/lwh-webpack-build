<template>
    <div>
        <div>
            sku {{list}}
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data(){
            return {
                list:[]
            }
        },
        mounted(){
            let _this = this
            this.getSkuActions().then(function(data){
                console.log(data,33);
                _this.list = data.info
            })
        },
        methods: {
                ...mapActions('demo',{
                    getSkuActions:'getSkuDetail'
                })
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
