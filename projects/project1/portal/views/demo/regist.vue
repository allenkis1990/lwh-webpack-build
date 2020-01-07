<template>
    <div class="regist">
        <regist :data-source="registSource">
            <!--<template #userNameSlot="{registInfo}">
                &lt;!&ndash;{{registInfo}}&ndash;&gt;
                <input type="text" v-model="registInfo.userName">
                userNameSlot
            </template>-->
        </regist>
    </div>
</template>

<script>
    import regist from '@portal/views/demo/component/registComponent/index.vue'
    export default {
        data() {
            return {
                registSource:[
//                    {key:'userName',required:false},
//                    {key:'passWord',show:false},
                    {key:'loginInput'}
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
