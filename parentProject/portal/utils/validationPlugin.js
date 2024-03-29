/**
 * Created by Allen Liu on 2019/6/2.
 */

/**
  使用方法API见：https://www.allen19906666.com/vueDemo/demo-validationPlugin
 */

var utils = {
    isNull(str){
        if(typeof str === 'object'){
            var s = JSON.stringify(str)
            if(s==='{}'){
                return true
            }else if(s==='[]'){
                return true
            }else{
                return false
            }
        }else{
            return str === undefined || str === null || str.replace(/^\s+/,'').replace(/\s+$/,'') === ''
        }
    },
    //是不是原生表单，如果是组件或者div之类的就不是
    isNativeFormType(ele){
        return ele.nodeName.toLowerCase()==='input' || ele.nodeName.toLowerCase()==='select'
    }
};
var watcher = {}
var curVm
function Validation(){}
Validation.prototype = {
    //获取指令的options(暴露外用)
    getOptions(directive,compileFn){
        var _this = this;
        return {
            inserted(ele, bind, vNode){
                curVm = vNode.context
                var model
                var isNativeFormType = utils.isNativeFormType(ele)
                //原生的表单元素model在vNode.data.directives数组里，非原生的在vNode.data.model
                if(!isNativeFormType){
                    //Vue组件的name存在vNode.componentInstance里
                    if(vNode.componentInstance){
                        ele.name = vNode.componentInstance.name || vNode.componentInstance.$attrs.name
                    }else{
                        ele.name = ele.getAttribute('name')
                    }
                    // console.log(ele.name,ele.nodeName,'111111');
                    model = vNode.data.model
                  // debugger
                }else{
                    var directives = vNode.data.directives;
                    // debugger
                    model = directives.find(function(item){
                        return item.name === 'model'
                    })
                }
                // console.log(vNode,33333);
                if(!ele.name){
                    return false;
                }
                if(!model){
                    throw new Error('表单name为'+ele.name+'的v-model未定义')
                }
                // console.log(model,44444);
                //缓存v-model表达式名称
                ele.formModelName = model.expression;
//                console.log(bind.value);
                var required = bind.value;
                debugger
                var methods = {
                    //初始化表单验证对象
                    initFormObj(compileFn,node,ele,vNode,bind){
                        _this.initFormObj(compileFn,node,ele,vNode,bind,directive)
                        //绑定input事件
                        var context = vNode.context
                        var form = node.name
                        var formItem  = ele.name
                        var isNativeFormType = utils.isNativeFormType(ele)
                        function changeModelDo(v){
                            v = v || ''
                            var value = v;
                            context.$set(context[form][formItem],'$dirty',true)
                            if(compileFn){
                                compileFn(ele,bind,vNode,value);
                            } else {
                                _this.compiler[directive](ele,bind,vNode,value)
                            }
                            _this.setInvalid(context[form],context[form][formItem]);
                        }
                        //如果是原生表单元素用监听input事件，如果不是就直接watch对象
                        /*if(isNativeFormType){
                            ele.inputEvent = function(e){
                                var value = e.target.value;
                                changeModelDo(value)
                            }
                            ele.addEventListener('input',ele.inputEvent)
                        }else{
                            var changeCount = 0
                            context.$watch(ele.formModelName,function(nv){
                                //有值或者非第一次都视为$dirty
                                console.log(utils.isNull(nv),222);
                                if(!utils.isNull(nv)|| changeCount>0){
                                    changeModelDo(nv)
                                }
                                changeCount ++
                            },{deep:true,immediate:true})
                        }*/
                        // console.log(ele.name);
                        var changeCount = 0
                        context.$watch(ele.formModelName,function(nv){
                            //有值或者非第一次都视为$dirty
                            console.log(utils.isNull(nv),222);
                            if(!utils.isNull(nv)|| changeCount>0){
                                changeModelDo(nv)
                            }
                            changeCount ++
                        },{deep:true,immediate:true})
                    },
                    findParentNode(compileFn,node, ele, bind, vNode){
                        if (node.nodeName.toLowerCase() === 'form') {
                            if (!node.name) {
                                return false;
                            }
                            //新建一个watcher的form对象,用于销毁
                            if(!watcher.hasOwnProperty(node.name) || !watcher[node.name]){
                                watcher[node.name] = {}
                            }
                            this.initFormObj(compileFn,node,ele,vNode,bind);
                        } else {
                            var parentNode = node.parentNode;
                            methods.findParentNode(compileFn,parentNode,ele,bind,vNode);
                        }
                    }
                }

                //required为指令的值，没有值什么都不做
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
                //有watcher的话销毁watcher
                if(watcher[ele.formName]){
                    let curWatcher = watcher[ele.formName][ele.formItemName]
                    if(curWatcher){
                        curWatcher()
                        curWatcher = undefined
                    }

                    let watcherKeys = Object.keys(watcher[ele.formName])
                    let mapperWatcher = watcherKeys.map((item)=>{
                        return watcher[ele.formName][item]!==undefined
                    })
                    if(!mapperWatcher.length){
                        watcher[ele.formName] = null
                        // console.log(curVm,watcher,'vm');
                        console.log(`form==>${ele.formName}销毁成功！`)
                    }
                }


                //不是watcher的话销毁dom监听事件
                ele.formName = null;
                ele.formItemName = null;
                ele.formModelName = null;
                ele.removeEventListener('input',ele.inputEvent,true);
                ele.inputEvent = null;
            }
        }
    },
    //初始化form状态(暴露外用)
    initForm(formName,context){
        // console.log(context[formName]);
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

    //初始化表单错误对象===》相当于创建myForm2:{userName:{$error:{}}}(暴露外用)
    initFormErrorObj(formName,formItemList){
        let obj = {
            [formName]:{}
        }
        formItemList.forEach((item)=>{
            obj[formName][item] = {
                $error:{}
            }
        })
        return obj
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
        if(!utils.isNull(value)){
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
                vaildObj.$error.pattern = false;
            }
            //typeUtils.setInvalid(fromObj,vaildObj);
        }
    },
    registInnerDirectives(Vue){
        Vue.directive('required',this.getOptions('required'))
        Vue.directive('pattern',this.getOptions('pattern'))
    },
    constructor:Validation
}
let vueFormValidation = new Validation()



let validationPlugin = {
    install(Vue){
        vueFormValidation.registInnerDirectives(Vue)
    }
}

export let getOptions = vueFormValidation.getOptions.bind(vueFormValidation)
export let initForm = vueFormValidation.initForm.bind(vueFormValidation)
export let initFormErrorObj = vueFormValidation.initFormErrorObj.bind(vueFormValidation)
export default validationPlugin