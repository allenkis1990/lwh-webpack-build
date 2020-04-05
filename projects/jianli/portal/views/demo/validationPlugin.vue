<template>
    <div>
        <div>表单校验指令</div>
        <el-button @click="initForm()" type="primary">初始化表单状态</el-button>
        <div>
            <h2>表单1：</h2>
            <form name="myForm">
                <ul class="validationList">
                    <li>
                        <span class="xing">*</span>添加至少一个数：<span name="wocao"
                                v-model="wocao"
                                v-required="true"></span>{{wocao}}
                        <button @click="add($event)">add</button>
                        <button @click="splice($event)">splice</button>
                        <span style="color:red" v-if="myForm.wocao.$error.required&&myForm.wocao.$dirty">请添加一个数</span>
                    </li>
                    <li>
                        <span class="xing">*</span>生日：<el-date-picker
                                v-model="birthDay"
                                name="birthDay"
                                value-format="yyyy-MM-dd"
                                v-required="true"
                                type="date"
                                placeholder="请选择生日日期">
                        </el-date-picker>
                        <span style="color:red" v-if="myForm.birthDay.$error.required&&myForm.birthDay.$dirty">请选择生日日期</span>
                    </li>
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
                        <span class="xing">*</span>电话号码：<input type="text"
                                   v-pattern="/^\d{11}$/"
                                   v-model="phone"
                                   name="phone"
                                   placeholder="请输入电话号码"
                                   v-required="true">
                        <span style="color:red" v-if="myForm.phone.$error.required&&myForm.phone.$dirty">请输入电话号码</span>
                        <span style="color:red" v-if="myForm.phone.$error.pattern&&myForm.phone.$dirty&&!myForm.phone.$error.required">请输入11位电话号码</span>
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
        </div>


        <div style="margin-top:100px;">
            <h2>表单2：</h2>
            <form name="myForm2">
                <ul class="validationList">
                    <li>
                        <span class="xing">*</span>用户名：<input type="text"
                                   v-pattern="/^[a-zA-Z]+$/"
                                   v-model="userName2"
                                   name="userName"
                                   placeholder="请输入用户名"
                                   v-required="true">
                        <span style="color:red" v-if="myForm2.userName.$error.required&&myForm2.userName.$dirty">请输入用户名</span>
                        <span style="color:red" v-if="myForm2.userName.$error.pattern&&myForm2.userName.$dirty&&!myForm2.userName.$error.required">请输入英文</span>
                    </li>
                    <li style="color:red" v-if="myForm2.$invalid">表单2整个没过</li>
                </ul>
            </form>
        </div>

        <md-component :md-content="mdContent"></md-component>
    </div>
</template>

<script>
    import {getOptions,initForm,initFormErrorObj} from '@portal/utils/validationPlugin'
    import {datePicker,button} from 'element-ui'
    import mdComponent from '@portal/views/demo/component/mdComponent/index.vue'
    export default {
        data(){
            return {
                mdContent:require('@portal/views/demo/component/validationPlugin/readme.md'),
                dataSource: "initDataSource",
                userName:'',
                userName2:'',
                phone:'',
                num:'',
                birthDay:'',
                wocao:[],
                sel:{data:''},
                //相当于创建myForm2:{userName:{$error:{}}}
                ...initFormErrorObj('myForm', ['birthDay', 'sel','userName','phone','num','wocao']),
                ...initFormErrorObj('myForm2', ['userName'])
            }
        },
        components:{
            elDatePicker:datePicker,
            elButton:button,
            mdComponent
        },
        mounted(){
        },
        methods: {
            add(e){
                e.preventDefault()
                this.wocao.push(1)
            },
            splice(e){
                e.preventDefault()
                this.wocao.splice(this.wocao.length-1,1)
            },
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
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
<style scoped lang="less">
    .xing{color:red}
    .validationList{
        li{
            margin-bottom:15px;
        }
    }
</style>


