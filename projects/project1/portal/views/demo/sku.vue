<template>
    <div>
        <sku-list :sku-data="skuData"
                  @itemChanged="itemChanged"
                  @cancelSelect="cancelSelect"
                  @skuLoaded="skuLoaded"
                  ref="skuComponent"
                  v-model="skuParams"></sku-list>

        <div v-for="(item,index) in skuParams" :key="item.propertyCode">
            propertyId:{{item.propertyId}} ,propertyCode:{{item.propertyCode}} ,value:{{item.value}} ,,valueCode:{{item.valueCode}}
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
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
            let _this = this
            this.getSkuActions().then(function (data) {
                _this.skuData = data.info
            })
        },
        methods: {
            ...mapActions('demo', {
                getSkuActions: 'getSkuDetail'
            }),
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
            itemChanged(item){
                var skuListComponent = this.$refs.skuComponent
                if(item.valueCode==='quanzhou'){
                    skuListComponent.hideItem('year')
                    skuListComponent.setItemValue('year','','','')
                }
            },
            cancelSelect(item){
                var skuListComponent = this.$refs.skuComponent
                if(item.valueCode==='quanzhou'){
                    skuListComponent.showItem('year')
                }
            }
        },
        components: {
            skuList
        },
        watch:{
            skuParams:{
                handler(nv){
                    if(nv&&nv.skuList&&nv.skuList.length){
//                        console.log(nv.skuList,33333);
                    }
                }
            }
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
