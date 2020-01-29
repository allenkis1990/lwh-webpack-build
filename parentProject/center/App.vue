<template>
  <div id="app">
    <transition name="fuck" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  data:function(){
    return {
    }
  },

  mounted:function(){

  },

  methods:{

  },
  components:{

  }
}
</script>

<!--lang="less"一定要加 否则less不生效-->
<style>
  /*@import '~nms/element-ui/lib/theme-chalk/message.css';*/
  /*@import '~nms/element-ui/lib/theme-chalk/icon.css';*/
  /*@import '~nms/element-ui/lib/theme-chalk/index.css';!*完整*!*/
  /*css 和 less都可以引入*/
  .fuck-enter,.fuck-leave-active{margin-left:-200px;}
  .fuck-enter-active,.fuck-leave-active{transition:all 1s ease;}
</style>

