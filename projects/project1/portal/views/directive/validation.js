/**
 * Created by Allen Liu on 2019/6/2.
 */
import Vue from 'vue'


var utils = {
    isNull(str){
        return str === undefined || str === null || str.replace(/^\s+/,'').replace(/\s+$/,'') === ''
    }
};
function Validation(){
    this.registInnerDirectives()
}

Validation.prototype = {
    //获取指令的options
    getOptions(directive,compileFn){
        var _this = this;
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
                    initFormObj(compileFn,node,ele,vNode,bind){
                        _this.initFormObj(compileFn,node,ele,vNode,bind,directive)
                        //绑定input事件
                        var context = vNode.context
                        var form = node.name
                        var formItem  = ele.name
                        ele.inputEvent = function(e){
                            var value = e.target.value;
                            context.$set(context[form][formItem],'$dirty',true)
                            if(compileFn){
                                compileFn(ele,bind,vNode,value);
                            } else {
                                _this.compiler[directive](ele,bind,vNode,value)
                            }
                            _this.setInvalid(context[form],context[form][formItem]);
                        }
                        ele.addEventListener('input',ele.inputEvent)
                    },
                    findParentNode(compileFn,node, ele, bind, vNode){
                        if (node.nodeName.toLowerCase() === 'form') {
                            if (!node.name) {
                                return false;
                            }
                            this.initFormObj(compileFn,node,ele,vNode,bind);
                        } else {
                            var parentNode = node.parentNode;
                            methods.findParentNode(compileFn,parentNode,ele,bind,vNode);
                        }
                    }
                }

                if (!required) {
                    return false;
                } else {
                    methods.findParentNode(compileFn,ele.parentNode, ele, bind, vNode);
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
                ele.removeEventListener('input',ele.inputEvent,true);
                ele.inputEvent = null;
            }
        }
    },
    //初始化表单
    initFormObj(compileFn,node,ele,vNode,bind,directive){
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
        if(value){
            context.$set(formItemModel,'$dirty',true)
        }
        if(compileFn){
            compileFn(ele,bind,vNode,value)
        } else {
            this.compiler[directive](ele,bind,vNode,value)
        }
        this.setInvalid(formModel,formItemModel);
    },
    //设置表单过还是没过
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
    //初始化form状态
    initForm(formName,context){
        console.log(context[formName]);
        var form = context[formName]
        form.$invalid = true
        Object.keys(form).forEach(function(key){
            if(key!=='$invalid'){
                form[key].$invalid = true;
                form[key].$dirty = false;

                Object.keys(form[key].$error).forEach(function(subKey){
                    var subKeyObj = form[key].$error;
                    subKeyObj[subKey] = true;
                })

            }
        })
    },
    //解析内置验证指令的方法
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
            if(!utils.isNull(model)){
                vaildObj.$error.required = false;
            } else {
                vaildObj.$error.required = true;
            }
            //typeUtils.setInvalid(fromObj,vaildObj);
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
            if(!utils.isNull(model)){
                //context.$set(vaildObj,'$dirty',true)
//                    console.log(reg.test(model));
                if(reg.test(model)){
                    vaildObj.$error.pattern = false;
                } else {
                    vaildObj.$error.pattern = true;
                }
            } else {
                vaildObj.$error.pattern = true;
            }
            //typeUtils.setInvalid(fromObj,vaildObj);
        }
    },
    registInnerDirectives(){
        Vue.directive('required',this.getOptions('required'))
        Vue.directive('pattern',this.getOptions('pattern'))
    },
    constructor:Validation
}

export default new Validation()