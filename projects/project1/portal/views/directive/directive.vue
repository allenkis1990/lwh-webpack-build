<template>
    <div>
        <div>指令基本用法</div>
        <div v-my-directive="dataSource">
            <div>我是指令内部的元素
                <button>修改外部data</button>
            </div>
        </div>
        <button @click="fn()">检验外部data是否变化</button>
        <button @click="fuck()">随机改变外部值</button>
        <div>
            dataSource:{{dataSource}}
        </div>
        <hr>
        <div>实现表单校验指令</div>
        <div>
            <form name="myForm">
                <ul>
                    <li>
                        用户名：<input type="text"
                               v-pattern="/^[a-zA-Z]+$/"
                               v-model="userName"
                               name="userName"
                               placeholder="请输入用户名"
                               v-required="true">
                        <span style="color:red" v-if="myForm.userName.$error.required&&myForm.userName.$dirty">请输入用户名</span>
                        <span style="color:red" v-if="myForm.userName.$error.pattern&&myForm.userName.$dirty">请输入英文</span>
                    </li>
                    <li>
                        爱好：<select name="sel"
                                v-model="sel.data"
                                v-required="true">
                            <option value="">请选择</option>
                            <option value="1">篮球</option>
                            <option value="2">游戏</option>
                        </select>
                        <span style="color:red" v-if="myForm.sel.$error.required&&myForm.sel.$dirty">请选择一个内容</span>
                    </li>


                    <li>
                        电话号码：<input type="text"
                                   v-pattern="/^\d{11}$/"
                                   v-model="phone"
                                   name="phone"
                                   placeholder="请输入电话号码"
                                   v-required="true">
                        <span style="color:red" v-if="myForm.phone.$error.required&&myForm.phone.$dirty">请输入电话号码</span>
                        <span style="color:red" v-if="myForm.phone.$error.pattern&&myForm.phone.$dirty">请输入11位电话号码</span>
                    </li>

                    <li style="color:red" v-if="myForm.$invalid">整个表单没过</li>
                </ul>
            </form>
        </div>
    </div>
</template>

<script>
    /**
     * 1.传进指令的data数据不是双向绑定的
     * 2.只要外部有data发生变化就会触发指令内部的update钩子，需要去对比oldvalue和newValue
     * 3.vNode.context修改指令外部的data
     */
    import Vue from 'vue'

    var typeUtils = {
        initFormObj(node,ele,vNode,bind,directive){
            //缓存form的name
            ele.formName = node.name;
            //缓存input的name
            ele.formItemName = ele.name;
            var context = vNode.context;
            var formModel = context[ele.formName]
            var formItemModel = formModel[ele.formItemName]
            var $error = formItemModel.$error
            //初始化都是触发表单错误
            context.$set($error,directive,true)
            //默认子表单没过
            context.$set(formItemModel,'$invalid',true)
            //默认整个表单没过
            context.$set(formModel,'$invalid',true)
            var value = eval(`context.${ele.formModelName}`)
            this.compiler[directive](ele,bind,vNode,value)
        },
        setInvalid(fromObj,vaildObj){
            //设置表单item过没过
            var errValues = Object.values(vaildObj.$error)
            var invalid = errValues.some(function(item){
                return item === true
            })
            vaildObj.$invalid = invalid;



            //设置整个表单过没过
            var formValues = [];
            Object.keys(fromObj).forEach(function(key){
//                console.log(fromObj[key].$invalid);
                var hasProperty = fromObj[key].hasOwnProperty('$invalid')
                if(hasProperty){
                    formValues.push(fromObj[key].$invalid)
                }
            })
            var formInvalid = formValues.some(function(item){
                return item === true
            })
            fromObj.$invalid = formInvalid
//            console.log(invalid);
        },
        compiler:{
            required(ele,bind,vNode,model){
                var context = vNode.context;
                var form = ele.formName,
                        formItem = ele.formItemName;
//                        modelName = ele.formModelName;
                var fromObj = context[form]
                var vaildObj = context[form][formItem]
//                var model = eval(`context.${modelName}`)
//                console.log(model,1212);
                if(model){
                    context.$set(vaildObj,'$dirty',true)
                    vaildObj.$error.required = false;
                } else {
                    vaildObj.$error.required = true;
                }
                typeUtils.setInvalid(fromObj,vaildObj);
            },
            pattern(ele,bind,vNode,model){
                var context = vNode.context;
                var form = ele.formName,
                        formItem = ele.formItemName;
//                        modelName = ele.formModelName;
                var fromObj = context[form]
                var vaildObj = fromObj[formItem];
//                var model = eval(`context.${modelName}`)
                var reg = bind.value;
                if(model){
                    context.$set(vaildObj,'$dirty',true)
//                    console.log(reg.test(model));
                    if(reg.test(model)){
                        vaildObj.$error.pattern = false;
                    } else {
                        vaildObj.$error.pattern = true;
                    }
                } else {
                    vaildObj.$error.pattern = true;
                }
                typeUtils.setInvalid(fromObj,vaildObj);
            }
        }
    }
    function getOptions(directive){
        return {
            inserted(ele, bind, vNode){
                if(!ele.name){
                    return false;
                }

                var directives = vNode.data.directives;
                var model = directives.find(function(item){
                    return item.name === 'model'
                })
                if(!model){
                    throw new Error('表单name为'+ele.name+'的v-model未定义')
                }

                //缓存v-model表达式名称
                ele.formModelName = model.expression;
//                console.log(bind.value);
                var required = bind.value;
                var methods = {
                    //初始化表单验证对象
                    initFormObj(node,ele,vNode,bind){
                        typeUtils.initFormObj(node,ele,vNode,bind,directive)
                        //绑定input事件
                        ele.addEventListener('input',function(e){
                            var value = e.target.value;
                            typeUtils.compiler[directive](ele,bind,vNode,value)
                        })
                    },
                    findParentNode(node, ele, bind, vNode){
                        if (node.nodeName.toLowerCase() === 'form') {
                            if (!node.name) {
                                return false;
                            }
                            this.initFormObj(node,ele,vNode,bind);
                        } else {
                            var parentNode = node.parentNode;
                            methods.findParentNode(parentNode,ele,bind,vNode);
                        }
                    }
                }

                if (!required) {
                    return false;
                } else {
                    methods.findParentNode(ele.parentNode, ele, bind, vNode);
                }

            },
            update(ele,bind,vNode){
//                console.log(vNode);
//                typeUtils.compiler[directive](ele,bind,vNode)
            },

            unbind(ele,bind){
                //销毁缓存的
                ele.formName = null;
                ele.formItemName = null;
                ele.formModelName = null;
            }
        }
    }
    Vue.directive('required',getOptions('required'))
    Vue.directive('pattern',getOptions('pattern'))
    export default {
        data(){
            return {
                dataSource: "initDataSource",
                userName:'',
                phone:'',
                sel:{data:''},
                myForm:{
                    sel:{
                        $error:{}
                    },
                    userName:{
                        $error:{}
                    },
                    phone:{
                        $error:{}
                    }
                }
            }
        },
        mounted(){
        },
        methods: {
            fn(){
                console.log(this.dataSource, '检验外部data是否变化');
            },
            fuck(){
                this.dataSource = Math.random();
            }
        },
        directives: {
            myDirective: {
                inserted(ele, binding){

                },
                bind(ele, binding, vNode){
                    var VNodeScope = vNode.context;
                    ele.addEventListener('click', function (e) {
                        var target = e.target;
                        if (target.nodeName.toLowerCase() === 'button') {
                            VNodeScope.dataSource = '我被指令内部修改了'
                        }
                    })
                },
                update(ele, binding, vNode){
//                    console.log(binding, '指令内部监听更新');
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
<style lang="less">
    @import "~@portal/less/dialog.less";
</style>
<!--scoped-->
<style lang="less" scoped>
    @import "~@portal/less/onlyPortal.less";
</style>
