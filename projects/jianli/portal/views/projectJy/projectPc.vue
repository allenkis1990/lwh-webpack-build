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
        <div>
            <div class="container" style="background:#fff">
                <div class="project-tab-box">
                    <el-radio v-model="tabRadio" label="portal">门户</el-radio>
                    <el-radio v-model="tabRadio" label="center">学员中心</el-radio>
                    <el-radio v-model="tabRadio" label="managerCenter">管理中心</el-radio>
                    <el-radio v-model="tabRadio" label="admin">教务后台</el-radio>
                </div>
            </div>
        </div>
        <!--门户-->
        <!--Vue对相似的元素不会执行重新mounted,这里一定要加key来识别 否则切换的时候不生效-->
        <div v-if="tabRadio==='portal'" key="portal">
            <description-bar des="门户首页"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-portal-1.jpg,sx-portal-2.jpg,sx-login.jpg"></description-bar>
            <description-bar des="门户资讯"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-info1.jpg,sx-info2.jpg"></description-bar>
            <description-bar des="培训课程，平台可培训的课程都在这里"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-course-list.jpg,sx-courseList2.jpg"></description-bar>
            <description-bar des="新用户注册"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-regist-1.jpg,sx-regist-2.jpg"></description-bar>
            <description-bar des="学员购买学分流程"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-buy1.jpg,sx-buy2.jpg,sx-buy3.jpg,sx-buy4.jpg,sx-buy5.jpg"></description-bar>
            <description-bar des="学员选课培训流程"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-buy6.jpg,sx-buy7.jpg,sx-buy8.jpg,sx-buy9.jpg"></description-bar>
        </div>

        <!--学员中心-->
        <div v-if="tabRadio==='center'" key="center">
            <description-bar des="学员订单"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-order1.jpg,sx-order2.jpg"></description-bar>
            <description-bar des="学员学习（单门课程学习模式）"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-course1.jpg,sx-course2.jpg,sx-play1.jpg,sx-cy.jpg,sx-cy2.jpg"></description-bar>
            <description-bar des="学员学习（培训班学习模式）"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-class1.jpg,sx-class2.jpg,sx-play1.jpg,sx-class8.jpg,sx-class3.jpg,sx-class4.jpg,sx-class5.jpg,sx-class6.jpg,sx-class7.jpg"></description-bar>
            <description-bar des="考试通过后获得培训证明，在线打印"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-zm1.jpg,sx-zm2.jpg"></description-bar>
            <description-bar des="修改个人信息"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="sx-stu-setting.jpg"></description-bar>
        </div>
        <div v-if="tabRadio==='managerCenter'" key="managerCenter">
            <description-bar des="ab"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="a.jpg,b.jpg"></description-bar>

        </div>
        <div v-if="tabRadio==='admin'" key="admin">
            <description-bar des="cd"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="c.jpg,d.jpg"></description-bar>
        </div>
    </div>
</template>
<style scoped>
    .project-tab-box{padding:0 15px;margin-top:5px;}
</style>
<script>
    import descriptionBar from '@portal/views/projectJy/components/descriptionBar.vue'
    import {isMobile} from '@portal/utils/lwh-utils'
    import {  Radio  } from 'element-ui'
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
            descriptionBar,
            elRadio:Radio
        },
        destroyed(){
            this.rmDomStyle()
        }
    }
</script>

