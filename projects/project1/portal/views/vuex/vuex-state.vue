<template>
  <div>$store的state数据userName：{{userName}}</div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
    data(){
        return {
            userName:this.$store.state.name
        }
    },
    computed:{
        ...mapState({
            a:'age',
            b:'job'
        }),
        ...mapState(['age','job']),
        ...mapState({
            haha(state){
                return state.age
            },
            hehe(state){
                return state.job
            }
        })
    },
    mounted(){
        console.log(this.a,this.b);
        console.log(this.age,this.job);
        console.log(this.haha,this.hehe);
    },
    methods:{

    }
}
</script>
<style>
    body,html{width:100%;height:100%;}
</style>


