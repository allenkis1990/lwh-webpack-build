<template>
    <div>

        <order-list :dataSource="orderList">
            <template #default="{subOrder}">
                <sub-order-list :dataSource="subOrder"></sub-order-list>
            </template>
        </order-list>

    </div>
</template>

<script>
    import orderList from '@portal/views/component/components/component-orderList.vue'
    import subOrderList from '@portal/views/component/components/component-subOrderList.vue'
    export default {
        data(){
            return {
                orderList:[
                    {
                        orderNo: 'a1',
                        name: 'allen',
                        status:'付款中',
                        sub: [
                            {skuName:'a1-1',status:'交易成功'},
                            {skuName:'a1-2',status:'付款中'}
                        ]
                    },
                    {
                        orderNo: 'a2',
                        name: 'jack',
                        status:'交易成功',
                        sub: [
                            {skuName:'a2-1',status:'交易成功'},
                            {skuName:'a2-2',status:'交易成功'}
                        ]
                    },
                    {
                        orderNo: 'a3',
                        name: 'tom',
                        status:'交易失败',
                        sub: [
                            {skuName:'a3-1',status:'交易失败'},
                            {skuName:'a3-2',status:'交易失败'},
                            {skuName:'a3-3',status:'交易失败'}
                        ]
                    }
                ]
            }
        },
        mounted(){
        },
        methods: {

        },
        components:{
            orderList,
            subOrderList
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
