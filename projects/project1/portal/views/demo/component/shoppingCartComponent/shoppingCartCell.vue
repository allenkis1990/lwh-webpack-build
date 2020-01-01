<template>
    <tbody>
        <tr>
            <td colspan="4" style="text-align:left">
                <el-checkbox :value="cellData.checked"
                             @change="selectOneUnit(cellData)"
                             style="vertical-align:2px;margin-left:12px;"></el-checkbox>{{cellData.name}}
            </td>
        </tr>
        <tr v-for="(item,index) in cellData.subList" :key="item.id">
            <td><el-checkbox style="vertical-align:2px;"
                             :value="item.checked"
                             @change="selectItem(item)"></el-checkbox>{{index+1}}</td>
            <!--<td><input type="checkbox" v-model="item.checked">{{index+1}}</td>-->
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
            <td><a href="javascript:void(0)" @click="deleteItem(item,index)">删除</a></td>
        </tr>
    </tbody>
</template>

<script>
    import {Checkbox} from 'element-ui'
    export default {
        props:{
            cellData:{
                type:Object,
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
            loading(msg){
                let loading = this.$loading.service({
                    lock: true,
                    spinner: 'el-icon-loading',
                    background:'rgba(0, 0, 0, 0.4)'
                });
                return loading
            },
            //获取当前组件下emit出去的事件return
            hasEmitEvents(eventName){
                let bol
                if(this._events&&this._events[eventName]&&this._events[eventName].length){
                    bol = true
                }else{
                    bol = false
                }
                return bol
            },
            selectItem(item){
                let context = this
                function beforeSelectItem(context){
                    item.checked = !item.checked
                    let selectOneUnit = context.cellData.subList.every((item)=>{
                        return item.checked
                    })
                    if(selectOneUnit){
                        context.cellData.checked = true
                    }else{
                        context.cellData.checked = false
                    }
                    context.$emit('selectItem',context,context.cellData)
                }
                let hasEmitEvents = this.hasEmitEvents('beforeSelectItem')
                if(!hasEmitEvents){
                    beforeSelectItem(context)
                }else{
                    this.$emit('beforeSelectItem',item,this.cellData,()=>{
                        beforeSelectItem(context)
                    })
                }
            },
            selectOneUnit(cellData){
                let context = this
                let hasEmitEvents =  this.hasEmitEvents('beforeSelectOneUnit')
                if(!hasEmitEvents){
                    beforeSelectOneUnit(context)
                }else{
                    this.$emit('beforeSelectOneUnit',this.cellData,()=>{
                        beforeSelectOneUnit(context)
                    })
                }


                function beforeSelectOneUnit(context){
                    cellData.checked = !cellData.checked
                    if(cellData.checked){
                        context.selectUnit(cellData,true)
                    }else{
                        context.selectUnit(cellData,false)
                    }
                    context.$emit('selectOneUnit',cellData)
                }
            },
            deleteAction(cb){
                setTimeout(()=>{
                    cb&&cb()
                },500)
            },
            deleteItem(item,idx){
                console.log('删除id'+item.id)
                let context = this
                this.$messageBox({
                    title:'删除商品',
                    message:'确定删除当前商品吗?',
                    showCancelButton:true,
                    beforeClose(type,dialog,done){
                        function beforeDeleteItem(context){
                            let loading = context.loading('删除商品中请稍后')
                            context.deleteAction(()=>{
                                loading.close();
                                let subList = context.cellData.subList
                                subList.splice(idx,1)
                                if(!subList.length){
                                    context.$emit('deleteOneUnit',context.cellData.id)
                                }
                                done()
                            })
                        }
                        if(type==='confirm'){
                            let hasEmitEvents =  context.hasEmitEvents('beforeDeleteItem')
                            if(!hasEmitEvents){
                                beforeDeleteItem(context)
                            }else{
                                context.$emit('beforeDeleteItem',item,()=>{
                                    beforeDeleteItem(context)
                                })
                            }
                        }else{
                            done()
                        }
                    },
                    callback(type,dialog){
                        context.$emit('deleteItem',item)
                    },
                })
            },
            selectUnit(cellData,boolean){
                cellData.subList.forEach((item)=>{
                    item.checked = boolean
                })
            }
        },
        components:{
            elCheckbox:Checkbox
        },
        watch:{

        }
    }
</script>
