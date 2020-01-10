<template>
    <div class="regist">
        <form-component :data-config="config"
                        :not-config-show="false"
                        @beforeSubmit="beforeSubmit"
                        ref="formComponent">
            <template #userName="{formData}">
                <span class="red">*</span>
                姓名插槽：<input type="text"
                                    v-model="formData.userName">
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
                    {
                        key: 'loginInput',
                        needRegValid: true,
                        validate: [
                            {
                                key: 'loginInput',
                                reg: /^lwh$/,
                                msg: '账号必须为lwh'
                            },
                            {
                                key: 'userName',
                                reg: /^刘伟恒$/,
                                msg: '账号为lwh的时候姓名一定要是刘伟恒'
                            }
                        ]
                    },
                    {key: 'userName',placeholder:'请输入姓名啊啊啊啊',keyName:'姓名'},
                    {key: 'passWord'},
                    {key: 'sex'},
                    {key: 'fav',required:false}
                ]
            }
        },
        mounted() {

        },
        methods: {
            hide(){
                let component = this.$refs.formComponent
                component.hideItem('userName')
            },
            show(){
                let component = this.$refs.formComponent
                component.showItem('userName')
            },
            beforeSubmit(formData,next){
//                console.log(formData);
//                console.log('提交前事件没过');
                next()
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
