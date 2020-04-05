# 表单校验指令
## 作者：Allen Liu
## 源码github地址：https://github.com/allenkis1990/lwh-webpack-build/tree/master/parentProject/portal/utils/validationPlugin.js
## 说明：
## 由于vue框架是渐进式得，所以并没有提供内置的表单校验组件或者指令，这对于用习惯了angular1内置表单校验指令的我来说难免有点不习惯，所以我参照angular1的表单指令封装了一个vue版本的表单验证指令

## demo：

```
//全局引入表单插件，本例在main.js处引入
import validationPlugin from '@portal/utils/validationPlugin'
Vue.use(validationPlugin)
```

## .vue文件中使用方法
### html片段
```
<el-button @click="initForm()" type="primary">初始化表单状态</el-button>
<form name="myForm">
        <ul class="validationList">
            <li>
                <span class="xing">*</span>用户名：<input type="text"
                       v-pattern="/^[a-zA-Z]+$/"
                       v-model="userName"
                       name="userName"
                       placeholder="请输入用户名"
                       v-required="true">
                <span style="color:red" v-if="myForm.userName.$error.required&&myForm.userName.$dirty">请输入用户名</span>
                <span style="color:red" v-if="myForm.userName.$error.pattern&&myForm.userName.$dirty&&!myForm.userName.$error.required">请输入英文</span>
            </li>
            <li>
                <span class="xing">*</span>爱好：<select name="sel"
                        v-model="sel.data"
                        v-required="true">
                    <option value="">请选择</option>
                    <option value="1">篮球</option>
                    <option value="2">游戏</option>
                </select>
                <span style="color:red" v-if="myForm.sel.$error.required&&myForm.sel.$dirty">请选择一个内容</span>
            </li>
            <li>
                <span class="xing">*</span>固定数字：<input type="text"
                           v-num="true"
                           v-model="num"
                           name="num"
                           placeholder="请输入固定数字100"
                           v-required="true">
                <span style="color:red" v-if="myForm.num.$error.required&&myForm.num.$dirty">必填</span>
                <span style="color:red" v-if="myForm.num.$error.num&&myForm.num.$dirty&&!myForm.num.$error.required">请输入固定数字</span>
            </li>
            <li style="color:red" v-if="myForm.$invalid">表单1整个没过</li>
        </ul>
</form>
```

### script片段
```
<script>
    import {button} from 'element-ui'
    import {getOptions,initForm,initFormErrorObj} from '@portal/utils/validationPlugin'
    export default {
        data(){
            return {
                userName:'',
                num:'',
                sel:{data:''},
                //相当于创建myForm2:{userName:{$error:{}}}
                ...initFormErrorObj('myForm', ['sel','userName','num'])
            }
        },
        components:{
            elButton:button
        },
        mounted(){
        },
        methods: {
            initForm(){
                initForm('myForm',this);
            }
        },
        directives: {
            num:getOptions('num',function(ele,bind,vNode,value){
                var context = vNode.context;
                var form = ele.formName,
                        formItem = ele.formItemName;
                var fromObj = context[form]
                var vaildObj = fromObj[formItem];
                vaildObj.$error.pattern = false;
                if(value==100){
                    vaildObj.$error.num = false;
                } else {
                    vaildObj.$error.num = true;
                }
            })
        }
    }
```

## 初始化表单错误对象model，通过validationPlugin暴露出来的initFormErrorObj方法来初始化，并且通过对象解构的方式扩展到data上，入参是
### (1)：表单的名字与form元素上的name对应
### (2)：表单子元素数组，值与表单子元素name对应

```
data(){
        return {
            //相当于创建myForm2:{userName:{$error:{}}}
            ...initFormErrorObj('myForm', ['sel','userName','num'])
        }
}
```

## 内置指令,html片段上一定要有form元素并且要定义一个name，里面的表单元素一定要有name v-model
## 内置了两个指令v-required和v-pattern
### 1.v-required 参数为Boolean
### 2.v-pattern 参数为正则表达式
## 例子：
```
<li>
    <span class="xing">*</span>用户名：<input type="text"
           v-pattern="/^[a-zA-Z]+$/"
           v-model="userName"
           name="userName"
           placeholder="请输入用户名"
           v-required="true">
    <span style="color:red" v-if="myForm.userName.$error.required&&myForm.userName.$dirty">请输入用户名</span>
    <span style="color:red" v-if="myForm.userName.$error.pattern&&myForm.userName.$dirty&&!myForm.userName.$error.required">请输入英文</span>
</li>
```
## 错误对象都存在定义的表单错误对象里用于显示错误信息，上例中错误都存在myForm.userName.$error里(myForm是表单name,userName是表单子元素的name)
### 表单错误对象说明
对象|类型|说明
--|:--:|--:
myForm.userName.$error.xxx|Boolean|例如使用了v-required指令如果触发了错误那么myForm.userName.$error.required为true
myForm.userName.$dirty|Boolean|表单是否有值过，曾经有值过又删除的话也会为true
myForm.userName.$invalid|Boolean|为true的话代表单个表单子元素没通过验证
myForm.$invalid|Boolean|为true的话代表整个表单元素没通过验证

### 表单元素上参数
元素标签|属性|是否必填|说明
--|:--:|--:|--:
form标签|name|必填|用于生成data里表单验证对象，例：myForm.userName.$error.xxx里的myForm
表单子元素标签|name|必填|生成表单验证子元素对象，例：myForm.userName.$error.xxx里的userName
表单子元素标签|v-model|必填|监听的表单值

## 自定义表单指令
### 通过validationPlugin暴露出来的getOptions方法创建，下例中自定义了一个只能输入固定数字为100的表单指令,错误对象存在myForm.num.$error.num里
### html
```
<li>
    <span class="xing">*</span>固定数字：<input type="text"
               v-num="true"
               v-model="num"
               name="num"
               placeholder="请输入固定数字100"
               v-required="true">
    <span style="color:red" v-if="myForm.num.$error.required&&myForm.num.$dirty">必填</span>
    <span style="color:red" v-if="myForm.num.$error.num&&myForm.num.$dirty&&!myForm.num.$error.required">请输入固定数字</span>
</li>
```
### script
```
directives: {
    num:getOptions('num',function(ele,bind,vNode,value){
        var context = vNode.context;
        var form = ele.formName,
                formItem = ele.formItemName;
        var fromObj = context[form]
        var vaildObj = fromObj[formItem];
        vaildObj.$error.pattern = false;
        if(value==100){
            vaildObj.$error.num = false;
        } else {
            vaildObj.$error.num = true;
        }
    })
}
```

## 初始化表单状态,表单验证对象会回到初始化状态，通过validationPlugin暴露出来的initForm方法来，参数是：
### (1)formName:表单名
### (2)context:指定为当前组件的this
### 例：
```
methods: {
    initForm(){
        initForm('myForm',this);
    }
}
```


