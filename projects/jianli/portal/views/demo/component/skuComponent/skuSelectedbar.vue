<template>
    <ul class="clear">
        <slot></slot>
        <li v-for="(item,index) in dataSource"
            style="margin-right:10px"
            :key="item.propertyCode"
            class="skuSelectedItem fl">
            {{item.propertyCName}}:
            <button class="btn current">{{item.valueName}}
                <span class="close" @click="cancel($event,item,index)">x</span>
            </button>
        </li>
        <li>
            <a href="javascript:void(0)" @click="clearSelectedBar">清空已选SKU</a>
        </li>
    </ul>
</template>

<script>
    export default {
        props:{
            dataSource:{
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
            clearSelectedBar(){
                let arr = this.dataSource.map((item)=>{
                    return item.propertyCode
                })
                this.$emit('clearSelectedBar',arr)
            },
            cancel(e,item,idx){
                e.stopPropagation()
                this.dataSource.splice(idx,1)
                console.log(item);
                this.$emit('cancelSelect',item)
            }
        }
    }
</script>