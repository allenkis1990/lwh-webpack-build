<template>
  <div class="main">
    <div>Hello Home!11112</div>
    <a href="javascript:void(0)" @click="goState('test1')">home/test1</a>
    <a href="javascript:void(0)" @click="goPath('/test1')">test1</a>
    <a href="javascript:void(0)" @click="goPath('/')">/</a>
    <!--<img src="@portal/images/afei.jpg">
    <img src="@portal/images/皮卡22.jpg">-->
    111
    <router-view></router-view>
    <div class="lwh">lwh</div>
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

<style scoped lang="less">
  /*如果在scoped的情况下引用的less里面带全局的标签例如body那么body就会变成body[data-1212]{}引用不到*/
/*@import "~@portal/style/color.css";*/
/*@import "~@portal/less/style1.less";*/
.main{
  color:green;
  .lwh{color:red;}
}
</style>
<!--要想全局的body能吃到样式就必须再开一个不带scope的style标签-->
<style lang="less">
  @import "~@portal/less/style1.less";
</style>