<template>
    <div class="content"
         v-scroll-page v-do-other>
        <div class="cv-container">
            <div id="section1" class="section active">
                <div id="top" title="顶部">
                    <img src="@portal/images/top.png" alt="回到顶部">
                </div>
                <div class="myIntro">
                    <h1 class="fade">Hello, I'm Allen</h1>
                    <h3 class="fade">一个爱运动，爱音乐，爱生活的前端工程师</h3>
                    <span class="active fade"
                          @click="goScrollLoc('scroll-aboutMe')"
                          id="abMe">关于我</span>
                    <span id="mypro"
                          @click="goScrollLoc('scroll-demo')"
                          class="fade">我的作品</span>
                </div>
                <div class="bannerMain" v-scroll-banner>
                    <ul class="bg-img">
                        <li style="display:block;opacity:1"></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>

            <div id="section2" class="section">
                <!-- 导航条-->
                <div id="nav-bar" class="bar">
                    <div class="container">
                        <a>
                            <div class="fl">Allen博客  <a href="javascript:void(0)" @click="openDemoPage('faceDetect.html')">aaa</a></div>
                        </a>
                        <ul class="fr nav-ul" v-tab-nav>
                            <!--<li loc="scroll-aboutMe">关于我</li>-->
                            <li loc="scroll-jobSelect">求职意向</li>
                            <li loc="scroll-demo">作品集</li>
                            <li loc="scroll-base">基本技能</li>
                            <li loc="scroll-mvvm">框架掌握</li>
                            <li loc="scroll-projectJy">项目经验</li>
                            <li loc="scroll-lastJob">我的经历</li>
                        </ul>
                        <div class="fr more-nav">
                            <img src="@portal/images/more.png" alt="更多">
                        </div>
                    </div>
                    <ul class="nav-ul nav-xs-ul" v-tab-nav>
                        <li loc="scroll-aboutMe">关于我</li>
                        <li loc="scroll-jobSelect">求职意向</li>
                        <li loc="scroll-demo">作品集</li>
                        <li loc="scroll-base">基本技能</li>
                        <li loc="scroll-mvvm">框架掌握</li>
                        <li loc="scroll-projectJy">项目经验</li>
                        <li loc="scroll-lastJob">我的经历</li>
                    </ul>
                </div>

                <!--关于我-->
                <h2 class="scroll-aboutMe">关于我</h2>
                <hr>
                <div class="center fades">
                    <!--<p class="center"><img src="@portal/images/mypic.jpg" alt="头像" /></p>-->
                    <div class="my-intro">
                        <p>
                            我叫Allen，是一个来自福州的前端工程师，这个简历博客存放了一些平常自己做的一些简单的小DEMO，博客使用的技术是：前端框架：Vuejs，后端：nodejs的express框架，构建工具：webpack，web静态资源服务：NGINX，
                            项目工程github地址：<a href="javascript:void(0)" @click="openGithubAddress('https://github.com/allenkis1990/lwh-webpack-build/tree/master/projects/jianli/portal')">https://github.com/allenkis1990/lwh-webpack-build/tree/master/projects/jianli/portal</a>。
                        </p>
                    </div>
                </div>
            </div>
            <div id="section3" class="section">
                <h2 class="scroll-jobSelect">求职意向</h2>
                <hr>
                <div class="container center fades">
                    <div class="col-md-3 col-xs-6 skill-ps skill">
                        <p><img src="@portal/images/web.png" alt="切图"></p>
                        <p class="ptitle">静态页制作</p>
                        <p>从PSD设计稿上切出页面需要的图片</p>
                        <p>用html+css高度还原设计稿的内容</p>
                    </div>
                    <div class="col-md-3 col-xs-6 skill-web skill">
                        <p><img src="@portal/images/css.png" alt="css"></p>
                        <p class="ptitle">前端工程化</p>
                        <p>使用nodejs、webpack搭建前端工程架构</p>
                        <p>压缩合并代码减小代码体积和代码请求数</p>
                    </div>
                    <div class="col-md-3 col-xs-6 skill-js skill">
                        <p><img src="@portal/images/js.png" alt="js"></p>
                        <p class="ptitle">前后端分离</p>
                        <p>使用mvvm框架快速开发前端功能</p>
                        <p>与后端人员配合接口联调</p>
                    </div>
                    <div class="col-md-3 col-xs-6 skill-h5 skill">
                        <p><img src="@portal/images/h5.png" alt="h5"></p>
                        <p class="ptitle">h5页面</p>
                        <p>兼容平板、安卓、IOS不同终端。</p>
                        <p>实现pc、移动页面响应式</p>
                    </div>
                </div>
            </div>
            <div class="section demo-section">
                <h2 class="scroll-demo">作品集（特效类）</h2>
                <hr>
                <div class="container center fades">
                    <p class="center intros">不使用任何js插件库，纯原生js+css3手写特效，这些特效主要是pc端页面上展示，有些在手机上可能不兼容</p>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('bannerScroll.html')">
                        <div class="imgbox">
                            <img src="@portal/images/01.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>轮播图</h4>
                                <p>简单但功能齐全的轮播图</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('beatPlane.html')">
                        <div class="imgbox">
                            <img src="@portal/images/06.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover" style="top: 45%">
                                <h4>打飞机小游戏</h4>
                                <p>纯手写简易打飞机小游戏</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('circle.html')">
                        <div class="imgbox">
                            <img src="@portal/images/02.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>圆形进度条</h4>
                                <p>非canvas的圆形进度条动画</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('defu.html')">
                        <div class="imgbox">
                            <img src="@portal/images/03.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>丝滑的德芙</h4>
                                <p>快速滑动方块，感受一下丝滑的感觉</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('wfscroll.html')">
                        <div class="imgbox">
                            <img src="@portal/images/04.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>无缝滚动</h4>
                                <p>真的一点缝隙都看不到的无缝滚动</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('pubuliu.html')">
                        <div class="imgbox">
                            <img src="@portal/images/05.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>瀑布流</h4>
                                <p>随屏幕大小伸缩的智能瀑布流</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <!--<div class="col-md-3 col-xs-6 ">
                        <div class="imgbox">
                            <img src="@portal/images/07.jpg" alt="作品配图">
                        </div>
                        <a href="http://www.cbecm.com/Live/Index/m_index" target="_blank">
                            <div class="zp-cover">
                                <h4>移动端页面</h4>
                                <p>列表页，兼容安卓、ios、平板</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6">
                        <div class="imgbox">
                            <img src="@portal/images/08.jpg" alt="作品配图">
                        </div>
                        <a href="drip.html" target="_blank">
                            <div class="zp-cover">
                                <h4>我的技术博客</h4>
                                <p>自己平时的知识点积累~</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>-->
                </div>
            </div>


            <div class="section demo-section">
                <h2 class="scroll-demo2">作品集（H5 API类）</h2>
                <hr>
                <div class="container center fades">
                    <p class="center intros">使用html5提供的javascript API做的一些小例子</p>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('websocket.html')">
                        <div class="imgbox">
                            <img src="@portal/images/05.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>websocket</h4>
                                <p>websocket简易多人聊天室</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('printPdf.html')">
                        <div class="imgbox">
                            <img src="@portal/images/05.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>打印预览pdf</h4>
                                <p>前端上传用户信息，后端接收并生成pdf</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="stateGo('player')">
                        <div class="imgbox">
                            <img src="@portal/images/05.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>h5播放视频</h4>
                                <p>使用video.js实现的简单的视频播放，支持上一个，下一个，视频断点续播</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                </div>
            </div>


            <div class="section demo-section">
                <h2 class="scroll-demo3">作品集（静态页面类）</h2>
                <hr>
                <div class="container center fades">
                    <p class="center intros">不引用任何css库纯手写静态页面</p>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('puxian-index.html')">
                        <div class="imgbox">
                            <img src="@portal/images/01.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>纯pc端页面1</h4>
                                <p>只兼容pc端浏览器,手机端查看会变形</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('puxian-erji.html')">
                        <div class="imgbox">
                            <img src="@portal/images/01.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>纯pc端页面2</h4>
                                <p>只兼容pc端浏览器,手机端查看会变形</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('puxian-sanji.html')">
                        <div class="imgbox">
                            <img src="@portal/images/01.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>纯pc端页面3</h4>
                                <p>只兼容pc端浏览器,手机端查看会变形</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('phonePage1.html')">
                        <div class="imgbox">
                            <img src="@portal/images/01.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>纯手机端页面1</h4>
                                <p>只兼容手机端浏览器,PC端查看页面不好看</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('phonePage2.html')">
                        <div class="imgbox">
                            <img src="@portal/images/01.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>纯手机端页面2</h4>
                                <p>只兼容手机端浏览器,PC端查看页面不好看</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6" @click="openDemoPage('xys1.html')">
                        <div class="imgbox">
                            <img src="@portal/images/01.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>响应式页面</h4>
                                <p>兼容平板、安卓、IOS、PC等各种不同终端。</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div id="section5" class="section">
                <h2 class="scroll-base">基本技能</h2>
                <hr>
                <knowleage-list :data-list="baseKnowleage"></knowleage-list>
                <!--<div class="col-md-3 col-xs-6">
                    <div class="wrap-box">
                        <div class="circle-wrap clip-auto">
                            <div class="left-clip percent"></div>
                            <div class="right-clip percent"></div>
                        </div>
                        <div class="circle-num">
                            <span>50</span>%
                        </div>
                    </div>
                    <p class="ptitle">Vue</p>
                </div>-->
            </div>

            <div id="section6" class="section">
                <h2 class="scroll-mvvm">MVVM框架掌握</h2>
                <hr>
                <div class="container center fades">
                    <knowleage-list :data-list="mvvmKnowleage"></knowleage-list>
                </div>
            </div>


            <div class="section demo-section">
                <h2 class="scroll-projectJy">项目经验</h2>
                <hr>
                <div class="container center fades">
                    <p class="center intros">由于做过的项目有很多，这里我只从中挑选出几个类型不同的项目做演示，大部分项目都需要账号密码来登录浏览且流程很繁琐，所以这里统一用项目的截图来演示。</p>
                    <div class="col-md-3 col-xs-6" @click="stateGo('projectPc')">
                        <div class="imgbox">
                            <img src="@portal/images/01.jpg" alt="作品配图">
                        </div>
                        <a href="javascript:void(0)">
                            <div class="zp-cover">
                                <h4>PC端项目</h4>
                                <p>华博继续教育培训平台</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                </div>
            </div>


            <div id="section7" class="section">
                <h2 class="scroll-lastJob">我的经历</h2>
                <hr>
                <div class="container center fades">
                    <ul class="my-xp">
                        <li>
                            <div class="date-box">
                                <p>02/2016</p>
                                <p>-</p>
                                <p>现在</p>
                            </div>
                            <div class="my-work my-xp-box">
                                <strong>福建华博教育科技有限公司</strong>
                                <p class="ptitle">前端工程师</p>
                                <p>编写pc静态页面，h5微信服务号静态页面，微信小程序静态页面</p>
                                <p>使用vue、angualr1编写前端业务</p>
                                <p>使用gulp、webpack来构建和维护前端项目</p>
                            </div>
                        </li>
                        <li>
                            <div class="date-box">
                                <p>09/2009</p>
                                <p>-</p>
                                <p>06/2011</p>
                            </div>
                            <div class="my-school my-xp-box">
                                <strong>福建教育学院</strong>
                                <p class="ptitle">大专</p>
                                <p>物流管理专业</p>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        <!--<p class="center beian">© RedSpite | <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">蜀ICP备16004270号</a></p>-->

    </div>
</template>
<script>
    import knowleageList from '@portal/views/home/components/knowleageList.vue'
    import tabNav from '@portal/views/home/directives/tabNav'
    import scrollPage from '@portal/views/home/directives/scrollPage'
    import doOther from '@portal/views/home/directives/doOther'
    import scrollBanner from '@portal/views/home/directives/scrollBanner'
    import {lwhAnimate,offset,isMobile} from '@portal/utils/lwh-utils'
    export default {
        beforeRouteLeave(to, from, next) {
//            window.removeEventListener('scroll',window.scrollListener)
            next()
        },
        mounted() {
            console.log('home');
        },
//        beforeDestroy(){
//            console.log(777);
//            window.removeEventListener('scroll',window.scrollListener)
//        },
//        activated(){
//            console.log('activated');
//        },
//        deactivated(){
//            console.log('deactivated');
//        },

        methods: {
            goScrollLoc(loc){
                var jumpTarget = document.querySelector('.'+loc)
                var offT = offset(jumpTarget,'top')
                var root = document.documentElement
                lwhAnimate(root,{scrollTop:offT})
            },
            stateGo(name){
                this.$router.push({name:name})
            },
            openDemoPage(path){
                if(isMobile()){
                    window.open('/demo/'+path,'_self')
                }else{
                    var popup = window.open('about:blank', '_blank')
                    popup.document.write('<h2>加载中。。</h2>')
                    popup.location = '/demo/' + path
                }
            },
            openGithubAddress(path){
                if(isMobile()){
                    window.open(path,'_self')
                } else{
                    var popup = window.open('about:blank', '_blank')
                    popup.document.write('<h2>加载中。。</h2>')
                    popup.location = path
                }
            }
        },
        components:{
            knowleageList
        },
        directives:{
            tabNav,
            scrollPage,
            doOther,
            scrollBanner
        },
        data(){
            return {
                baseKnowleage:[
                    {name:'HTML5',className:'html5'},
                    {name:'CSS3',className:'css3'},
                    {name:'js',className:'js'},
                    {name:'nodejs',className:'nodejs'}
                ],
                mvvmKnowleage:[
                    {name:'angular1',className:'angular'},
                    {name:'vue',className:'vue'}
                ]
            }
        }
    }
</script>