<template>
    <div :style="!isMobile?{width:'100%',height:'100%',overflow: 'auto'}:{}">
        <a style="color:red;
display:inline-block;
font-weight:bold;
text-decoration:none;
font-size:20px;
cursor:pointer;
margin-bottom:10px;" @click="$router.push({name:'home'})">
            <—返回首页
        </a>
        <!--门户-->
        <!--Vue对相似的元素不会执行重新mounted,这里一定要加key来识别 否则切换的时候不生效-->
        <div>
            <h5 class="container des-h2" style="background:#fff">福建省会计继续教育培训平台微信服务号，提供注册，登录，选课，修改人员信息等功能</h5>
            <description-bar des="服务号门户"
                             baseImgDir="/demo/images/projectFwh"
                             imgs="yd.jpg,sy.jpg,zixun1.jpg,zixun3.jpg,zixun4.jpg,zixun5.jpg,zixun-detail.jpg"></description-bar>
            <description-bar des="账号相关"
                             baseImgDir="/demo/images/projectFwh"
                             imgs="zc.jpg,zc2.jpg,zc3.jpg,dl.jpg,zhmm.jpg,xgmm.jpg"></description-bar>
            <description-bar des="购买学分虚拟币"
                             baseImgDir="/demo/images/projectFwh"
                             imgs="buy1.jpg,buy2.jpg,buy3.jpg,buy4.jpg,buy5.jpg"></description-bar>
            <description-bar des="选课相关"
                             baseImgDir="/demo/images/projectFwh"
                             imgs="xk1.jpg,xk2.jpg,xk3.jpg,xk4.jpg,xk5.jpg,xk6.jpg,xk7.jpg,xk8.jpg,xk9.jpg,xk10.jpg,xk11.jpg"></description-bar>
            <description-bar des="订单"
                             baseImgDir="/demo/images/projectFwh"
                             imgs="dd1.jpg,dd2.jpg,dd3.jpg"></description-bar>
            <description-bar des="个人中心"
                             baseImgDir="/demo/images/projectFwh"
                             imgs="center.jpg,center2.jpg,center3.jpg"></description-bar>
        </div>
    </div>
</template>
<style scoped>
    .project-tab-box{padding:0 15px;margin-top:5px;}
    .des-h2{padding:5px 30px;font-weight: bold}
</style>
<script>
    import descriptionBar from '@portal/views/projectJy/components/descriptionBar.vue'
    import {isMobile} from '@portal/utils/lwh-utils'
    export default {
        mounted() {
            this.setDomStyle()
        },
        data(){
            return {
                tabRadio:'portal',
                isMobile:isMobile()
            }
        },
        methods: {
            setDomStyle(){
                if(!this.isMobile){
                    document.documentElement.style.overflow = 'hidden'
                    document.body.style.overflow = 'hidden'
                    document.documentElement.style.height = '100%'
                    document.body.style.height = '100%'
                    document.getElementById('app').style.height = '100%'
                    document.getElementById('appRoot').style.height = '100%'
                }
            },
            rmDomStyle(){
                if(!this.isMobile){
                    document.documentElement.style.overflow = ''
                    document.body.style.overflow = ''
                    document.getElementById('app').style.height = ''
                    document.getElementById('appRoot').style.height = ''
                    document.documentElement.style.height = ''
                    document.body.style.height = ''
                }
            }
        },
        components:{
            descriptionBar
        },
        destroyed(){
            this.rmDomStyle()
        }
    }
</script>

