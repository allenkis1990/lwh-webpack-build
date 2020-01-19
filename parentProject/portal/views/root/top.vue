<template>
    <div>
        当前路由：{{$store.state.route.name}}
    </div>
</template>

<script>
    export default {
        mounted(){
            console.log(1);
        },
        data(){
            return {}
        },
        methods: {

        }
    }
</script>

<style>
</style>
