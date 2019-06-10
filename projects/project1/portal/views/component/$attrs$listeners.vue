<template>
    <div>
        <test :dataSource="obj" @say="fn()"></test>
    </div>
</template>

<script>
    import test from '@portal/views/component/components/$attrs$listeners.vue'
    export default {
        data(){
            return {
                obj:{name:'allen'}
            }
        },
        mounted(){
        },
        methods: {
            fn(){
                console.log('emit!!!');
            }
        },
        components:{
            test
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
