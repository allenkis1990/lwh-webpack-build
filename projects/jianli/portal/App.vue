<template>
    <div id="app">
        <transition name="fuck" appear>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition name="fuck" appear>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
    import Vue from 'vue';

    export default {
        data: function () {
            return {}
        },

        mounted: function () {

        },

        methods: {},
        components: {}
    }
</script>
<style scoped>
    body,html{overflow: hidden}
</style>
<style>
    .el-loading-text{text-align:center}
    /*css 和 less都可以引入*/
    .fuck-enter, .fuck-leave-active {
        opacity: 0;
        position: relative;
        top: 0
    }

    .fuck-enter-active, .fuck-leave-active {
        transition: all 1s ease;
    }
    /*@import '~nms/element-ui/lib/theme-chalk/index.css';!*完整*!*/
    @import "~@portal/style/base.css";
    @import "~@portal/style/bootstrap.min.css";
    @import "~@portal/style/cv.css";
</style>

