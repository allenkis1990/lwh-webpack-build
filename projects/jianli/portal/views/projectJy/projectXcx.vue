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
            <h5 class="container des-h2" style="background:#fff">福建省会计继续教育培训平台微信小程序，提供注册，登录，学习，培训证明打印等</h5>
            <description-bar des="小程序门户"
                             baseImgDir="/demo/images/projectXcx"
                             imgs="mh1.jpg,mh2.jpg,mh3.jpg"></description-bar>
            <description-bar des="账号相关"
                             baseImgDir="/demo/images/projectXcx"
                             imgs="zc1.jpg,dl.jpg,dl2.jpg,sj.png,wjmm.jpg"></description-bar>
            <description-bar des="学习听课"
                             baseImgDir="/demo/images/projectXcx"
                             imgs="xx1.jpg,xx2.png,xx3.png,xx4.png"></description-bar>
            <description-bar des="其他"
                             baseImgDir="/demo/images/projectXcx"
                             imgs="center.png,pj.png,xf.png,xf2.png"></description-bar>
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

