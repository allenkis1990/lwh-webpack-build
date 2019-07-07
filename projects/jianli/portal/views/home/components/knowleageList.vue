<template>
  <div>
    <div class="col-md-3 col-xs-6" v-for="(item,index) in dataList">
      <div class="wrap-box">
        <div :class="['base-knowleage',item.className]"></div>
      </div>
      <p class="ptitle">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    dataList:{
      type:Array
    }
  },
  data:function(){
    return {
    }
  },
  mounted:function(){
    console.log(this.dataList);
  },

  methods:{

  }
}
</script>
<style>
  /*css 和 less都可以引入*/
  .fuck-enter,.fuck-leave-active{margin-left:-200px;}
  .fuck-enter-active,.fuck-leave-active{transition:all 1s ease;}
  @import "~@portal/style/base.css";
  @import "~@portal/style/bootstrap.min.css";
  @import "~@portal/style/cv.css";
</style>

