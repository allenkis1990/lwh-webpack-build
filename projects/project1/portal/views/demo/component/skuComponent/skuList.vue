<template>
    <ul>
        <sku-selected-bar
                :seleted-data="seletedData"
                @cancelSelect="cancelSelect"></sku-selected-bar>
        <template v-for="(item,index) in skuList">
            <sku-item :sku-item-data="item"
                      @itemChanged="itemChanged"></sku-item>
        </template>
    </ul>
</template>

<script>
    import skuItem from '@portal/views/demo/component/skuComponent/skuItem.vue'
    import skuSelectedBar from '@portal/views/demo/component/skuComponent/skuSelectedbar.vue'
    import {deepCopy,isSameObj} from '@portal/utils/lwh-utils'
    import {mapActions} from 'vuex'
    export default {
        props:{
            skuData:{
                type:Array,
                default:[]
            },
            value:{
                type:Array
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
                //获取单个SKU列表的请求
                getSkuItemArrActions:'getSkuItemArr'
            }),
            //每个item被选的时候促发，每次被选都要设置一下v-model和更新已选UI
            itemChanged(item){
                this.$emit('itemChanged',item)
                this.setModelValue()
            },
            //取消选择时促发，取消选择后显示出来
            cancelSelect(item){
                this.$emit('cancelSelect',item)
                this.showItem(item.propertyCode)
                this.setItemValue(item.propertyCode,'','','')
            },
            //获取单个SKU列表的请求
            getSkuItemList(item){
                this.getSkuItemArrActions({skuCode:item.propertyCode}).then((data)=>{
                    item.skuItemArr = data.info
                })
            },
            //给skuList上加属性用来业务需求
            initSkuData(item){
                this.$set(item,'show',true)
                this.$set(item,'value','')
                this.$set(item,'valueName','')
                this.$set(item,'valueCode','')
                this.$set(item,'skuItemArr',[])
            },
            //创建v-model参数结构
            createModelSkuList(){
                var result = []
                this.skuList.forEach((item)=>{
                    result.push({
                        propertyId:item.propertyId,
                        propertyCode:item.propertyCode,
                        value:item.value,
                        valueCode:item.valueCode
                    })
                })
                return result
            },
            //促发input事件
            setModelValue(){
                var result = this.createModelSkuList()
                this.setSelectedData()
                this.$emit('input',result)
            },
            //设置已选UI的数组
            setSelectedData(){
                this.seletedData = this.skuList.filter((item)=>{
                    return item.value
                })
//                console.log(this.seletedData);
            },
            //外面有v-model值的回填的时候，更新视图的一些操作
            compareAndSetModel(nv){
                let old = this.createModelSkuList()
                if(!isSameObj(old, nv)){
                    this.skuList.forEach((item)=>{
                        nv.forEach((subItem)=>{
                            if(item.propertyCode===subItem.propertyCode){
                                item.value = subItem.value
                                item.valueCode = subItem.valueCode
                                item.valueName = subItem.valueName
                            }
                            if(item.value){
                                this.hideItem(item.propertyCode)
                            }
                        })
                    })
                    this.setModelValue()
                }
            },
            //暴露给外部用的方法
            //显示指定的SKU Item
            showItem(propertyCode){
                let cur = this.skuList.find((item)=>{
                    return item.propertyCode===propertyCode
                })
                cur.show = true
            },
            //隐藏指定的SKU item
            hideItem(propertyCode){
                let cur = this.skuList.find((item)=>{
                    return item.propertyCode===propertyCode
                })
                cur.show = false
            },
            //设定指定item的model值
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
            //拿到传进来的dataSource后为了不污染，先进行深拷贝
            skuData(nv){
                if(nv&&nv.length){
                    var skuList = deepCopy(nv)
                    skuList.forEach((item)=>{
                        this.initSkuData(item)
                        this.getSkuItemList(item)
                    })
                    this.skuList = skuList
                    this.setModelValue()
                    //v-model就绪后暴露出去的方法
                    this.$emit('skuLoaded')
                }
            },
            value:{
                //主要是用来v-model有回填时候
                handler(nv){
                    if(nv&&nv.length){
                        this.compareAndSetModel(nv)
                    }
                },
                deep:true
            }
        }
    }
</script>
