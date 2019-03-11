<template>
    <div>
        <div>test1</div>
        <div>{{$store.state.name}}</div>
        <button @click="fn()">hahahha</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {}
        },
        methods: {
            fn(){
                this.$message.error({
                    message: 'hahahahahahahah!!!'
                })
            }
        }
    }
</script>

<style>
</style>
