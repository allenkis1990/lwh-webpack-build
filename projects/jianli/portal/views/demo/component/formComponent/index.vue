
<script>
    import {deepCopy} from '@portal/utils/lwh-utils'
    import {mapActions} from 'vuex'
    import submitBtn from '@portal/views/demo/component/formComponent/submitBtn.vue'
    import formMap from '@portal/views/demo/component/formComponent/utils/formMap'

    export default {
        props:{
            dataConfig:{
                type:Array
            },
            notConfigShow:{
                type:Boolean,
                default:true
            }
        },
        components:{
            ...formMap,
            submitBtn
        },
        data(){
            return {
                config:[],
                formData:{

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
            setTimeout(()=>{
                console.log(this.ui);
            },3000)
        },
        methods:{
            getNodeArr(createEle,context){
                let nodesArr = []
                this.config.forEach((item)=>{
                    let slot = this.$scopedSlots[`${item.key}`]//认#a='{user}'
//                    let slot = this.$slots.aaa//只认#a后面带了作用域参数不认
                    if(slot){
                        nodesArr.push(createEle('li', {
                            class:{
                                hide:!context.ui.show[item.key]
                            }
                        },[
                            slot({
                                formData:context.formData
                            })
                        ]))
                    }else{
                        let reader = formMap[item.key]
                        let reg = /[A-Z]/g
//                        console.log(item.key,111);
                        let eleStr = item.key.replace(reg,function(word){
//                            console.log(word);//userName=>N
                            return '-'+word.toLowerCase()
                        })
                        //如果组件reader里有才加进dom
                        if(reader){
                            nodesArr.push(createEle('li',{
                                class:{
                                    hide:!context.ui.show[item.key]
                                }
                            }, [
                                createEle(eleStr,{
                                    attrs:{
                                        property:item.key
                                    }
                                })
                            ]))
                        }
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
                    this.$set(this.formData,item.key,item.value)
                })
            },
            initConfig(nv){
                //item属性：required:是否必填  show:是否显示 value:默认值
                nv.forEach((item)=>{
                    item.required===false?this.$set(item,'required',false):this.$set(item,'required',true)
                    item.show===false?this.$set(item,'show',false):this.$set(item,'show',true)
                    this.$set(item,'value',item.value)
                    this.$set(item,'placeholder',item.placeholder)
                    this.$set(item,'keyName',item.keyName)
                })
            },
            //ref暴露出去的方法
            showItem(key){
                this.ui.show[key] = true
            },
            hideItem(key){
                this.ui.show[key] = false
            }
        },
        render(createEle){
            let _this = this
            let nodeArr = this.getNodeArr(createEle,this)
            return createEle('div',{
                class:{
                    hide:!_this.config.length
                }
            },[
                createEle('ul',{},nodeArr),
                createEle('submit-btn')
            ])
        },
        watch:{
            dataConfig:{
                handler(nv){
                    let config
                    let _this = this
                    function init(dataConfig){
                        config = deepCopy(dataConfig)
                        _this.initConfig(config)
                        _this.initComponentData(config)
                        _this.config = config
                    }
                    if(nv&&nv.length){
                        //有config传进来,使用传进来的config
                        init(nv)
                    }else{
//                        console.log('没有config传进来,默认取全部表单');
                        //没有config传进来,默认取全部表单
                        //notConfigShow为false的时候不展示默认所有表单
                        if(this.notConfigShow){
                            let mapper = Object.keys(formMap)
                            let config = []
                            mapper.forEach((key)=>{
                                config.push({
                                    key:key
                                })
                            })
//                        console.log(config);
                            init(config)
                        }
                    }
                },
                immediate:true
            }
        }
    }
</script>
