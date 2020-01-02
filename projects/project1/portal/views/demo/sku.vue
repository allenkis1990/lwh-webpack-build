<template>
    <div>
        <el-button type="primary"
                   @click="getSkuData">刷新SKU列表
        </el-button>
        <sku-list :sku-data="skuData"
                  @itemChanged="itemChanged"
                  @beforeItemChanged="beforeItemChanged"
                  @cancelSelect="cancelSelect"
                  @skuLoaded="skuLoaded"
                  @beforeClearSelected="beforeClearSelected"
                  @clearSelectedBar="clearSelectedBar"
                  ref="skuComponent"
                  v-model="skuParams"></sku-list>

        <div>已选SKU：</div>
        <div v-for="(item,index) in skuParams" :key="item.propertyCode">
            propertyId:{{item.propertyId}} ,propertyCode:{{item.propertyCode}} ,value:{{item.value}} ,,valueCode:{{item.valueCode}}
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {Button} from 'element-ui'
    import skuList from '@portal/views/demo/component/skuComponent/skuList.vue'

    export default {
        data() {
            return {
                skuData: [],
                skuParams: [],
                urlParams:[]
            }
        },
        mounted() {
            this.getSkuData()
        },
        methods: {
            ...mapActions('demo', {
                getSkuActions: 'getSkuDetail'
            }),
            getSkuData(){
                let _this = this
                this.getSkuActions().then(function (data) {
                    _this.skuData = data.info
                })
            },
            //取消全部之前
            beforeClearSelected(selectedArr,next){
                console.log('取消全部之前');
                next()
            },
            clearSelectedBar(){
                console.log('取消全部之后');
            },
            setUrlParamsInSkuList(){
                this.urlParams = JSON.parse(this.$route.query.urlParams)
                if(Array.isArray(this.urlParams)&&this.urlParams.length){
                    this.skuParams = this.urlParams
                    console.log(this.skuParams,3333);
                }
            },
            skuLoaded(){
                this.urlParams = this.$route.query.urlParams
                if(this.urlParams){
                    this.setUrlParamsInSkuList()
                }
            },
            beforeItemChanged(item,next){
                console.log('点击前调用');
                next()
            },
            itemChanged(item){
//                var skuListComponent = this.$refs.skuComponent
//                if(item.valueCode==='quanzhou'){
//                    skuListComponent.hideItem('year')
//                    skuListComponent.setItemValue('year','','','')
//                }
            },
            cancelSelect(item){
//                var skuListComponent = this.$refs.skuComponent
//                if(item.valueCode==='quanzhou'){
//                    skuListComponent.showItem('year')
//                }
            }
        },
        components: {
            skuList,
            elButton: Button
        },
        watch:{
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
