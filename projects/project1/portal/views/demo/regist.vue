<template>
    <div class="regist">
        <regist :data-source="registSource" ref="regist">
            <template #userName="{registInfo}" style="display:none">
                <!--{{registInfo}}-->
                <span class="red">*</span>userNameSlot：<input type="text" v-model="registInfo.userName">
            </template>
        </regist>
        <button @click="hide">隐藏一个</button>
        <button @click="show">显示一个</button>
    </div>
</template>

<script>
    import regist from '@portal/views/demo/component/registComponent/index.vue'

    export default {
        data() {
            return {
                haha: 'haha',
                registSource: [
//                    {key:'loginInput',value:'123',placeholder:'xxx',keyName:'ss',require:true,show:true},
                    {
                        key: 'loginInput',
                        needRegValid: true,
                        validate: [
                            {
                                key: 'loginInput',
                                reg: /^lwh$/,
                                msg: '请输入lwh'
                            },
                            {
                                key: 'userName',
                                reg: /^123$/,
                                msg: '账号为lwh的时候userName一定要是123'
                            }
                        ]
                    },
                    {key: 'userName',placeholder:'用户名啊',show:false},
                    {key: 'passWord'},
                    {key: 'sex'},
                    {key: 'fav',required:false}
                ]
            }
        },
        mounted() {

        },
        methods: {
            fn() {
                alert(1111)
            },
            hide(){
                let component = this.$refs.regist
                component.hideItem('userName')
            },
            show(){
                let component = this.$refs.regist
                component.showItem('userName')
            }
        },
        components: {
            regist
        },
        watch: {}
    }
</script>
<style>
    .regist .sex{
        display:inline-block;
    }
    .regist .sex span{
        display:inline-block;width:50px;height:50px;line-height:50px;text-align:center;border:1px solid red
    }
    .regist .sex span.current{background:red}
</style>
