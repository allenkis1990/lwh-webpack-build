<template>
    <div>
        <sku-list :sku-data="skuData"
                  @skuLoaded="skuLoaded"
                  ref="skuComponent"
                  v-model="skuParams"></sku-list>

        <div v-for="(item,index) in skuParams.skuList" :key="item.propertyCode">
            propertyId:{{item.propertyId}} ,propertyCode:{{item.propertyCode}} ,value:{{item.value}} ,,valueCode:{{item.valueCode}}
        </div>

        <!--<button @click="clickBtn">btn</button>-->
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import skuList from '@portal/views/demo/component/skuList.vue'

    export default {
        data() {
            return {
                skuData: [],
                skuParams: {},
                urlParams:{}
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
            clickBtn(){
//                console.log(this.$refs.skuList);
                var skuListComponent = this.$refs.skuComponent
                skuListComponent.hideItem('year')
            },
            setUrlParamsInSkuList(){
                this.urlParams = JSON.parse(this.$route.query.urlParams)
                var skuListComponent = this.$refs.skuComponent
                this.urlParams.forEach((item)=>{
                    skuListComponent.hideItem(item.propertyCode)
                    skuListComponent.setItemValue(item.propertyCode,item.value,item.valueCode,item.valueName)
                })
            },
            skuLoaded(){
                this.setUrlParamsInSkuList()
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
