<template>
    <li class="skuItem" v-if="dataSource.show">
        {{dataSource.propertyCName}}
        <button class="btn"
                :class="{'current':dataSource.value===item.value}"
                @click="clickItem(item)"
                v-for="(item,index) in dataSource.skuItemArr">{{item.valueName}}</button>
    </li>
</template>

<script>
    export default {
        props:{
            dataSource:{
                type:Object,
                default:{}
            }
        },
        data(){
            return {

            }
        },
        mounted(){

        },
        methods: {
            clickItem(item){
                let context = this
                let hasEmitEvents = this.hasEmitEvents('beforeItemChanged')
                if(hasEmitEvents){
                    context.$emit('beforeItemChanged',item,()=>{
                        itemChanged(context)
                    })
                }else{
                    itemChanged(context)
                }
                function itemChanged(context){
                    context.dataSource.value = item.value
                    context.dataSource.valueCode = item.valueCode
                    context.dataSource.valueName = item.valueName
                    context.dataSource.show = false
                    context.$emit('itemChanged',item)
                }
            },
            //判断当前事件是否存在emit事件
            hasEmitEvents(eventName){
                let bol
                if(this._events&&this._events[eventName]&&this._events[eventName].length){
                    bol = true
                }else{
                    bol = false
                }
                return bol
            }
        }
    }
</script>
<style scoped>
    .skuItem{margin-bottom:15px;}
    .skuItem:last-child{margin-bottom:0}
</style>
