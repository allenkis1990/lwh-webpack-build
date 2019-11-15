<template>
    <div>
        state:{{fuckName}} <br>
        getter:{{getFuckName}}<br>
        <button @click="shit()">mutation</button><br>
        <button @click="ac()">action</button><br>
        <button @click="changeState()">设置strict直接改state报错</button>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
    export default {
        data() {
            return {

            }
        },
        computed:{
            //自定义名字
            /*...mapState('moduleB',{fuckNameaaa:function(state){
                return state.fuckName
            }})*/
            ...mapState('moduleB',['fuckName']),
            ...mapGetters('moduleB',['getFuckName'])
        },
        mounted() {
//            console.log(mapState, mapMutations, mapActions, mapGetters,888);
//            console.log(this.fuckName,333);
        },
        methods: {
            changeState(){
                this.$store.state.moduleB.fuckName=99999999999
            },
            //方法就没必要自定义名字了
            ...mapMutations('moduleB',['mutationFuck']),
            ...mapActions('moduleB',['actionFuck']),
            shit(){
                this.mutationFuck('变')
            },
            ac(){
                this.actionFuck('ac!!').then(function(data){
                    console.log(data);
                })
            },
            fuck(){
                this.$store.commit('moduleB/mutationFuck','888')
            },
            ac2(){
                this.$store.dispatch('moduleB/actionFuck','ac2!!').then(function(data){
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


