
<script>
    import {deepCopy} from '@portal/utils/lwh-utils'
    import {mapActions} from 'vuex'
    import {Message} from 'element-ui'
    import componentReader from '@portal/views/demo/component/registComponent/utils/componentReader'
    import defaultValidateRule from '@portal/views/demo/component/registComponent/utils/defaultvalidateRule'

    let hbValidater = require('@portal/utils/hb-validater')

    function warnTip(a,message){
        Message({
            message:message,
            type:'warning'
        })
    }
    let valider = new hbValidater(warnTip)
    export default {
        props:{
            dataSource:{
                type:Array
            }
        },
        data(){
            return {
                copyDataSource:[],
                registInfo:{

                },
                haha:'',
                ui:{
                    required:{

                    },
                    show:{

                    },
                    placeholder:{

                    },
                    keyName:{

                    }
                }
            }
        },
        mounted(){
//            this.initData()
        },
        methods:{
            getNodeArr(createEle,context){
                let nodesArr = []
                this.dataSource.forEach((item)=>{
                    let slot = this.$scopedSlots[`${item.key}Slot`]//认#a='{user}'
//                    let slot = this.$slots.aaa//只认#a后面带了作用域参数不认
                    if(slot){
                        nodesArr.push(createEle('li', slot({
                            registInfo:context.registInfo
                        })))
                    }else{
                        nodesArr.push(createEle('li',{
                            class:{
                                hide:!context.ui.show[item.key]
                            }
                        }, componentReader(context,item.key,createEle)[item.key]))
                    }
                })
                return nodesArr
            },
            initComponentData(nv){
                nv.forEach((item)=>{
                    //初始化是否显示
                    this.$set(this.ui.show,item.key,item.show)
                    //初始化是否必填
                    this.$set(this.ui.required,item.key,item.required)
                    //初始化placeholder
                    this.$set(this.ui.placeholder,item.key,item.placeholder)
                    //初始化keyName
                    this.$set(this.ui.keyName,item.key,item.keyName)
                    //初始化注册MODEL字段
                    this.$set(this.registInfo,item.key,item.value)
                })
            },
            initDataSource(nv){
                //item属性：required:是否必填  show:是否显示 value:默认值
                nv.forEach((item)=>{
                    item.required===false?this.$set(item,'required',false):this.$set(item,'required',true)
                    item.show===false?this.$set(item,'show',false):this.$set(item,'show',true)
                    this.$set(item,'value',item.value)
                    this.$set(item,'placeholder',item.placeholder)
                    this.$set(item,'keyName',item.keyName)
                })
            }
        },
        render(createEle){
            let _this = this
            let nodeArr = this.getNodeArr(createEle,this)
            return createEle('div',{
                //dom上原有的属性
            },[
                createEle('ul',{},nodeArr),
                createEle('button',{
                    domProps: {
                        innerHTML: '提交'
                    },
                    on:{
                        click(){
//                            _this.$emit('haha',_this.registInfo)
//                            _this.ui.loginInput = true
                            console.log(_this.registInfo);
                            defaultValidateRule.forEach((item)=>{
                                item.value = _this.registInfo[item.key]
                            })
                            let r = valider.validate(defaultValidateRule)
                            console.log(r);
                        }
                    }
                })
            ])
        },
        watch:{
            dataSource:{
                handler(nv){
                    if(nv&&nv.length){
                        let copyDataSource
                        copyDataSource = deepCopy(nv)
                        this.initDataSource(copyDataSource)
                        this.initComponentData(copyDataSource)
                        this.copyDataSource = copyDataSource
                    }
                },
                immediate:true
            }
        }
    }
</script>
