<template>

    <div style="width:780px;margin:20px auto" class="shoppingCart">
        <shopping-cart :shopping-cart-data="shoppingCartList"></shopping-cart>
    </div>

</template>

<script>
    import {mapActions} from 'vuex'
    import shoppingCart from '@portal/views/demo/component/shoppingCartComponent/shoppingCart.vue'

    export default {
        data() {
            return {
                shoppingCartList: []
            }
        },
        mounted() {
            this.getShoppingCartActions().then((data) => {
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
        watch: {}
    }
</script>
<style>
    .shoppingCart table:last-child td{border-top:none}
    .shoppingCart table:first-child td{border-top:1px solid #fff}
    .shoppingCart table td{padding:5px 10px;text-align: center}
</style>
