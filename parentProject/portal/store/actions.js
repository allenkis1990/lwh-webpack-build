
//actions的context相当于整个store可以调用state mutations getters调用的时候this.$store.dispatch('changeName')
export const actions={
  changeName:function(context,name){
    context.commit('changeName',name);
    //console.log(context.state.name);
    //console.log(context.getters.initStateName);
    //console.log(context);
  },
  getName:function(context){

    return new Promise(function(resolve,reject){
      setTimeout(function(){
      //return context.getters.initStateName+'7777';
        resolve(context.getters.initStateName+'7777');
      },3000);
    }).then(function(data){
      //这里异步return 出数据 到时候外面调用this.$store.dispatch('getName').then(function(data){  打印data })
      //如果把这里then去掉也能正确返回context.getters.initStateName+'7777'
      return data;
    });
  }
}
