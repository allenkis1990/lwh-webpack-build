<template>
    <div class="content" v-scroll-page>
        <div class="cv-container">
            <div id="section1" class="section active">
                <div id="top" title="顶部">
                    <img src="@portal/images/top.png" alt="回到顶部">
                </div>
                <div class="myIntro">
                    <h1 class="fade">Hello, I'm Allen</h1>
                    <h3 class="fade">一个爱运动，爱音乐，爱生活的前端工程师</h3>
                    <span class="active fade" id="abMe">关于我</span>
                    <span id="mypro" class="fade">我的作品</span>
                </div>
                <ul class="bg-img">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div id="section2" class="section">
                <!-- 导航条-->
                <div id="nav-bar" class="bar">
                    <div class="container">
                        <a>
                            <div class="fl">Allen博客</div>
                        </a>
                        <ul class="fr nav-ul" v-tab-nav>
                            <li loc="scroll-aboutMe">关于我</li>
                            <li loc="scroll-jobSelect">求职意向</li>
                            <li loc="scroll-demo">作品集</li>
                            <li loc="scroll-base">基本技能</li>
                            <li loc="scroll-mvvm">框架掌握</li>
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
                        <li loc="scroll-lastJob">我的经历</li>
                    </ul>
                </div>

                <!--关于我-->
                <h2 class="scroll-aboutMe">关于我</h2>
                <hr>
                <div class="center fades">
                    <!--<p class="center"><img src="@portal/images/mypic.jpg" alt="头像" /></p>-->
                    <div class="my-intro">
                        <p>我叫Allen，是一个来自福州的前端工程师</p>
                    </div>
                </div>
            </div>
            <div id="section3" class="section">
                <h2 class="scroll-jobSelect">求职意向</h2>
                <hr>
                <div class="container center fades">
                    <div class="col-md-3 col-xs-6 skill-ps skill">
                        <p><img src="@portal/images/web.png" alt="切图"></p>
                        <p class="ptitle">PS切图</p>
                        <p>从PSD上切出页面需要的图片</p>
                        <p>将小图标合成spirts优化。</p>
                    </div>
                    <div class="col-md-3 col-xs-6 skill-web skill">
                        <p><img src="@portal/images/css.png" alt="css"></p>
                        <p class="ptitle">网页制作</p>
                        <p>响应式页面,简单不冗余代码。</p>
                        <p>css3流畅动画效果，兼容不同浏览器。</p>
                    </div>
                    <div class="col-md-3 col-xs-6 skill-js skill">
                        <p><img src="@portal/images/js.png" alt="js"></p>
                        <p class="ptitle">前端功能</p>
                        <p>用JS完成常见的前端功能特效</p>
                        <p>用AJAX读取后台数据。</p>
                    </div>
                    <div class="col-md-3 col-xs-6 skill-h5 skill">
                        <p><img src="@portal/images/h5.png" alt="h5"></p>
                        <p class="ptitle">h5页面</p>
                        <p>移动端页面的书写</p>
                        <p>兼容平板、安卓、IOS不同终端。</p>
                    </div>
                </div>
            </div>
            <div id="section4" class="section">
                <h2 class="scroll-demo">作品集</h2>
                <hr>
                <div class="container center fades">
                    <p class="center intros">写jq前端功能的时候，我的宗旨是能手写就手写，不依赖插件。手写代码更简洁高效，也更能提升自己技术。</p>
                    <div class="col-md-3 col-xs-6">
                        <div class="imgbox">
                            <img src="@portal/images/01.jpg" alt="作品配图">
                        </div>
                        <a href="cart.html" target="_blank">
                            <div class="zp-cover">
                                <h4>商城类页面</h4>
                                <p>购物车结算jq，订单的选择或删除、金额的计算。</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6">
                        <div class="imgbox">
                            <img src="@portal/images/06.jpg" alt="作品配图">
                        </div>
                        <a href="http://www.cbecm.com/Analysis/Gametest/pc_test" target="_blank">
                            <div class="zp-cover" style="top: 45%">
                                <h4>测试类页面</h4>
                                <p>AJAX获取后台数据，用数组读取选项与题目。记录测试者的选项返给后台。</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6 ">
                        <div class="imgbox">
                            <img src="@portal/images/02.jpg" alt="作品配图">
                        </div>
                        <a href="http://www.cbecm.com/Live/Index/index" target="_blank">
                            <div class="zp-cover">
                                <h4>直播类页面</h4>
                                <p>直播页面响应式，css3 jq运用较多</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6 ">
                        <div class="imgbox">
                            <img src="@portal/images/03.jpg" alt="作品配图">
                        </div>
                        <a href="http://www.cbecm.com/Anchor/Anchor/anchor" target="_blank">
                            <div class="zp-cover">
                                <h4>列表类页面</h4>
                                <p>无缝轮播手写，花瓣动画。</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6 ">
                        <div class="imgbox">
                            <img src="@portal/images/04.jpg" alt="作品配图">
                        </div>
                        <a href="http://www.cbecm.com/Anchor/Anchor/anchor_detai?id=RjA4QzAyMzUtNERCNC04MjM1LUY2NTQtQUM2NTdGMkQ4OTcx" target="_blank">
                            <div class="zp-cover">
                                <h4>详情类页面</h4>
                                <p>视频播放，富文本编辑器手写。</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 col-xs-6 ">
                        <div class="imgbox">
                            <img src="@portal/images/05.jpg" alt="作品配图">
                        </div>
                        <a href="http://www.cbecm.com/Home/Index/index" target="_blank">
                            <div class="zp-cover">
                                <h4>官网类首页</h4>
                                <p>多数据响应式网页，能兼容不同大小电脑分辨率</p>
                                <img src="@portal/images/search.png" alt="查看">
                            </div>
                        </a>
                    </div>

                    <div class="col-md-3 col-xs-6 ">
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

    export default {
        mounted() {
        },
        methods: {

        },
        components:{
            knowleageList
        },
        directives:{
            tabNav,
            scrollPage
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