<template>
    <tbody>
        <tr>
            <td colspan="4" style="text-align:left">
                <el-checkbox :value="dataSource.checked"
                             @change="selectOneUnit(dataSource)"
                             style="vertical-align:2px;margin-left:12px;"></el-checkbox>{{dataSource.name}}
            </td>
        </tr>
        <tr v-for="(item,index) in dataSource.subList" :key="item.id">
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
            dataSource:{
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
            selectItem(item){
                let context = this
                function selectItem(context){
                    item.checked = !item.checked
                    let selectOneUnit = context.dataSource.subList.every((item)=>{
                        return item.checked
                    })
                    if(selectOneUnit){
                        context.dataSource.checked = true
                    }else{
                        context.dataSource.checked = false
                    }
                    context.$emit('selectItem',context,context.dataSource)
                }
                let hasEmitEvents = this.hasEmitEvents('beforeSelectItem')
                if(!hasEmitEvents){
                    selectItem(context)
                }else{
                    this.$emit('beforeSelectItem',item,this.dataSource,()=>{
                        selectItem(context)
                    })
                }
            },
            selectOneUnit(dataSource){
                let context = this
                let hasEmitEvents =  this.hasEmitEvents('beforeSelectOneUnit')
                if(!hasEmitEvents){
                    selectOneUnit(context)
                }else{
                    this.$emit('beforeSelectOneUnit',this.dataSource,()=>{
                        selectOneUnit(context)
                    })
                }


                function selectOneUnit(context){
                    dataSource.checked = !dataSource.checked
                    if(dataSource.checked){
                        context.selectUnit(dataSource,true)
                    }else{
                        context.selectUnit(dataSource,false)
                    }
                    context.$emit('selectOneUnit',dataSource)
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
                        function deleteItem(context){
                            let loading = context.loading('删除商品中请稍后')
                            context.deleteAction(()=>{
                                loading.close();
                                let subList = context.dataSource.subList
                                subList.splice(idx,1)
                                if(!subList.length){
                                    context.$emit('deleteOneUnit',context.dataSource.id)
                                }
                                done()
                            })
                        }
                        if(type==='confirm'){
                            let hasEmitEvents =  context.hasEmitEvents('beforeDeleteItem')
                            if(!hasEmitEvents){
                                deleteItem(context)
                            }else{
                                context.$emit('beforeDeleteItem',item,()=>{
                                    deleteItem(context)
                                })
                            }
                        }else{
                            done()
                        }
                    },
                    callback(type,dialog){
                        if(type==='confirm'){
                            context.$emit('deleteItem',item)
                        }
                    },
                })
            },
            selectUnit(dataSource,boolean){
                dataSource.subList.forEach((item)=>{
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
