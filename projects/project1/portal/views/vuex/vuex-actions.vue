<template>
  <div>原$store的state数据name：{{userName}}<br>通过actions改变数据为{{$store.state.name}}<br>
    <button @click="fn()">actions change</button>
    <button @click="alert()">alert</button>
    <button @click="asyncAlert()">asyncAlert</button>
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
            this.$store.dispatch('changeName','actions change!!!')
        },
        alert(){
            this.$store.dispatch('alert','1').then(function(data){
                alert(data,'00000')
            })
        },
        asyncAlert(){
            this.$store.dispatch('asyncAlert','2').then(function(data){
                alert(data,'11111')
            })
        }
    }
}
</script>
<style>
    body,html{width:100%;height:100%;}
</style>


