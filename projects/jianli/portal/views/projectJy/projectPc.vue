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
            <h5 class="container des-h2" style="background:#fff">继续教育平台门户，用户可以在门户注册，查看资讯，购买虚拟币等，这里只展示部分页面</h5>
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
            <h5 class="container des-h2" style="background:#fff">继续教育平台学员中心，学员购买虚拟币后可以进行在线班级学习，练习，考试，成绩达标后还可以获得培训证明，这里只展示部分页面</h5>
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
        <!--管理中心-->
        <div v-if="tabRadio==='managerCenter'" key="managerCenter">
            <h5 class="container des-h2" style="background:#fff">继续教育平台集体缴费中心，购买时候选择单位缴费，集体缴费管理员可以批量为学员支付</h5>
            <description-bar des="注册集体缴费管理员账号"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="mana-regist.jpg"></description-bar>
            <description-bar des="学员购买的时候选择单位缴费，集体缴费管理员可以在缴费中心批量为学员支付"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="buyForMana.jpg,mana-payCenter1.jpg,mana-payCenter2.jpg,mana-payCenter4.jpg,mana-payCenter5.jpg,mana-payCenter6.jpg,mana-payCenter7.jpg"></description-bar>
            <description-bar des="批次管理"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="mana-batch1.jpg,mana-batch2.jpg"></description-bar>
            <description-bar des="集体缴费管理员账户设置"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="mana-setting1.jpg,mana-setting2.jpg,mana-setting3.jpg,mana-setting4.jpg"></description-bar>

        </div>
        <div v-if="tabRadio==='admin'" key="admin">
            <h5 class="container des-h2" style="background:#fff">继续教育平台教务中心，管理员可以新建课程、课程包，发布资讯，发布商品等，这里只展示部分页面</h5>
            <description-bar des="登录教务后台"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="admin-index1.jpg,admin-index.jpg"></description-bar>
            <description-bar des="资讯管理"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="admin-info1.jpg,admin-info2.jpg,admin-info3.jpg,admin-info4.jpg"></description-bar>
            <description-bar des="运营基础配置"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="admin-config1.jpg,admin-config2.jpg,admin-config3.jpg,admin-config4.jpg"></description-bar>
            <description-bar des="课程管理"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="admin-course1.jpg,admin-course2.jpg,admin-course3.jpg,admin-course4.jpg,admin-course5.jpg"></description-bar>
            <description-bar des="课程包管理(把课程加入课程包)"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="admin-courseBag1.jpg,admin-courseBag2.jpg,admin-courseBag3.jpg,admin-courseBag4.jpg"></description-bar>
            <description-bar des="发布商品"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="admin-goods1.jpg,admin-goods2.jpg,admin-goods3.jpg,admin-goods4.jpg,admin-goods5.jpg,admin-goods6.jpg,admin-goods7.jpg,admin-goods8.jpg,admin-goods9.jpg,admin-goods10.jpg"></description-bar>
            <description-bar des="学员管理"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="admin-student1.jpg,admin-student2.jpg"></description-bar>
            <description-bar des="客服查询与订单管理"
                             baseImgDir="/demo/images/projectPc1"
                             imgs="admin-kf1.jpg,admin-order.jpg"></description-bar>
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

