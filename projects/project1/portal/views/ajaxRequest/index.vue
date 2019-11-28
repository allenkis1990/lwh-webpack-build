<template>
    <div>
        <button @click="getUserInfo">getUserInfo</button>
        <button @click="getErr">getErr</button>
        {{userInfo}}
    </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex'
    export default {
        computed:{
                ...mapState({
                    userInfo:'$$userInfo'
                })
        },
        mounted() {
        },
        methods: {
                ...mapActions(['getUserInfo','getErr'])
        }
    }
</script>
