<template>
    <div>
        <div>
            <div class="container">
                <div class="project-tab-box">
                    <el-radio v-model="tabRadio" label="1">门户</el-radio>
                    <el-radio v-model="tabRadio" label="2">学员中心</el-radio>
                    <el-radio v-model="tabRadio" label="3">管理中心</el-radio>
                    <el-radio v-model="tabRadio" label="4">教务后台</el-radio>
                </div>
            </div>
        </div>
        <!--门户-->
        <div style="margin-top:5px;" v-if="tabRadio==='1'">
            <description-bar des="hahahehe"
                             imgs="a1.png,a2.png,a1.png,a2.png"></description-bar>
            <description-bar des="aaa"
                             imgs="a1.png,a2.png,test-big-img.jpg"></description-bar>
        </div>
    </div>
</template>
<style scoped>
    .project-tab-box{padding:0 15px;margin-top:5px;}
</style>
<script>
    import descriptionBar from '@portal/views/projectJy/components/descriptionBar.vue'
    import {  Radio  } from 'element-ui'
    export default {
        mounted() {

        },
        data(){
            return {
                tabRadio:'1'
            }
        },
        methods: {

        },
        components:{
            descriptionBar,
            elRadio:Radio
        }
    }
</script>

