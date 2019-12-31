<template>
    <div>
        {{shoppingCartList}}
        <table>
            <tr>
                <td width="50">No.</td>
                <td>商品名称</td>
                <td width="100">价格</td>
                <td width="150">操作</td>
            </tr>
            <template v-for="(item,index) in shoppingCartList">
                <shopping-cart-cell :key="item.name" :cell-data="item"></shopping-cart-cell>
            </template>
        </table>
    </div>
</template>

<script>
    import shoppingCartCell from '@portal/views/demo/component/shoppingCartComponent/shoppingCartCell.vue'
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
            initData(item){
                item.checked=false
                item.subList.forEach((subItem)=>{
                    subItem.checked = false
                })
            }
        },
        components:{
            shoppingCartCell
        },
        watch:{
            shoppingCartData(nv){
                if(nv&&nv.length){
                    console.log(nv,1);
                    var shoppingCartList = deepCopy(nv)
                    shoppingCartList.forEach((item)=>{
                        this.initData(item)
                    })
                    this.shoppingCartList = shoppingCartList
                }
            }
        }
    }
</script>
