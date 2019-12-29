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
                this.skuItemData.value = item.value
                this.skuItemData.valueCode = item.valueCode
                this.skuItemData.valueName = item.valueName
                this.skuItemData.show = false
                this.$emit('itemChanged',item)
            }
        }
    }
</script>
<style scoped>
    .skuItem{margin-bottom:15px;}
    .skuItem:last-child{margin-bottom:0}
</style>
