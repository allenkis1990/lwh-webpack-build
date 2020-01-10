<template>
    <div>
        <el-button @click="click"
                   :loading="loading"
                   type="primary">提交</el-button>
    </div>
</template>

<script>
    import {Button, Message} from 'element-ui'
    import formMap from '@portal/views/demo/component/formComponent/utils/formMap'
    import rules from '@portal/views/demo/component/formComponent/utils/defaultvalidateRule'
    import {deepCopy} from '@portal/utils/lwh-utils'
    let hbValidater = require('@portal/utils/hb-validater')

    function warnTip(a, message) {
        Message({
            message: message,
            type: 'warning'
        })
    }

    let valider = new hbValidater(warnTip)
    export default {
        data() {
            return {
                formData: this.$parent.formData,
                context: this.$parent,
                loading:false
            }
        },
        mounted() {

        },
        methods: {
            //在点击提交前先看看有没有隐藏的，隐藏的自动把required设置为false needRegValid也设置为false
            //如果sub校验是个数组并且引用到的key是show为false的 sub的required也设置为false
            //默认sub的required会给一个true
            click() {

                let _this = this
                function submit(){
                    _this.loading = true
                    _this.context.$emit('submit',_this.formData)
                    setTimeout(()=>{
                        _this.loading = false
                    },3000)
                }

                let regRules = this.setRegValueAndMerge()
//                            console.log(regRules,33333);
//                            _this.$emit('haha',_this.formData)
                console.log(regRules, 33);
                let r = valider.validate(regRules)
                console.log('表单要提交的信息', this.formData);
                if (r) {
                    console.log('表单内部校验过了');
                    let hasEmitEvents = this.hasEmitEvents('beforeSubmit')
                    if(hasEmitEvents){
                        this.context.$emit('beforeSubmit',this.formData,submit)
                    }else{
                        submit()
                    }


                } else {
                    console.log('不过');
                }

            },
            hasEmitEvents(eventName){
                let bol
                if(this.context._events&&this.context._events[eventName]&&this.context._events[eventName].length){
                    bol = true
                }else{
                    bol = false
                }
                return bol
            },
            getValidateRule() {
                let res = []
                this.context.config.forEach((item) => {
                    let temp = {
                        key: item.key,
                        required: item.required,
                    }
                    if (item.msg) {
                        temp.msg = item.msg
                    }
                    temp.needRegValid = item.needRegValid === undefined ? false : item.needRegValid
                    if (typeof item.validate === 'object') {
                        temp.validate = item.validate
                    }
                    res.push(temp)
                })
                return res
            },
            //设置外层的value和内层的value,外层show为false的时候把这层的required,needRegValid设置为false
            commonDo1(item) {
                item.value = this.formData[item.key]
                let isArr = Array.isArray(item.validate)
                if (isArr) {
                    item.validate.forEach((subItem, idx) => {
                        //给个默认的required,否则下面会被延续
                        subItem.required = true
                        if (!subItem.key) {
                            throw 'item.validate數組的key沒有配置'
                        } else {
                            if (this.formData.hasOwnProperty(subItem.key)) {
                                subItem.value = this.formData[subItem.key]
                            } else {
                                throw `表單裏沒有找到key:${subItem.key}`
                            }
                        }
                    })
                }
                if (!this.context.ui.show[item.key]) {
                    item.required = false
                    item.needRegValid = false
                }
            },
            //如果其中一个字段被隐藏起来了，校验数组里有引用到这个字段那么把校验数组的这一项的required，设置成false
            commonDo2(curValidateRule) {
                curValidateRule.forEach((item) => {
                    if (item.validate && Array.isArray(item.validate)) {
                        item.validate.forEach((subItem) => {
                            if (item.key !== subItem.key) {
                                this.context.ui.show[subItem.key]
                                if (!this.context.ui.show[subItem.key]) {
                                    subItem.required = false
                                }
                            }
                        })
                    }
                })
            },
            //如果没有自定义表单策略用的是默认的 那么校验规则直接使用defaultValidateRule
            //如果有自定义表单策略 那么校验规则则是当前的覆盖默认的
            setRegValueAndMerge() {
                let curValidateRule = []
                if (this.context.dataConfig && this.context.dataConfig.length) {
                    curValidateRule = this.getValidateRule()
                    let defaultValidateRule = deepCopy(rules)
                    curValidateRule.forEach((item) => {
                        defaultValidateRule.forEach((subItem) => {
                            if (item.key === subItem.key) {
                                for (let key in subItem) {
                                    if (!item.hasOwnProperty(key)) {
                                        item[key] = subItem[key]
                                    }
                                }
                            }
                        })
                        this.commonDo1(item)
                    })

                    this.commonDo2(curValidateRule)
                } else {
                    curValidateRule = deepCopy(rules)
                    curValidateRule.forEach((item) => {
                        this.commonDo1(item)
                    })
                    this.commonDo2(curValidateRule)
                }

                return curValidateRule
            }
        },
        components: {
            elButton: Button
        },
        watch: {}
    }
</script>
