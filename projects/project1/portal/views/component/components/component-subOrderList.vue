<template>
    <div>
        <ul>
            <li v-for="(item,index) in subOrderList">
                商品名称：{{item.skuName}}，子订单状态：{{item.status}}
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        props:{
            dataSource:{
                type:Array
            }
        },

        data(){
            return {
                subOrderList:[]
            }
        },
        mounted(){

        },
        methods: {

        },
        watch:{
            dataSource:{
                handler(nv,ov){
                    if(nv){
                        this.subOrderList = nv;
                    }
                },
                deep:true,
                immediate:true
            }
        }
    }
</script>
