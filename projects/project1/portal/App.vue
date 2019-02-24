<template>
  <div id="app">
    hello world!
  </div>
</template>

<script>
import Vue from 'vue';
import data from '@portal/data/data1.js';
console.log(data);
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
<style lang="less">
  /*css 和 less都可以引入*/
  .fuck-enter,.fuck-leave-active{margin-left:-200px;}
  .fuck-enter-active,.fuck-leave-active{transition:all 1s ease;}
</style>

