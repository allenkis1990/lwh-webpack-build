<template>
  <div>原$store的state数据name：{{userName}}<br>通过mutation改变数据为{{$store.state.name}}<br>
    <button @click="fn()">mutation change</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            userName:this.$store.state.name
        }
    },
    mounted(){

    },
    methods:{
        fn(){
            this.$store.commit('changeName','change!!!')
        }
    }
}
</script>
<style>
    body,html{width:100%;height:100%;}
</style>


