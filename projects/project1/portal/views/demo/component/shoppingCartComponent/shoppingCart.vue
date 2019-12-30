<template>
    <div style="width:780px;margin:20px auto" class="shoppingCart">
        <table>
            <tr>
                <td width="50">No.</td>
                <td>商品名称</td>
                <td width="100">价格</td>
                <td width="150">操作</td>
            </tr>
            <tbody v-for="(item,index) in shoppingCartData" :key="item.name">
                <tr>
                    <td colspan="4" style="text-align:left">
                        <el-checkbox style="vertical-align:2px;margin-left:12px;"></el-checkbox>{{item.name}}
                    </td>
                </tr>
                <tr v-for="(i,j) in item.subList">
                    <td><el-checkbox style="vertical-align:2px;"></el-checkbox>{{j+1}}</td>
                    <td>{{i.name}}</td>
                    <td>{{i.price}}</td>
                    <td><a href="javascript:void(0)">删除</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {Checkbox} from 'element-ui'
    export default {
        props:{
            shoppingCartData:{
                type:Array,
                default:[]
            }
        },
        data(){
            return {

            }
        },
        mounted(){
        },
        methods: {

        },
        components:{
            elCheckbox:Checkbox
        },
        watch:{
            shoppingCartData(nv){
                if(nv&&nv.length){
                    console.log(nv);
                }
            }
        }
    }
</script>
<style scoped>
    .shoppingCart table:last-child td{border-top:none}
    .shoppingCart table:first-child td{border-top:1px solid #fff}
    .shoppingCart table td{padding:5px 10px;text-align: center}
</style>
