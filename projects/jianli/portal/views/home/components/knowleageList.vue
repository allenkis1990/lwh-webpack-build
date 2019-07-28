<template>
  <div class="container center fades">
    <div class="col-md-3 col-xs-6" v-for="(item,index) in dataList">
      <div class="wrap-box knowleage-wrap-box">
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
