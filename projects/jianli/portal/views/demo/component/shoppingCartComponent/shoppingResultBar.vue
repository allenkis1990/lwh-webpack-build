<template>
    <div class="shoppingResultBar clear">
        <el-checkbox style="vertical-align:2px;margin-left:15px"
                     :value="checked"
                     @change="selectAll()"></el-checkbox>
        全选
        <span style="margin-left:30px;">
            当前共选中<span class="blue">{{selectedCount}}</span>件商品，总价<span class="blue">{{totalPrice}}</span>元
        </span>
        <el-button type="primary"
                   @click="batchDelete"
                   class="batchDeleteBtn"
                   :loading="loading">批量删除
        </el-button>
        <el-button type="primary"
                   @click="goPay"
                   class="fr payBtn"
                   :loading="loading">去结算
        </el-button>
    </div>
</template>

<script>
    import {deepCopy} from '@portal/utils/lwh-utils'
    import {Checkbox, Button} from 'element-ui'

    export default {
        props: {
            dataSource: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                checked: false,
                loading: false
            }
        },
        mounted() {

        },
        computed:{
            selectedCount(){
                let count = 0
                this.dataSource.forEach((item)=>{
                    item.subList.forEach((subItem)=>{
                        if(subItem.checked){
                            count+=1
                        }
                    })
                })
                return count
            },
            totalPrice(){
                let res = 0
                this.dataSource.forEach((item)=>{
                    item.subList.forEach((subItem)=>{
                        if(subItem.checked){
                            res = (res*1000 + subItem.price*1000)/1000
                        }
                    })
                })
                return res
            }
        },
        methods: {
            loadingDailog(){
                let loading = this.$loading.service({
                    lock: true,
                    spinner: 'el-icon-loading',
                    background:'rgba(0, 0, 0, 0.4)'
                });
                return loading
            },
            doCheck(nv){
                let res
                if(!nv.length){
                    res = false
                }else{
                    res = nv.every((item)=>{
                        return item.checked
                    })
                }
                this.checked = res
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
            },
            doSelect(){
                this.checked = !this.checked
                this.dataSource.forEach((item)=>{
                    item.checked = this.checked
                    item.subList.forEach((subItem)=>{
                        subItem.checked = this.checked
                    })
                })
            },
            selectAll(){
                let context = this
                function selectAll(context){
                    context.doSelect()
                    context.$emit('selectAll')
                }
                let hasEmitEvents = this.hasEmitEvents('beforeSelectAll')
                if(hasEmitEvents){
                    this.$emit('beforeSelectAll',()=>{
                        selectAll(context)
                    })
                }else{
                    selectAll(context)
                }
            },
            getPayParams(){
                let result = []
                this.dataSource.forEach((item)=>{
                    item.subList.forEach((subItem)=>{
                        if(subItem.checked){
                            result.push({
                                id:subItem.id,
                                name:subItem.name
                            })
                        }
                    })
                })
                return result
            },
            goPay(){
                let context = this
                function goPay(context){
                    context.loading = true
                    let payParams = context.getPayParams()
                    console.log('要提交的数据是======》',payParams)
                    setTimeout(()=>{
                        context.loading = false
                        context.$emit('goPay')
                        context.$message({
                            message:'操作成功',
                            type:'success'
                        })
                    },3000)
                }
                if(this.selectedCount<=0){
                    this.$message({
                        message:'请至少选择一件商品进行结算',
                        type:'warning'
                    })
                    return false
                }
                let hasEmitEvents = this.hasEmitEvents('beforeGoPay')
                if(hasEmitEvents){
                    this.$emit('beforeGoPay',()=>{
                        goPay(context)
                    })
                }else{
                    goPay(context)
                }
            },
            batchDeleteAction(cb){
                setTimeout(()=>{
                    cb&&cb()
                },2000)
            },
            doBatchDelete(){
                let shoppingCartList = deepCopy(this.dataSource)
                if(this.checked){
                    shoppingCartList = []
                }else{
                    let some = shoppingCartList.some((item)=>{
                        return item.checked
                    })
                    if(some){
                        shoppingCartList =  shoppingCartList.filter((item)=>{
                            return !item.checked
                        })
                    }
                    shoppingCartList.forEach((item)=>{
                        item.subList = item.subList.filter((subItem)=>{
                            return !subItem.checked
                        })
                    })
                }
                this.$emit('changeShoppingData',shoppingCartList)
            },
            batchDelete(){
                let context = this
                if(this.selectedCount<=0){
                    this.$message({
                        message:'请至少选择一件商品进行删除',
                        type:'warning'
                    })
                    return false
                }
                this.$messageBox({
                    title:'批量删除商品',
                    message:'确定批量删除商品吗?',
                    showCancelButton:true,
                    beforeClose(type,dialog,done){
                        function batchDelete(context){
                            let loading = context.loadingDailog()
                            context.batchDeleteAction(()=>{
                                context.doBatchDelete()
                                loading.close()
                                done()
                            })
                        }
                        if(type==='confirm'){
                            let hasEmitEvents =  context.hasEmitEvents('beforeBatchDelete')
                            if(!hasEmitEvents){
                                batchDelete(context)
                            }else{
                                context.$emit('beforeBatchDelete',()=>{
                                    batchDelete(context)
                                })
                            }
                        }else{
                            done()
                        }
                    },
                    callback(type,dialog){
                        if(type==='confirm'){
                            context.$emit('batchDelete')
                        }
                    },
                })
            }
        },
        components: {
            elCheckbox: Checkbox,
            elButton: Button
        },
        watch: {
            dataSource:{
                handler(nv){
                    this.doCheck(nv)
                },
                deep:true
            }
        }
    }
</script>
<style scoped>
    .shoppingResultBar {
        width: 100%;
        background: red;
        height: 50px;
        line-height: 50px;
    }

    .shoppingResultBar .blue {
        font-weight: bold
    }

    .shoppingResultBar .payBtn {
        margin-top: 6px;
        margin-right: 35px;
    }
    .shoppingResultBar .batchDeleteBtn {
        vertical-align: 2px;
    }
</style>
