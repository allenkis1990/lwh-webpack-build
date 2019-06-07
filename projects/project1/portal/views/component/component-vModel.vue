<template>
    <div>
        <test-vmodel1 v-model="v1"></test-vmodel1>{{v1}}
        <test-vmodel2 v-model="v2"></test-vmodel2>{{v2}}
    </div>
</template>

<script>

    import testVmodel1 from '@portal/views/component/components/component-vModel1.vue'
    import testVmodel2 from '@portal/views/component/components/component-vModel2.vue'
    export default {
        data(){
            return {
                v1:{
                    current:'2'
                },
                v2:'2222'
            }
        },
        mounted(){
        },
        methods: {

        },
        components:{
            testVmodel1,
            testVmodel2
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
