<template>
  <div>$store的getters数据userName：{{userName}}
  </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    computed:{
        userName(){
            return this.$store.getters.initStateName
        }
    },
    mounted(){

    },
    methods:{

    }
}
</script>
<style>
    body,html{width:100%;height:100%;}
</style>


