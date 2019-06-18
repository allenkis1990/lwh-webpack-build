<template>
  <div>
    <div v-if="showNav">
      <h5>vuex知识点：</h5>
      <ul>
        <li><a href="javascript:void(0)" @click="stateGo('vuex-state')">state</a></li>
        <li><a href="javascript:void(0)" @click="stateGo('vuex-getter')">getter</a></li>
        <li><a href="javascript:void(0)" @click="stateGo('vuex-mutation')">mutation</a></li>
        <li><a href="javascript:void(0)" @click="stateGo('vuex-actions')">actions</a></li>
        <li><a href="javascript:void(0)" @click="stateGo('vuex-modules')">modules</a></li>
      </ul>
    </div>

    <transition name="fuck"
                appear>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    computed:{
        showNav(){
            return this.$route.name==='vuex'
        }
    },
    mounted(){

    },
    methods: {
        stateGo(name){
            this.$router.push({
                name:name
            })
        }
    }
}
</script>
<style>
    body,html{width:100%;height:100%;}
</style>


