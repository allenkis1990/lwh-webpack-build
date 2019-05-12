<template>
  <div id="onlyPortal">{{name}}<br>
      <img src="@portal/images/onlyPortal.jpg">
  </div>
</template>

<script>
import {obj} from '@portal/services/onlyPortalData.js'
export default {
    data(){
        return {
            name:'onlyPortal!!!!',
            json:''
        }
    },
    mounted(){
        console.log(obj);
    }
}
</script>

<style lang="less" scoped>
    @import "~@portal/less/onlyPortal.less";
</style>
