<template>
    <div>
        <el-button type="primary"
                   style="margin-bottom:15px;"
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
                  v-model="skuParams">

            <template #default>
                <li style="margin-right:10px"
                    class="skuSelectedItem fl">
                    爱好:
                    <button class="btn current">运动</button>
                </li>
            </template>
        </sku-list>

        <div>已选SKU：</div>
        <div v-for="(item,index) in skuParams" :key="item.propertyCode">
            propertyId:{{item.propertyId}} ,propertyCode:{{item.propertyCode}} ,value:{{item.value}} ,,valueCode:{{item.valueCode}}
        </div>
        <el-button type="primary"
                   style="margin-top:15px;"
                   @click="openMdDialog">readme.md
        </el-button>
        <el-dialog
                   :visible.sync="showReadmeDialog"
                   :fullscreen="true">
            <h2 slot="title" style="color:#333">
                remdme.md
            </h2>
            <div class="read-content">

            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {Button,Dialog} from 'element-ui'
    import skuList from '@portal/views/demo/component/skuComponent/skuList.vue'
    import instance from '@portal/utils/ajaxRequest'
    var $http = instance.create({
        baseURL: '/actions'
    })
    let marked = require('@portal/assets/marked.min')
    export default {
        data() {
            return {
                skuData: [],
                skuParams: [],
                urlParams: [],
                showReadmeDialog:false
            }
        },
        mounted() {
            this.getSkuData()
        },
        methods: {
            ...mapActions('demo', {
                getSkuActions: 'getSkuDetail'
            }),
            openMdDialog(){
                this.showReadmeDialog=true
                setTimeout(()=>{
                    this.initMdContainer()
                },100)
            },
            initMdContainer(){
                $http.request({
                    url: '/md/sku-readme.md',
                    method: 'get'
                }).then((data) => {
                    let res = data.data
                    console.log(res);
                    document.querySelector('.read-content').innerHTML = marked(res)
                    let codeItems = document.querySelectorAll('.read-content code')
                    codeItems.forEach((code)=>{
                        code.setAttribute('class','hljs javascript')
                    })
                })
            },
            getSkuData() {
                let _this = this
                this.getSkuActions().then(function (data) {
                    _this.skuData = data.info
                })
            },
            //取消全部之前
            beforeClearSelected(selectedArr, next) {
                console.log('取消全部之前');
                next()
            },
            clearSelectedBar() {
                console.log('取消全部之后');
            },
            setUrlParamsInSkuList() {
                this.urlParams = JSON.parse(this.$route.query.urlParams)
                if (Array.isArray(this.urlParams) && this.urlParams.length) {
                    this.skuParams = this.urlParams
                    console.log(this.skuParams, 3333);
                }
            },
            skuLoaded() {
                this.urlParams = this.$route.query.urlParams
                if (this.urlParams) {
                    this.setUrlParamsInSkuList()
                }
            },
            beforeItemChanged(item, next) {
                console.log('点击前调用');
                next()
            },
            itemChanged(item) {
//                var skuListComponent = this.$refs.skuComponent
//                if(item.valueCode==='quanzhou'){
//                    skuListComponent.hideItem('year')
//                    skuListComponent.setItemValue('year','','','')
//                }
            },
            cancelSelect(item) {
//                var skuListComponent = this.$refs.skuComponent
//                if(item.valueCode==='quanzhou'){
//                    skuListComponent.showItem('year')
//                }
            }
        },
        components: {
            skuList,
            elButton: Button,
            elDialog: Dialog
        },
        watch: {}
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
