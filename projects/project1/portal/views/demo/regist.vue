<template>
    <div class="regist">
        <regist :data-source="registSource">
            <template #userNameSlot="{registInfo}">
                <!--{{registInfo}}-->
                <input type="text" v-model="registInfo.userName">
                userNameSlot
            </template>
        </regist>
    </div>
</template>

<script>
    import regist from '@portal/views/demo/component/registComponent/index.vue'
    export default {
        data() {
            return {
//                registSource:['userName','passWord','loginInput'],
                registSource:[
                    {key:'userName',show:true,require:true},
                    {key:'passWord',show:true,require:true},
                    {key:'loginInput',show:false,require:true}
                ]
            }
        },
        mounted() {

        },
        methods: {
            fn(){
                alert(1111)
            }
        },
        components: {
            regist
        },
        watch: {}
    }
</script>
