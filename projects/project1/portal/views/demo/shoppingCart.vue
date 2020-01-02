<template>

    <div style="width:780px;margin:20px auto;position:relative" class="shoppingCart">
        <el-button type="primary"
                   @click="getShoppingCartList"
                   :loading="loading">刷新购物车数据
        </el-button>
        <shopping-cart :shopping-cart-data="shoppingCartList"
                       ref="shoppingCartList"
                       @beforeSelectOneUnit="beforeSelectOneUnit"
                       @selectOneUnit="selectOneUnit"
                       @beforeSelectItem="beforeSelectItem"
                       @selectItem="selectItem"
                       @beforeDeleteItem="beforeDeleteItem"
                       @deleteItem="deleteItem"
                       @beforeSelectAll="beforeSelectAll"
                       @selectAll="selectAll"
                       @beforeGoPay="beforeGoPay"
                       @goPay="goPay"
                       @beforeBatchDelete="beforeBatchDelete"
                       @batchDelete="batchDelete"></shopping-cart>
    </div>

</template>

<script>
    import {mapActions} from 'vuex'
    import {Button} from 'element-ui'
    import shoppingCart from '@portal/views/demo/component/shoppingCartComponent/shoppingCart.vue'

    export default {
        data() {
            return {
                shoppingCartList: [],
                loading:false
            }
        },
        mounted() {
            this.getShoppingCartList()
        },
        methods: {
            ...mapActions('demo', {
                getShoppingCartActions: 'getShoppingCartList'
            }),
            getShoppingCartList(){
                this.loading = true
                this.getShoppingCartActions().then((data) => {
                    this.loading = false
                    this.shoppingCartList = data.info
                },function(){
                    this.loading = false
                })
            },
            beforeSelectItem(item,cellData,next){
                next()
            },
            beforeSelectOneUnit(cellData,next){
                next()
            },
            selectItem(item,cellData){
//                console.log(item,cellData,123);
            },
            selectOneUnit(cellData){
//                console.log(cellData,99);
            },
            beforeDeleteItem(item,next){
                next()
            },
            deleteItem(){
                console.log('删除成功');
            },
            beforeSelectAll(next){
//                console.log('选择全部之前触发');
                next()
            },
            selectAll(){
//                console.log('选择全部之后触发');
            },
            beforeGoPay(next){
                next()
            },
            goPay(){
                console.log('去结算回调');
            },
            beforeBatchDelete(next){
                console.log('批量删除之前');
                next()
            },
            batchDelete(){
                console.log('批量删除之后');
            }
        },
        components: {
            shoppingCart,
            elButton: Button
        },
        watch: {}
    }
</script>
<style>
    .shoppingCart table:last-child td{border-top:none}
    .shoppingCart table:first-child td{border-top:1px solid #fff}
    .shoppingCart table td{padding:5px 10px;text-align: center}
</style>
