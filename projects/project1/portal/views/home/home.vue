<template>
    <div>
        <div class="main" v-if="$route.name==='home'">
            <div>parent Hello Home!11112</div>
            <ul>
                <li><a href="javascript:void(0)" @click="goState('home')">/portal</a></li>
                <li><a href="javascript:void(0)" @click="goState('test1')">home/test1</a></li>
                <li><a href="javascript:void(0)" @click="goState('test2')">home/test2</a></li>
                <li><a href="javascript:void(0)" @click="goState('onlyPortal')">Vue.extend()</a></li>
                <li><a href="javascript:void(0)" @click="goState('directive')">directive</a></li>
                <li><a href="javascript:void(0)" @click="goState('filter')">filter</a></li>
                <li><a href="javascript:void(0)" @click="goState('component')">component</a></li>
                <li><a href="javascript:void(0)" @click="goState('commu')">父子组件通讯</a></li>
                <li><a href="javascript:void(0)" @click="goState('vuex')">vuex</a></li>
                <li><a href="javascript:void(0)" @click="goState('router')">路由</a></li>
                <li><a href="javascript:void(0)" @click="goState('ajaxRequest')">axios请求demo</a></li>
                <li><a href="javascript:void(0)" @click="goState('render')">render函数</a></li>
                <li><a href="javascript:void(0)" @click="goState('demo')">组件demo</a></li>
                <li><a href="javascript:void(0)" @click="goState('eventBus')">eventBus</a></li>
            </ul>
            <!--<img src="@portal/images/afei.jpg">
            <img src="@portal/images/皮卡22.jpg">-->
            <div class="lwh">lwh</div>
            <div class="bgImg"></div>
            <button @click="fn()">fn</button>
            <audio :src="mp3" controls></audio>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                mp3:require('@portal/images/haha.m4a')
            }
        },
        //可自定义
//        hahah:{
//            name:'lwh'
//        },
        mounted() {
            //利用postmessage实现跨域
            /*var iWindow = document.getElementById('iWindow').contentWindow;
            setTimeout(()=>{
                iWindow.postMessage('ok','http://localhost:8080')
            },5000)*/
            /*iWindow.onload=function(){
                iWindow.postMessage('ok','http://localhost:8080/platform/checkEvaluation/startTest')
            }*/

        },
        methods: {
            fn(){
                var iWindow = document.getElementById('iWindow').contentWindow
                iWindow.postMessage('fn!!','http://193.168.70.86:8080')
            },
            goState: function (stateName) {
                this.$router.push({name: stateName});
            },
            goPath: function (path) {
                this.$router.push({path: path});
            }
        }
    }
</script>

<style scoped lang="less">
    /*如果在scoped的情况下引用的less里面带全局的标签例如body那么body就会变成body[data-1212]{}引用不到*/
    /*@import "~@portal/style/color.css";*/
    /*@import "~@portal/less/style1.less";*/
    .main {
        color: green;
        .lwh {
            color: red;
        }
    }

    .bgImg {
        width: 850px;
        height: 700px;
        background: url('~@portal/images/皮卡22.jpg');
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
<!--要想全局的body能吃到样式就必须再开一个不带scope的style标签-->
<style lang="less">
    @import "~@portal/less/style1.less";
</style>