<template>
  <div id="onlyPortal">{{name}}{{fuck}}<br>
      <!--<img src="@portal/images/onlyPortal.jpg">-->
      <button @click="contentDialog()">点我出弹窗</button>

      <div id="heihei"></div>
  </div>
</template>

<script>
import {obj} from '@portal/services/onlyPortalData.js'
import dialogContent from '@portal/views/onlyPortal/dialogContent.js'

import testCode from '@portal/views/onlyPortal/test.vue'
import Vue from 'vue'
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
        var fnContentStr = testCode.render.toString().replace(/^function\s*?\(\)\s*?\{/g,'').replace(/\}$/g,'');
        fnContentStr = fnContentStr.replace('code','code222')
        console.log(fnContentStr);
        testCode.render = new Function(fnContentStr)
        let options = Vue.extend(testCode)
        new options().$mount('#heihei')
    },
    methods:{
        contentDialog(){
            let dialogOtps = dialogContent(this)
            //$contentDialog通过Vue.use()挂载到全局
            this.$contentDialog({
                id: 'lwhId',
                title:'刘伟恒弹窗',
                cancelValue: 'delete',
                cancelCb(){
                    console.log('删除弹窗');
                }
            }, dialogOtps);
        }
    }
}
</script>
<style>
    body,html{width:100%;height:100%;}
</style>
<style lang="less">
    @import "~@portal/less/dialog.less";
</style>
<!--scoped-->
<style lang="less" scoped>
    @import "~@portal/less/onlyPortal.less";
</style>
