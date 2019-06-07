<template>
    <div>
        <ol>
            <li v-for="(item,index) in orderList">订单号：{{item.orderNo}}，订单总状态：{{item.status}}
                <slot :subOrder="item.sub"></slot>
            </li>
        </ol>
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
                orderList:[]
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
                        this.orderList = nv;
                    }
                },
                deep:true,
                immediate:true
            }
        }
    }
</script>
