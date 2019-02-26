<template>
  <div>
    <div>Hello Home!</div>
    <a href="javascript:void(0)" @click="goState('test1')">home/test1</a>
    <a href="javascript:void(0)" @click="goPath('/test1')">test1</a>
    <a href="javascript:void(0)" @click="goPath('/')">/</a>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods:{
    goState:function(stateName){
      this.$router.push({name:stateName});
    },
    goPath:function(path){
      this.$router.push({path:path});
    }
  }
}
</script>

<style>
</style>
