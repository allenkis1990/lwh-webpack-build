<template>
    <li class="skuItem" v-if="skuItemData.show">
        {{skuItemData.propertyCName}}
        <button class="btn"
                :class="{'current':skuItemData.value===item.value}"
                @click="clickItem(item)"
                v-for="(item,index) in skuItemData.skuItemArr">{{item.valueName}}</button>
    </li>
</template>

<script>
    export default {
        props:{
            skuItemData:{
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
                    context.skuItemData.value = item.value
                    context.skuItemData.valueCode = item.valueCode
                    context.skuItemData.valueName = item.valueName
                    context.skuItemData.show = false
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
