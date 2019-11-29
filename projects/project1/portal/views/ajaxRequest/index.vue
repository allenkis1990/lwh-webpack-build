<template>
    <div>
        <button @click="getUserInfo">getUserInfo</button>
        <button @click="getList">getList</button>
        <button @click="getErr">getErr</button>
        <div>{{userInfo}}</div>
        <div>{{list}}</div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        computed: {
            ...mapState({
                userInfo: '$$userInfo',
                list:'$$list'
            })
        },
        mounted() {
//            this.getUserInfo()
        },
        methods: {
            ...mapActions(['getUserInfo', 'getErr','getList'])
        }
    }
</script>
