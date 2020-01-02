<template>
    <div>
        <table v-if="shoppingCartList.length">
            <tr>
                <td width="50">No.</td>
                <td>商品名称</td>
                <td width="100">价格</td>
                <td width="150">操作</td>
            </tr>
            <template v-for="(item,index) in shoppingCartList">
                <!--@selectOneUnit="selectOneUnit"-->
                <!--@selectItem="selectItem"-->
                <shopping-cart-cell :key="item.name"
                                    @deleteOneUnit="deleteOneUnit"
                                    v-on="$listeners"
                                    :cell-data="item"></shopping-cart-cell>
            </template>
        </table>
        <shopping-result-bar
                ref="shoppingResultBar"
                v-if="shoppingCartList.length"
                v-on="$listeners"
                @changeShoppingData="changeShoppingData"
                :shopping-cart-data="shoppingCartList"></shopping-result-bar>
        <div style="text-align:center" v-if="!shoppingCartList.length">暂无数据</div>
    </div>
</template>

<script>
    import shoppingCartCell from '@portal/views/demo/component/shoppingCartComponent/shoppingCartCell.vue'
    import shoppingResultBar from '@portal/views/demo/component/shoppingCartComponent/shoppingResultBar.vue'
    import {deepCopy} from '@portal/utils/lwh-utils'
    export default {
        props:{
            shoppingCartData:{
                type:Array,
                default:[]
            }
        },
        data(){
            return {
                shoppingCartList:[]
            }
        },
        mounted(){
        },
        methods: {
            //批量删除的时候触发 参数是改变后的数组
            changeShoppingData(nv){
                this.shoppingCartList = nv
            },
            initData(item){
                this.$set(item,'checked',false)
                item.subList.forEach((subItem)=>{
                    this.$set(subItem,'checked',false)
                })
            },
            //cell组件删除掉整个单位的item时需要大item也删掉
            deleteOneUnit(id){
                let idx = this.shoppingCartList.findIndex((item)=>{
                    return item.id===id
                })
                if(idx>-1){
                    this.shoppingCartList.splice(idx,1)
                }
            },
            //暴露给组件外部使用
            getPayParams(){
                let shoppingResultBarComponent = this.$refs.shoppingResultBar
                let result = shoppingResultBarComponent.getPayParams()
                return result
            }
        },
        components:{
            shoppingCartCell,
            shoppingResultBar
        },
        watch:{
            shoppingCartData:{
                handler(nv){
                    if(nv&&nv.length){
                        console.log('购物车数据初始化');
                        let shoppingCartList = deepCopy(nv)
                        shoppingCartList.forEach((item)=>{
                            this.initData(item)
                        })
                        this.shoppingCartList = shoppingCartList
                    }
                },
                deep:true
            }
        }
    }
</script>
