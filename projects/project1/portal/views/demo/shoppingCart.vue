<template>
    <div>
        <shopping-cart :shopping-cart-data="shoppingCartList"></shopping-cart>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import shoppingCart from '@portal/views/demo/component/shoppingCartComponent/shoppingCart.vue'

    export default {
        data() {
            return {
                shoppingCartList:[]
            }
        },
        mounted() {
            this.getShoppingCartActions().then((data)=>{
                this.shoppingCartList = data.info
            })
        },
        methods: {
            ...mapActions('demo', {
                getShoppingCartActions: 'getShoppingCartList'
            })
        },
        components: {
            shoppingCart
        },
        watch:{

        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
