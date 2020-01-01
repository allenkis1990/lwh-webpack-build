<template>
    <div>
        <!--{{shoppingCartList}}-->
        <table>
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
                this.$set(item,'checked',false)
                item.subList.forEach((subItem)=>{
                    this.$set(subItem,'checked',false)
                })
            },
            selectOneUnitUtils(cellData,boolean){
                cellData.subList.forEach((item)=>{
                    item.checked = boolean
                })
                cellData.checked = boolean
            },
            //cell组件删除掉整个单位的item时需要大item也删掉
            deleteOneUnit(id){
                let idx = this.shoppingCartList.findIndex((item)=>{
                    return item.id===id
                })
                if(idx>-1){
                    this.shoppingCartList.splice(idx,1)
                }
            }
        },
        components:{
            shoppingCartCell
        },
        watch:{
            shoppingCartData(nv){
                if(nv&&nv.length){
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
