<template>
  <div id="onlyPortal">{{name}}{{fuck}}<br>
      <!--<img src="@portal/images/onlyPortal.jpg">-->
      <button @click="contentDialog()">点我出弹窗</button>
  </div>
</template>

<script>
import {obj} from '@portal/services/onlyPortalData.js'
import dialogUtils from '@portal/utils/dialog.js'
import dialogContent from '@portal/views/onlyPortal/dialogContent.js'
export default {
    data(){
        return {
            name:'onlyPortal!!!!',
            json:'',
            fuck:''
        }
    },
    mounted(){
        console.log(obj);
    },
    methods:{
        contentDialog(){
            let dialogOtps = dialogContent(this)
            dialogUtils.contentDialog({
                id: 'lwhId',
                cancelValue: 'delete',
                cancelCb(){
                    console.log('删除弹窗');
                }
            }, dialogOtps);
        }
    }
}
</script>

<style lang="less" scoped>
    @import "~@portal/less/onlyPortal.less";
</style>
