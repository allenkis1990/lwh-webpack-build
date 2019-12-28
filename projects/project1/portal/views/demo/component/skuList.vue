<template>
    <ul>
        <sku-selected-bar
                :seleted-data="seletedData"
                @cancelSelect="cancelSelect"></sku-selected-bar>
        <template v-for="(item,index) in skuList">
            <sku-item :sku-item-data="item"
                      @itemChanged="setModelValue"></sku-item>
        </template>
    </ul>
</template>

<script>
    import skuItem from '@portal/views/demo/component/skuItem.vue'
    import skuSelectedBar from '@portal/views/demo/component/skuSelectedbar.vue'
    import {deepCopy} from '@portal/utils/lwh-utils'
    import {mapActions} from 'vuex'
    export default {
        props:{
            skuData:{
                type:Array,
                default:[]
            },
            value:{
                type:Object
            }
        },
        data(){
            return {
                skuList:[],
                seletedData:[]
            }
        },
        mounted(){
        },
        methods: {
            ...mapActions('demo',{
                getSkuItemArrActions:'getSkuItemArr'
            }),
            getSkuItemList(item){
                let _this = this
                this.getSkuItemArrActions({skuCode:item.propertyCode}).then((data)=>{
                    item.skuItemArr = data.info
                })
            },
            initSkuData(item){
                this.$set(item,'show',true)
                this.$set(item,'value','')
                this.$set(item,'valueName','')
                this.$set(item,'valueCode','')
                this.$set(item,'skuItemArr',[])
            },
            setModelValue(){
                var result = {
                    skuList:[]
                }
                this.skuList.forEach((item)=>{
                    result.skuList.push({
                        propertyId:item.propertyId,
                        propertyCode:item.propertyCode,
                        value:item.value,
                        valueCode:item.valueCode
                    })
                })
                this.setSelectedData()
                this.$emit('input',result)
            },

            setSelectedData(){
                this.seletedData = this.skuList.filter((item)=>{
                    return item.value
                })
//                console.log(this.seletedData);
            },
            cancelSelect(propertyCode){
                this.showItem(propertyCode)
                this.setItemValue(propertyCode,'','','')
            },
            //暴露给外部用的方法
            showItem(propertyCode){
                let cur = this.skuList.find((item)=>{
                    return item.propertyCode===propertyCode
                })
                cur.show = true
            },
            hideItem(propertyCode){
                let cur = this.skuList.find((item)=>{
                    return item.propertyCode===propertyCode
                })
                cur.show = false
            },
            setItemValue(propertyCode,value,valueCode,valueName){
                let cur = this.skuList.find((item)=>{
                    return item.propertyCode===propertyCode
                })
                cur.value = value
                cur.valueCode = valueCode
                cur.valueName = valueName
                this.setModelValue()
            }
            //暴露给外部用的方法
        },
        components:{
            skuItem,
            skuSelectedBar
        },
        watch:{
            skuData(nv){
                if(nv&&nv.length){
                    var skuList = deepCopy(nv)
                    skuList.forEach((item)=>{
                        this.initSkuData(item)
                        this.getSkuItemList(item)
                    })
                    this.skuList = skuList
                    this.setModelValue()
                    this.$emit('skuLoaded')
                }
            }
        }
    }
</script>
