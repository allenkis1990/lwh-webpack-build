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
  @import '~/element-ui/lib/theme-chalk/index.css'
  /*css 和 less都可以引入*/
  .fuck-enter,.fuck-leave-active{margin-left:-200px;}
  .fuck-enter-active,.fuck-leave-active{transition:all 1s ease;}
</style>

