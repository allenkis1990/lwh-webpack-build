<template>
    <div>
        <!--<div>指令基本用法</div>
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
        <hr>-->
        <div>实现表单校验指令</div>
        <button @click="initForm()">初始化表单状态</button>
        <div>
            <p>表单1：</p>
            <form name="myForm">
                <ul>
                    <li>
                        卧槽：<span name="wocao"
                                v-model="wocao"
                                v-required="true"></span>{{wocao}}
                        <button @click="add($event)">add</button>
                        <button @click="splice($event)">splice</button>
                        <span style="color:red" v-if="myForm.wocao.$error.required&&myForm.wocao.$dirty">请添加一个数</span>
                    </li>
                    <li>
                        生日：<el-date-picker
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
                        用户名：<input type="text"
                               v-pattern="/^[a-zA-Z]+$/"
                               v-model="userName"
                               name="userName"
                               placeholder="请输入用户名"
                               v-required="true">
                        <span style="color:red" v-if="myForm.userName.$error.required&&myForm.userName.$dirty">请输入用户名</span>
                        <span style="color:red" v-if="myForm.userName.$error.pattern&&myForm.userName.$dirty&&!myForm.userName.$error.required">请输入英文</span>
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
                        <span style="color:red" v-if="myForm.phone.$error.pattern&&myForm.phone.$dirty&&!myForm.phone.$error.required">请输入11位电话号码</span>
                    </li>
                    <li>
                        固定数字：<input type="text"
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


        <div style="margin-top:20px;">
            <p>表单2：</p>
            <form name="myForm2">
                <ul>
                    <li>
                        用户名：<input type="text"
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
    </div>
</template>

<script>
    /**
     * 1.传进指令的data数据不是双向绑定的
     * 2.只要外部有data发生变化就会触发指令内部的update钩子，需要去对比oldvalue和newValue
     * 3.vNode.context修改指令外部的data
     */
    import validation from '@portal/views/directive/validation'
    import {datePicker} from 'element-ui'
    export default {
        data(){
            return {
                dataSource: "initDataSource",
                userName:'',
                userName2:'',
                phone:'',
                num:'',
                birthDay:'',
                wocao:[],
                sel:{data:''},
                //相当于创建myForm2:{userName:{$error:{}}}
                ...validation.initFormErrorObj('myForm', ['birthDay', 'sel','userName','phone','num','wocao']),
                ...validation.initFormErrorObj('myForm2', ['userName'])
            }
        },
        beforeCreate(){},
        components:{
            elDatePicker:datePicker
        },
        mounted(){
            console.log('第一次加载');
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
            fn(){
                console.log(this.dataSource, '检验外部data是否变化');
            },
            fuck(){
                this.dataSource = Math.random();
            },
            initForm(){
                validation.initForm('myForm',this);
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
            },
            num:validation.getOptions('num',function(ele,bind,vNode,value){
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
<!--scoped-->
<style lang="less" scoped>
    @import "~@portal/less/onlyPortal.less";
</style>
