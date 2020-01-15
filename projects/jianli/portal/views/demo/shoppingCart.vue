<template>

    <div style="width:780px;margin:20px auto;position:relative" class="shoppingCart">
        <el-button type="primary"
                   @click="getShoppingCartList"
                   :loading="loading">刷新购物车数据
        </el-button>
        <el-button type="primary"
                   @click="getSubmitData">获取提交数据
        </el-button>
        <shopping-cart :data-source="shoppingCartList"
                       ref="shoppingCartList"
                       @beforeSelectItem="beforeSelectItem"
                       @selectItem="selectItem"
                       @beforeSelectOneUnit="beforeSelectOneUnit"
                       @selectOneUnit="selectOneUnit"
                       @beforeDeleteItem="beforeDeleteItem"
                       @deleteItem="deleteItem"
                       @beforeSelectAll="beforeSelectAll"
                       @selectAll="selectAll"
                       @beforeBatchDelete="beforeBatchDelete"
                       @batchDelete="batchDelete"
                       @beforeGoPay="beforeGoPay"
                       @goPay="goPay"></shopping-cart>

        <md-component :md-content="mdContent"></md-component>
    </div>

</template>

<script>
    import {mapActions} from 'vuex'
    import {Button} from 'element-ui'
    import shoppingCart from '@portal/views/demo/component/shoppingCartComponent/shoppingCart.vue'
    import mdComponent from '@portal/views/demo/component/mdComponent/index.vue'
    export default {
        data() {
            return {
                shoppingCartList: [],
                loading:false,
                mdContent:require('@portal/views/demo/component/shoppingCartComponent/readme.md')
            }
        },
        mounted() {
            this.getShoppingCartList()
        },
        methods: {
            ...mapActions('demo', {
                getShoppingCartActions: 'getShoppingCartList'
            }),
            getSubmitData(){
                let shoppingCartListComponent = this.$refs.shoppingCartList
                let result = shoppingCartListComponent.getPayParams()
                console.log('购物车提交的数据======>',result);
            },
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
            elButton: Button,
            mdComponent:mdComponent
        },
        watch: {}
    }
</script>
<style>
    .shoppingCart table:last-child td{border-top:none}
    .shoppingCart table:first-child td{border-top:1px solid deepskyblue}
    .shoppingCart table td{padding:5px 10px;text-align: center}
</style>
