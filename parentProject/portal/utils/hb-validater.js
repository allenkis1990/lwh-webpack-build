/**
 * Created by Allen Liu on 2019/11/2.
 */

/**
 * 校验弹窗提示插件
 * 构造函数HbValidater，参数为弹窗插件方法，可根据项目自行修改
 * HbValidater.prototype.validate方法 返回true或者false如果是false会进行弹窗提示
 * 参数：
 * value为要校验的值 只处理数组和字符串，value为字符串为空时会提示msg value为数组length为空时提示msg
 * msg 未通过校验提示信息
 * required为是否校验不为空  默认为true
 * needRegValid 是否校验正则 默认为false
 * validate:
 * 如果validate是个对象结构是{reg:/^\d+$/,msg:'编号必须为数字'}
 * 如果validate是个数组结构是[{key:'',value:'',reg:'',msg:''}]
 * 例子：
 var list= [{
        value:$scope.model.num,
        msg:'请输入编号',
        needRegValid:true,
        validate:{reg:/^\d+$/,msg:'编号必须为数字'}
    },
 {
     value:$scope.model.name,
     msg:'请输入姓名',
     required:false
 },
 {
     value:[],
     msg:'数组长度必须大于0'
 }]
 * var v = new HbValidater(HB_dialog.warning)
 *
 * $scope.fn = function(){
 *  var r = v.validate(list)
 *  if(r){
 *      alert('校验成功')
 *  }
 * }
 */


var processUtils = {
    arr: function (validItem,context) {
        if (validItem.value.length <= 0) {
            context.dialogFn('提示', validItem.msg);
            return false
        }
    },
    str: function (validItem, context) {
        if (context.isNull(validItem.value)) {
            context.dialogFn('提示', validItem.msg);
            return false
        }
    },
    reg: function (validItem,context) {
        let res = true
        let regObj = validItem.validate
        if(context.isArray(regObj)){
            for(let i=0;i<regObj.length;i++){
                let regItem = regObj[i]
                let value = regObj[i].value
                let msg = regObj[i].msg
                if(!regItem.reg.test(value)){
                    context.dialogFn('提示', msg);
                    return false
                }
            }
        }else{
            if (!regObj.reg.test(validItem.value)) {
                context.dialogFn('提示', regObj.msg);
                return false
            }
        }
        return res
    }
}

function HbValidater(dialogFn) {
    this.dialogFn = dialogFn
}

HbValidater.prototype.validate = function (validateList) {
    if (this.isArray(validateList)) {
        for (var i = 0; i < validateList.length; i++) {
            var validItem = validateList[i]
            this.initValidObj(validItem)
            if (validItem.required) {
                if (this.isArray(validItem.value)) {
                    if (processUtils.arr(validItem,this) === false) {
                        return false
                    }
                } else {
                    if (processUtils.str(validItem, this) === false) {
                        return false
                    }
                    if (validItem.needRegValid) {
                        if (processUtils.reg(validItem,this) === false) {
                            return false
                        }
                    }
                }
            } else {
                if (validItem.needRegValid&&!this.isNull(validItem.value)) {
                    if (processUtils.reg(validItem,this) === false) {
                        return false
                    }
                }
            }
        }
    }
    return true
}
HbValidater.prototype.isNull = function (obj) {
    return obj === undefined || obj === null || obj.toString().replace(/^\s*/g, '').replace(/\s*$/g, '') === ''
}
HbValidater.prototype.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
}
//默认需要校验值是否存在，默认不需要校验值是否匹配正则
HbValidater.prototype.initValidObj = function (obj) {
    if (!obj.hasOwnProperty('required')) {
        obj.required = true
    }
    if (!obj.hasOwnProperty('needRegValid')) {
        obj.needRegValid = false
    }
}

module.exports = HbValidater

