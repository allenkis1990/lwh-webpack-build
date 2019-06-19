<template>
    <div>$store的getters数据userName：{{userName}}<br>
        {{getGetters}}<br>
        haha:{{hahaha}}
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {}
        },
        computed: {
            userName() {
                return this.$store.getters.initStateName
            },
            getGetters(){
                return this.$store.getters.getGetters
            },
            ...mapGetters({
                hahaha:'getGetters'
            })
        },
        mounted() {

        },
        methods: {}
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>


