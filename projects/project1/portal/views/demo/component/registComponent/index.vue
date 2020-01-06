
<script>
    import {deepCopy} from '@portal/utils/lwh-utils'
    import {mapActions} from 'vuex'
    import componentReader from '@portal/views/demo/component/registComponent/componentReader'
    export default {
        props:{
            dataSource:{
                type:Array
            }
        },
        data(){
            return {
                registInfo:{

                },
                haha:'',
                ui:{}
            }
        },
        mounted(){
            this.initData()
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
                        nodesArr.push(createEle('li', componentReader(context)[item.key]))
                    }
                })
                return nodesArr
            },
            initData(){
                this.dataSource.forEach((item)=>{
                    this.$set(this.ui,item.key,false)
                    this.$set(this.registInfo,item.key,'')
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
                            _this.$emit('haha',_this.registInfo)
//                            _this.ui.loginInput = true
                            console.log(_this.registInfo);
                        }
                    }
                })
            ])
        }
    }
</script>
