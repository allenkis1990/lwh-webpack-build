<template>
  <div id="app">
    <transition name="fuck" appear>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive || $route.meta.keepAlive===undefined"></router-view>
      </keep-alive>
    </transition>
    <transition name="fuck" appear>
      <router-view v-if="$route.meta.keepAlive===false"></router-view>
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
<style>
  /*css 和 less都可以引入*/
  .fuck-enter,.fuck-leave-active{opacity:0}
  .fuck-enter-active,.fuck-leave-active{transition:all 1s ease;}
  @import "~@portal/style/base.css";
  @import "~@portal/style/bootstrap.min.css";
  @import "~@portal/style/cv.css";
</style>

