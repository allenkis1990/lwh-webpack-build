<template>
  <div>
    <div>Hello Home!11112</div>
    <a href="javascript:void(0)" @click="goState('test1')">home/test1</a>
    <a href="javascript:void(0)" @click="goPath('/test1')">test1</a>
    <a href="javascript:void(0)" @click="goPath('/')">/</a>
    <!--<img src="@portal/images/afei.jpg">
    <img src="@portal/images/皮卡22.jpg">-->
    111
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
/*@import "~@portal/style/color.css";*/
</style>
