<template>
    <div>
        <el-button type="primary"
                   style="margin-top:15px;"
                   @click="openMdDialog">readme.md
        </el-button>
        <el-dialog
                   :visible.sync="showReadmeDialog"
                   width="90%"
                   top="1vh">
            <h2 slot="title" style="color:#333">
                remdme.md
            </h2>
            <div class="read-content">

            </div>
        </el-dialog>
    </div>
</template>

<script>
    //通用js md内容弹窗组件
    import '@portal/assets/tomorrow-night-blue.css'
    let hljs = require('@portal/assets/highlight.min')
    hljs.initHighlightingOnLoad();
    let marked = require('@portal/assets/marked.min')
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    import {Button,Dialog} from 'element-ui'
    export default {
        inheritAttrs:false,
        props:{
            mdContent:{
                type:String
            }
        },
        data() {
            return {
                showReadmeDialog:false
            }
        },
        mounted() {

        },
        deactivated(){
            this.showReadmeDialog = false
        },
        methods: {
            openMdDialog(){
                this.showReadmeDialog=true
                setTimeout(()=>{
                    this.initMdContainer()
                },100)
            },
            initMdContainer(){
                document.querySelector('.read-content').innerHTML = marked(this.mdContent)
                let codeItems = document.querySelectorAll('.read-content code')
                codeItems.forEach((code)=>{
                    code.setAttribute('class','hljs javascript')
                })
            }
        },
        components: {
            elButton: Button,
            elDialog: Dialog
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
