<template>
    <ul>
        <li v-for="(item,index) in seletedData"
            :key="item.propertyCode"
            class="skuSelectedItem">
            {{item.propertyCName}}:
            <button class="btn current">{{item.valueName}}
                <span class="close" @click="cancel($event,item.propertyCode,index)">x</span>
            </button>
        </li>
    </ul>
</template>

<script>
    export default {
        props:{
            seletedData:{
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
            cancel(e,propertyCode,idx){
                e.stopPropagation()
                this.seletedData.splice(idx,1)
                this.$emit('cancelSelect',propertyCode)
            }
        }
    }
</script>
<style scoped>
    .skuSelectedItem{margin-bottom:15px;}
    .skuSelectedItem:last-child{margin-bottom:0}
    .skuSelectedItem .btn{position:relative}
    .skuSelectedItem .close{font-size:18px;position:absolute;right:2px;top:7px;line-height:0;}
</style>