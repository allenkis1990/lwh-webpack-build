<template>
    <div>
        <a @click="$router.push({name:'home'})">首页</a>
        <a @click="$router.push({name:'test'})">test</a>

        <div style="width:800px;margin:10px auto;height:400px;">
            <video controlslist="nodownload"
                   class="video-js vjs-big-play-centered vjs-default-skin"
                   id="lwh-video"></video>
        </div>
    </div>
</template>
<style>
    @import "~video.js/dist/video-js.css";
</style>
<script>
    import videojs from 'video.js'

    export default {
        mounted() {
            console.log('player')
            var player = videojs(document.getElementById('lwh-video'), {
                controls: true, // 是否显示控制条
                poster: require('@portal/images/s36.jpg'), // 视频封面图地址
                preload: 'auto',
                autoplay: false,
                fluid: true, // 自适应宽高
                language: 'zh-CN', // 设置语言
                muted: false, // 是否静音
                inactivityTimeout: false
            }, function () {
//                this.play();
                console.log(this, 1212);
            });
            player.src(require('@portal/images/jay.mp4'))
            player.load(require('@portal/images/jay.mp4'))
        },
        methods: {}
    }
</script>

