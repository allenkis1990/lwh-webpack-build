<template>
    <div>
        <test @click="fn" lwh="haha"></test>
    </div>
</template>

<script>
    import test from '@portal/views/parent-child-commu/components/attrs&listeners.vue'
    export default {
        data(){
            return {

            }
        },
        mounted(){
        },
        methods: {
            fn(){
                alert('父亲的方法')
            }
        },
        components:{
            test
        }
    }
</script>
<style>

</style>
<!--scoped-->
