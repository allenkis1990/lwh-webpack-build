<template>
    <div class="regist">
        <form-component :data-config="config" ref="formComponent">
            <template #userName="{formData}" style="display:none">
                <!--{{formData}}-->
                <span class="red">*</span>userNameSlot：<input type="text" v-model="formData.userName">
            </template>
        </form-component>
        <button @click="hide">隐藏userName</button>
        <button @click="show">显示userName</button>
    </div>
</template>

<script>
    import formComponent from '@portal/views/demo/component/formComponent/index.vue'

    export default {
        data() {
            return {
                config: [
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
                    {key: 'userName',placeholder:'用户名啊'},
                    {key: 'passWord'},
                    {key: 'sex'},
                    {key: 'fav'}
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
                let component = this.$refs.formComponent
                component.hideItem('userName')
            },
            show(){
                let component = this.$refs.formComponent
                component.showItem('userName')
            }
        },
        components: {
            formComponent
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
