<template>
    <div class="regist">
        <regist :data-source="registSource" ref="regist">
            <!--<template #userNameSlot="{registInfo}">
                &lt;!&ndash;{{registInfo}}&ndash;&gt;
                <input type="text" v-model="registInfo.userName">
                userNameSlot
            </template>-->
        </regist>
        <button @click="hide">隐藏一个</button>
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
                                key: 'passWord',
                                reg: /^123$/,
                                msg: '账号为lwh的时候密码一定要是123'
                            }
                        ]
                    },
                    {key: 'userName',placeholder:'用户名啊'},
                    {key: 'passWord'},
                    {key: 'sex'}
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
