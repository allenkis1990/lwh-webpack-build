<template>

    <div style="width:780px;margin:20px auto;position:relative" class="shoppingCart">
        <!--<button @click="fn">click</button>-->
        <shopping-cart :shopping-cart-data="shoppingCartList"
                       ref="shoppingCartList"
                       @beforeSelectOneUnit="beforeSelectOneUnit"
                       @selectOneUnit="selectOneUnit"
                       @beforeSelectItem="beforeSelectItem"
                       @selectItem="selectItem"
                       @beforeDeleteItem="beforeDeleteItem"
                       @deleteItem="deleteItem"></shopping-cart>
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
            }),
            beforeSelectItem(item,cellData,next){
                next()
            },
            beforeSelectOneUnit(cellData,next){
                next()
            },
            selectItem(item,cellData){
                console.log(item,cellData,123);
            },
            selectOneUnit(cellData){
                console.log(cellData,99);
            },
            beforeDeleteItem(item,next){
                next()
            },
            deleteItem(){
                console.log('删除成功');
            }
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
