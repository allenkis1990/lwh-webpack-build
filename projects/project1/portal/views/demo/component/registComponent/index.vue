
<script>
    import {deepCopy} from '@portal/utils/lwh-utils'
    import {mapActions} from 'vuex'
    import {Message} from 'element-ui'
    import componentReader from '@portal/views/demo/component/registComponent/utils/componentReader'
    import rules from '@portal/views/demo/component/registComponent/utils/defaultvalidateRule'

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
            setTimeout(()=>{
                console.log(this.ui);
            },3000)
        },
        methods:{
            getNodeArr(createEle,context){
                let nodesArr = []
                this.copyDataSource.forEach((item)=>{
                    let slot = this.$scopedSlots[`${item.key}`]//认#a='{user}'
//                    let slot = this.$slots.aaa//只认#a后面带了作用域参数不认
                    if(slot){
                        nodesArr.push(createEle('li', {
                            class:{
                                hide:!context.ui.show[item.key]
                            }
                        },[
                            slot({
                                registInfo:context.registInfo
                            })
                        ]))
                    }else{
                        let reader = componentReader(context,item.key,createEle)[item.key]
                        //如果组件reader里有才加进dom
                        if(reader){
                            nodesArr.push(createEle('li',{
                                class:{
                                    hide:!context.ui.show[item.key]
                                }
                            }, componentReader(context,item.key,createEle)[item.key]))
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
            },
            getValidateRule(){
                let res = []
                this.copyDataSource.forEach((item)=>{
                    let temp = {
                        key:item.key,
                        required:item.required,
                    }
                    if(item.msg){
                        temp.msg = item.msg
                    }
                    temp.needRegValid = item.needRegValid===undefined?false:item.needRegValid
                    if(typeof item.validate==='object'){
                        temp.validate = item.validate
                    }
                    res.push(temp)
                })
                return res
            },
            setRegValueAndMerge(){
                let curValidateRule = this.getValidateRule()
                let defaultValidateRule = deepCopy(rules)
                curValidateRule.forEach((item)=>{
                    defaultValidateRule.forEach((subItem)=>{
                        if(item.key===subItem.key){
                            for (let key in subItem) {
                                if (!item.hasOwnProperty(key)) {
                                    item[key] = subItem[key]
                                }
                            }
                        }
                    })
                    item.value = this.registInfo[item.key]
                    let isArr= Array.isArray(item.validate)
                    if(isArr){
                        item.validate.forEach((subItem,idx)=>{
                            //给个默认的required,否则下面会被延续
                            subItem.required = true
                            if(!subItem.key){
                                throw 'item.validate數組的key沒有配置'
                            }else{
                                if(this.registInfo.hasOwnProperty(subItem.key)){
                                    subItem.value = this.registInfo[subItem.key]
                                }else{
                                    throw `表單裏沒有找到key:${subItem.key}`
                                }
                            }
                        })
                    }
                    if(!this.ui.show[item.key]){
                        item.required = false
                        item.needRegValid = false
                    }
                })

                //如果其中一个字段被隐藏起来了，校验数组里有引用到这个字段那么把校验数组的这一项的required设置成false
                curValidateRule.forEach((item)=>{
                    if(item.validate&&Array.isArray(item.validate)){
                        item.validate.forEach((subItem)=>{
                            if(item.key!==subItem.key){
                                this.ui.show[subItem.key]
                                if(!this.ui.show[subItem.key]){
                                    subItem.required = false
                                }
                            }
                        })
                    }
                })
                return curValidateRule
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
                //dom上原有的属性
            },[
                createEle('ul',{},nodeArr),
                createEle('button',{
                    domProps: {
                        innerHTML: '提交'
                    },
                    on:{
                        //在点击提交前先看看有没有隐藏的，隐藏的自动把required设置为false needRegValid也设置为false
                        //如果sub校验是个数组并且引用到的key是show为false的 sub的required也设置为false
                        //默认sub的required会给一个true
                        click(){
                            let regRules = _this.setRegValueAndMerge()
//                            console.log(regRules,33333);
//                            _this.$emit('haha',_this.registInfo)

                            let r = valider.validate(regRules)
                            console.log(regRules,33);
                            console.log('注册要提交的信息',_this.registInfo);
                            if(r){
                                console.log('过');
                            }else{
                                console.log('不过');
                            }

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
