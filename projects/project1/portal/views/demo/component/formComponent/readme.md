# 表单组件
## 作者：Allen Liu
## 特点：集复用性、可维护性、可配置性、自定义模板、自定义校验为一体
## 使用场景：
## 适用于大量使用表单的平台，比如A页面需要的表单为：用户名，密码，B页面需要的表单为：性别、爱好，这个组件里默认集成了这个平台所有的表单，你只需要指定需要的表单字段就可以按需拉取表单。

## demo：

```
import formComponent from '@portal/views/demo/component/formComponent/index.vue'
components: {
    formComponent
}
```

## 完整元素代码
```
<form-component :data-config="config"
                :not-config-show="false"
                @submit="submit"
                @beforeSubmit="beforeSubmit"
                ref="formComponent">
    <template #userName="{formData}">
        <span class="red">*</span>
        姓名插槽：<input type="text"
                        v-model="formData.userName">
    </template>
</form-component>
```


## 参数
## 1.not-config-show： (非必需) 类型：Boolean，默认true 在没有data-config的时候默认拉取组件内内置的所有表单，为false的时候不拉去取表单
```
<form-component :not-config-show="false">
</form-component>
```

## 2.data-config： (非必需) 类型：Array 需要拉取的表单配置表，完整结构为：
```
[
    {
        key: 'loginInput',
        required:true,
        placeholder:'请输入账号',
        keyName:'账号',
        msg:'账号不能为空',
        show:true,
        value:'hahah',
        needRegValid:true,
        //validate:{
        //    reg:/^\d+$/,
        //    msg:'输入的账号比如为数字'
        //},
        validate:[
            {
                key:'loginInput',
                reg:/^abc$/,
                msg:'账号必须为abc'
            }
            {
                key:'userName',
                reg:/^123$/,
                msg:'账号为abc的时候姓名必须为123'
            }
        ]
    }
]
```
## 配置参数说明
参数|是否必填|类型|默认值|说明
--|:--:|--:|--:|--:
key|是|String|-|需要拉取的表单字段
keyName|否|String|默认取内置配置的|需要拉取的表单的展示名称
required|否|Boolean|默认为true|表单是否必填
placeholder|否|String|默认取内置配置的|用作input或者select下拉框等的默认提示
value|否|任何|-|表单字段的默认值
show|否|Boolean|true|是否显示
needRegValid|否|Boolean|false|是否需要正则表达式校验
validate|否|Array/Object|-|表单校验正则规则，当validate为Object时对象属性为：1.reg:正则 2.msg:不匹配时的提示，当validate为Array时数组每一项属性为1.key:要校验的字段(只能是组件里有的字段，否则抛错) 2.reg:正则 3.msg:不匹配时的提示


## 3.@beforeSubmit (非必需) 类型：Function 表单校验全部通过后并且，提交之前触发，入参是
### (1)最终提交的数据
### (2).next方法，需要手动调用才能触发@submit事件否则不触发

## 4.@submit (非必需) 类型：Function 提交时触发，入参是
### (1)最终提交的数据


## 插槽
## 如果需要自定义表单的结构样式或者逻辑，可使用插槽来解决，例如我想自定义姓名表单的结构:
```
<form-component :data-config="config">
        <template #userName="{formData}">
            <span class="red">*</span>
            姓名插槽：<input type="text"
                            v-model="formData.userName">
        </template>
</form-component>
```

## 组件内的方法通过refs暴露给组件外使用的方法：

## 1.showItem 类型 Function 显示指定的表单，入参是需要显示的表单字段 例子：

```
let component = this.$refs.formComponent
component.showItem('userName')
```

## 2.hideItem 类型 Function 隐藏指定的表单，入参是需要隐藏的表单字段 例子：
```
let component = this.$refs.formComponent
component.hideItem('userName')
```

## formMap.js里只内置了6个表单组件，开发者可按需要自行添加
```
import loginInput from '@portal/views/demo/component/formComponent/components/loginInput.vue'
import userName from '@portal/views/demo/component/formComponent/components/userName.vue'
import sex from '@portal/views/demo/component/formComponent/components/sex.vue'
import passWord from '@portal/views/demo/component/formComponent/components/passWord.vue'
import fav from '@portal/views/demo/component/formComponent/components/fav.vue'

let formMap = {
    loginInput,
    userName,
    sex,
    passWord,
    fav
}

export default formMap
```

## defaultvalidateRule.js定义了内置的校验规则，字段为key msg needRegValid validate，自定义配置会合并和覆盖默认规则,默认required都为true
```
export default [
    {
        key:'loginInput',
        msg:'账号不能为空',
        needRegValid:true,
        validate:{
            reg:/^\d+$/,
            msg:'账号密码为数字'
        }
    },
    {
        key:'userName',
        msg:'请输入用户名'
    },
    {
        key:'passWord',
        msg:'请输入密码'
    },
    {
        key:'sex',
        msg:'请选择性别'
    },
    {
        key:'fav',
        msg:'请选择爱好'
    }
]
```
