<template>
    <div id="lwh-video-parent" class="lwh-video-parent">
        <div style="top:48%;width:100%;position:absolute;text-align:center;color:#fff;font-weight:bold;font-size:28px;">
            谢谢收看！
        </div>

        <div id="lwh-video-box" class="lwh-video-box">
            <div class="title-bar" :style="titleBarStyle">
                <button class="video-tab video-tab-pre"
                        style="margin-right:5px;"
                        @click="pre">上一个</button>
                <button class="video-tab video-tab-next"
                        @click="next">下一个</button>
                <!--<button class="video-tab" id="hidePlayBtn">播放</button>-->
                <!--当前视频名称：{{haha}}-->
                当前视频名称：《{{videoSources[curVideoSouceIdx].name}}》，上次播放到：{{lastPlayTime}}秒
            </div>
            <video controlslist="nodownload"
                   :style="videoStyle"
                   style="width:100%;position:absolute"
                   class="video-js vjs-big-play-centered vjs-default-skin"
                   id="lwh-video"></video>
        </div>
    </div>
</template>
<style scoped>
    @import "~video.js/dist/video-js.css";

    .title-bar {
        position: absolute;
        background: #948C76;
        width: 100%;
        top: 0;
        color: #fff;
        display:flex;
        justify-content: center;
        align-items: center;
    }

    button {
        outline: none;
        border: none
    }

    .lwh-video-box {
        /*transition: margin-top 2s linear;*/
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0
    }

    .lwh-video-parent {
        margin: 0px auto;
        position: relative;
        overflow: hidden;
        background: green;
    }

    .video-tab {
        font-size: 12px;
        width: 60px;
        height: 30px;
        background: red;
        z-index: 99;
        color: #fff;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }

    .video-tab-pre {
        top: 55px;
        left: 0;
    }

    .video-tab-next {
        bottom: 55px;
        left: 0;
    }
</style>
<script>
    import videojs from 'video.js'
    import {lwhAnimate, setCookie, getCookie} from '@portal/utils/lwh-utils'

    export default {
        mounted() {
            var _this = this
            this.player = videojs(document.getElementById('lwh-video'), {
                controls: true, // 是否显示控制条
                poster: require('@portal/images/s36.jpg'), // 视频封面图地址
                preload: 'auto',
//                autoplay: true,
//                sources: [{
//                    src: 'http://www.allen19906666.com/demo/videos/jay2.mp4',
//                    type: 'video/mp4'
//                }],
//                fluid: true, // 自适应宽高
                language: 'zh-CN', // 设置语言
                muted: false, // 是否静音
                inactivityTimeout: false
            }, function () {
                console.log('player-init!!!')
                var player = this
//                setTimeout(function () {
//                    document.getElementById('lwh-video').play();
//                }, 5000)
                console.log(this, 1212);
                _this.setVideoRightSize()
                _this.getInitVideoUrl().then(function(initVideoUrl){
                    player.src(initVideoUrl)
                    player.load(initVideoUrl)
                    _this.initPlayEvents(player)
                })
//                progress
//                this.on('canplay',function(){
//                    console.log('fuck');
//                    console.log(player.autoplay(),1212);
//                    player.play()
//                    _this.videoIsOk = true
//
//                })
            });
            this.initWindowEvents()
        },
        data() {
            return {
                videoStyle:{
                    height:'88%',
                    top:'12%'
                },
                titleBarStyle:{
                    'height': '12%',
                    'line-height':'100%'
                },
                videoIsOk:false,
                curVideoLoaded: false,//当前视频首次被加载
                lastPlayTime: 0,
                tabing: false,
                player: null,
                curVideoSouceIdx: 0,//默认0
                videoSources: [
                    {url: 'https://allen-bigfile.oss-cn-zhangjiakou.aliyuncs.com/jay.mp4', id: 'jay', name: '给我一首歌的时间'},
                    {url: 'https://allen-bigfile.oss-cn-zhangjiakou.aliyuncs.com/jay2.mp4', id: 'jay2', name: '半岛铁盒'},
                    {url: 'https://allen-bigfile.oss-cn-zhangjiakou.aliyuncs.com/jay3.mp4', id: 'jay3', name: '爱在西元前'}
                ]
            }
        },
        methods: {
            getInitVideoUrl(){
                var _this = this
                return new Promise((resolve,reject)=>{
                    var lastPlayVideoId = getCookie('lastPlayVideoId')
                    var lastPlayVideoIndex = 0
                    if(lastPlayVideoId!==null&&lastPlayVideoId!==undefined&&lastPlayVideoId!==''){
                        lastPlayVideoIndex = _this.getLastPlayVideoIdx(lastPlayVideoId)
                    }
                    _this.curVideoSouceIdx = lastPlayVideoIndex
                    var initVideoUrl = _this.videoSources[_this.curVideoSouceIdx].url
                    resolve(initVideoUrl)
                })
            },
            getLastPlayVideoIdx(lastPlayVideoId){
                var res = this.videoSources.findIndex(function(item){
                    return item.id === lastPlayVideoId
                })
                if(res<=-1){
                    return 0
                } else{
                    return res
                }
            },
            initWindowEvents(){
                var _this = this
                window.addEventListener('resize', () => {
                    _this.setVideoRightSize()
                })

                document.oncontextmenu = function($) {
                    _this.$message({
                        message: '禁止右键',
                        type: 'warning'
                    })
                    return false
                };
            },
            initPlayEvents(player) {
                this.playerEnd(player)
                this.fullScreenChange(player)
                this.playerWaiting(player)
                this.videoWorkingEvent(player)
                this.playerTimeUpdate(player)
            },
            //每次切换视频后初始化一些事件和参数
            videoWorkingEvent(player) {
                //当前视频设置成没加载状态
                var lastPlayTime = this.getLastPlayTime()
                this.curVideoLoaded = false
                if (lastPlayTime) {
                    player.play()
                }
            },
            playerWaiting(player) {
                player.on('waiting', function () {
                    console.log('视频卡顿中')
                })

            },
            fullScreenChange(player) {
                var _this = this
                player.on('fullscreenchange', function () {
                    _this.setVideoRightSize(player)
                })
            },
            playerEnd(player) {
                var _this = this
                player.on('ended', function () {
                    _this.$message({
                        message: '当前视频播放完毕，请进入下一个',
                        type: 'warning'
                    })
                    console.log('播放完了ended！')
//                    _this.next()
                })
            },
            playerTimeUpdate(player) {
                var _this = this
                player.on('timeupdate', function (data) {
                    var curTime = player.currentTime()
                    var curVideo = _this.videoSources[_this.curVideoSouceIdx]
                    var id = curVideo.id
                    if(curTime){
                        if (!_this.curVideoLoaded) {
                            _this.curVideoLoaded = true
                            setCookie('lastPlayVideoId',id)
                            console.log('设置lastPlayVideoId',id)
                            var lastPlayTime = _this.getLastPlayTime()
                            if (lastPlayTime) {
                                var s = Math.ceil(lastPlayTime)
                                player.currentTime(s)
                            }
                        } else {
                            var isPaused = player.paused()
                            if (!isPaused) {
                                setCookie(id, curTime)
                            }
                        }
                    }
                })

            },
            getLastPlayTime() {
                var curVideo = this.videoSources[this.curVideoSouceIdx]
                var id = curVideo.id
                var lastPlayTime = getCookie(id)
                this.lastPlayTime = Math.ceil(lastPlayTime)
                return lastPlayTime
            },
            setVideoRightSize() {
                var rootW = document.documentElement.clientWidth
                var rootH = document.documentElement.clientHeight
                var videoParent = document.getElementById('lwh-video-parent')
                videoParent.style.width = rootW + 'px'
                videoParent.style.height = rootH + 'px'
                if (this.player.isFullscreen()) {
//                    console.log('isFullscreen')
                    this.setFullScreenStyle(0, '100%')
                } else {
                    this.setFullScreenStyle(this.videoStyle.top, this.videoStyle.height)
                }
            },
            setFullScreenStyle(top, height) {
                var videoDom = document.querySelector('#lwh-video video')
                var videoDomOutter = document.querySelector('#lwh-video')
                videoDom.style.top = top
                videoDom.style.height = height
                videoDomOutter.style.top = top
                videoDomOutter.style.height = height
            },
            moveVideo(type, cb) {
                var _this = this
                if (this.tabing) {
                    return false
                }
                this.player.pause()
                this.tabing = true
                var videoBox = document.getElementById('lwh-video-box')
                var rootH = document.documentElement.clientHeight
                var moveDirection = type === 'pre' ? '' : '-'
                var initDirection = type === 'pre' ? '-' : ''
                lwhAnimate(videoBox, {'top': moveDirection + rootH + 'px'}, function () {
                    videoBox.style.top = initDirection + rootH + 'px';
                    cb && cb()
                    lwhAnimate(videoBox, {'top': '0px'}, function () {
                        _this.tabing = false
                    }, null, 0.2)

                }, null, 0.2)
            },
            pre() {
                var _this = this
                if (!this.tabing) {
                    this.curVideoSouceIdx--
                    if (this.curVideoSouceIdx < 0) {
                        _this.$message({
                            message: '已经是第一个了',
                            type: 'warning'
                        })
                        this.curVideoSouceIdx = 0
                        return false
                    }
                    this.moveVideo('pre', function () {
                        var videoUrl = _this.videoSources[_this.curVideoSouceIdx].url
                        _this.loadUrl(videoUrl)
                    })
                }
            },
            next() {
                var _this = this
                if (!this.tabing) {

                    this.curVideoSouceIdx++
                    if (this.curVideoSouceIdx > this.videoSources.length - 1) {
                        this.curVideoSouceIdx = this.videoSources.length - 1
                        _this.$message({
                            message: '已经是最后一个了',
                            type: 'warning'
                        })
                        return false
                    }
                    this.moveVideo('next', function () {
                        var videoUrl = _this.videoSources[_this.curVideoSouceIdx].url
                        _this.loadUrl(videoUrl)
                    })


                }
            },
            loadUrl(videoUrl, posterUrl) {
                this.player.options.poster = posterUrl || require('@portal/images/s36.jpg')
                this.player.src(videoUrl)
                this.player.load(videoUrl)
                this.videoWorkingEvent(this.player)
            }
        }
    }
</script>

