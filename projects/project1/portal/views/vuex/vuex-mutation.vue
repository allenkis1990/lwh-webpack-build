<template>
    <div>原$store的state数据name：{{userName}}<br>通过mutation改变数据为{{$store.state.name}}<br>
        <button @click="fn()">mutation change</button><br>
        <button @click="rootMuta1()">rootMuta1</button>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        data() {
            return {
                userName: this.$store.state.name
            }
        },
        mounted() {

        },
        methods: {
            fn() {
                this.$store.commit('changeName', 'change!!!')
            },
            ...mapMutations(['rootMuta1'])
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>


