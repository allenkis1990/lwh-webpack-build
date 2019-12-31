<template>
    <tbody>
        <tr>
            <td colspan="4" style="text-align:left">
                <el-checkbox :checked="cellData.checked"
                             @change="fn()"
                             style="vertical-align:2px;margin-left:12px;"></el-checkbox>{{cellData.name}}
            </td>
        </tr>
        <tr v-for="(item,index) in cellData.subList">
            <td><el-checkbox style="vertical-align:2px;"
                             @change="selectItem(item)"
                             :checked="item.checked"></el-checkbox>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
            <td><a href="javascript:void(0)">删除</a></td>
        </tr>
    </tbody>
</template>

<script>
    import {Checkbox} from 'element-ui'
    export default {
        props:{
            cellData:{
                type:Object,
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
            selectItem(item){
                console.log(item.checked);
            },
            fn(){
                console.log(123);
            }
        },
        components:{
            elCheckbox:Checkbox
        },
        watch:{

        }
    }
</script>
