<template>
    <div>
        demo1Plugin
        <div>
            state:{{nickName}}
        </div>
        <div>
            getters:{{getNickName}}
        </div>
        <div>
            <button @click="changeNickName('hahahah')">mutations</button>
        </div>
        <div>
            <button @click="asyncChangeName()">actions</button>
        </div>
        <div>component: <fk></fk>  </div>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
    import fk from '../../components/fk/index.vue'
    export default {
        data() {
            return {}
        },
        computed:{
            ...mapState('demo1Plugin',['nickName']),
            ...mapGetters('demo1Plugin',['getNickName'])
        },
        components: {
            fk
        },
        mounted() {

        },
        methods: {
            ...mapMutations('demo1Plugin',['changeNickName']),
            ...mapActions('demo1Plugin',['actionsChange']),
            asyncChangeName(){
                this.actionsChange('2秒后改变nickName').then(function(data){
                    console.log(data);
                })
            }
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
<!--scoped-->
