<template>
  <div>
      <div v-my-directive="dataSource">
          <input type="text">
          <button>点我</button>
      </div>
      <button @click="fn()">指令外部按钮</button>
      <button @click="fuck()">hahah</button>
      {{okok}}
  </div>
</template>

<script>
export default {
    data(){
        return {
            dataSource:[1,2],
            okok:""
        }
    },
    mounted(){

    },
    methods:{
        fn(){
            this.dataSource = [1,2,3,4]
            console.log(this.dataSource,'指令外部调用');
        },
        fuck(){
            this.okok = 1111;
        }
    },
    directives:{
        myDirective:{
            inserted(ele,binding){

            },
            bind(ele,binding){
                //
//                binding.value = []
                ele.addEventListener('click',function(e){
                    var target = e.target;
                    if(target.nodeName.toLowerCase()==='button'){
                        console.log(binding.value);
                    }
                })
            },
            update(ele,binding){
                console.log(binding,'更新');
            }
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
