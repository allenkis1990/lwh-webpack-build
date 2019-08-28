<template>


    <div>
        <div class="container center" style="background:#fff">
            <h3 class="intros">{{des}}</h3>
            <div class="col-md-3 col-xs-6 desBar-img-box"
                 @click="openImgDialog($event,index)"
                 v-for="(item,index) in imgList" >
                <div class="bor">
                    <img :src="item.path">
                </div>
            </div>
        </div>



        <div class="des-dialog" v-if="showDialog" @click="clickDialog">
            <div class="mask"></div>
            <div class="des-dialog-main">
                <div class="des-dialog-header">
                    <span class="img-pre" :class="{'opacity0':!showImgPre}">{{countImgPre}}</span>
                    <span class="des-pic-ico"></span><span class="des-pictit">{{bigImgName}}</span>
                    <button class="des-close des-op" @click="closeDialog"></button>
                    <button class="des-plus des-op" @click="changeImgSize('plus')" title="放大"></button>
                    <button class="des-minus des-op" @click="changeImgSize('minus')" title="缩小"></button>
                    <button class="des-fit des-op" @click="changeImgSize('init')" title="还原"></button>
                </div>
                <div class="des-dialog-content">
                    <img :src="bigImgPath"
                         id="bigImgPath">
                </div>
                <a class="pre-btn pre-btn-pc" @click="pre($event)" v-if="!isMobile"></a>
                <a class="next-btn next-btn-pc" @click="next($event)" v-if="!isMobile"></a>


                <a class="pre-btn" @click="pre($event)" v-if="isMobile&&showMobilePreNext"></a>
                <a class="next-btn" @click="next($event)" v-if="isMobile&&showMobilePreNext"></a>
            </div>
        </div>

    </div>
</template>
<style scoped >
    @keyframes fadeIn_left {
        from{
            transform: translateX(20px) translateY(20px);
        }

        to{
            transform: translateX(0px) translateY(0px);
        }
    }
    *{box-sizing: border-box}
    .desBar-box{}
    .desBar-img-box{cursor:pointer;height:200px;margin-bottom:10px;animation:fadeIn_left 1.5s;}
    .desBar-img-box .bor{border:1px solid #ddd;width:100%;height:100%}
    .desBar-img-box .bor:hover{border-color:#409EFF}
    .desBar-img-box img{width:100%;height:100%;}
    .intros{padding:0 15px;animation:fadeIn_left 1.5s;text-align:left}
    .mask{width:100%;height:100%;background: #000;opacity:0.8;position:fixed;top:0;left:0;z-index:98}

    .des-pic-ico {
        float: left;
        width: 25px;
        display: inline-block;
        height: 100%;
        background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+NDgvaDAwMDFfZmlsZS1pbWctbGFyZ2U8L3RpdGxlPjxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTIxLjk5NSAwSDIuMDA1Qy44OTggMCAwIC44OTggMCAyLjAwNXYxOS45OUMwIDIzLjEwMi44OTcgMjQgMi4wMDUgMjRoMTkuOTlDMjMuMTAzIDI0IDI0IDIzLjEwMyAyNCAyMS45OTZWMi4wMDVDMjQgLjg5OCAyMy4xMDQgMCAyMS45OTUgMHpNMjMgMjEuOTk1QzIzIDIyLjU1IDIyLjU1IDIzIDIxLjk5NSAyM0gyLjAwNUMxLjQ1IDIzIDEgMjIuNTUgMSAyMS45OTZWMi4wMDVDMSAxLjQ1IDEuNDUgMSAyLjAwNSAxaDE5Ljk5QzIyLjU1IDEgMjMgMS40NSAyMyAyLjAwNXYxOS45OXpNMTcgMTNsLTMuNzMgMy43M0w4IDlsLTUgNSAuNSAxczMuMDA1LTIuNzggNC41LTQuNWMuNDUzLjU1MyA3IDEwLjUgNyAxMC41aDFsLTIuMTItMy4zNzggMy42Mi0zLjYyIDMgMyAuNS0xLTMtM2gtMXptLTQuMzU3LTQuMDdsLS4yIDIuOCAyLjAyNC0xLjkwNSAyLjAyNCAxLjkwNS0uMi0yLjggMi43MjYtLjQyMy0yLjI3NC0xLjU4NSAxLjM3My0yLjQzNC0yLjYzNi44MjMtMS4wMTMtMi42MS0xLjAxMyAyLjYxLTIuNjM2LS44MjIgMS4zNzQgMi40MzQtMi4yNzUgMS41ODUgMi43MjYuNDI0em0xLjgyNC0zLjM4N2MxLjAzIDAgMS44NjcuODUzIDEuODY3IDEuOTA3IDAgMS4wNTUtLjgzOCAxLjkwOC0xLjg2NyAxLjkwOC0xLjAzIDAtMS44NjctLjg1My0xLjg2Ny0xLjkwOCAwLTEuMDU0LjgzOC0xLjkwNyAxLjg2Ny0xLjkwN3oiLz48L2c+PC9nPjwvc3ZnPg==");
        background-repeat:no-repeat ;
        background-position: center center;
    }
    .des-pictit{color:#fff;font-size:14px;float:left;margin-left:5px;}
    .des-dialog-header{background:#000;height:40px;width:100%;line-height:40px;text-align:center}
    .img-pre{color:#fff;transition:opacity 0.2s}
    .opacity0{opacity:0}
    .opacity1{opacity:1}
    .des-dialog-main{width:100%;height:100%;position:fixed;left:0;top:0;z-index:99;}
    .des-dialog-content {
        text-align:center;
        overflow: auto;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .des-dialog-content img{
        flex-shrink:0
    }
    .des-op{
        width:40px;
        height:40px;
        background-repeat:no-repeat;
        background-position: center center;
        background-color: transparent;
        text-align: center;
        outline:none;
        border:none;
        float: right;
    }
    .des-op:hover{background-color:#ccc }
    .des-close{
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+MTYvaTAwMjdfY2xvc2UtZGlhbG9nPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48cGF0aCBkPSJNOS42NCA4bDQuMDE2IDQuMDE2Yy4yMy4yMy4zNDQuNTAyLjM0NC44MiAwIC4zMTgtLjExNS41OS0uMzQ0LjgyLS4yMy4yMy0uNTAyLjM0NC0uODIuMzQ0LS4zMTggMC0uNTktLjExNS0uODItLjM0NEw4IDkuNjRsLTQuMDE2IDQuMDE2Yy0uMjMuMjMtLjUwMi4zNDQtLjgyLjM0NC0uMzE4IDAtLjU5LS4xMTUtLjgyLS4zNDQtLjIzLS4yMy0uMzQ0LS41MDItLjM0NC0uODIgMC0uMzE4LjExNS0uNTkuMzQ0LS44Mkw2LjM2IDggMi4zNzQgNC4wMTZjLS4yMy0uMjMtLjM0NC0uNTAzLS4zNDQtLjgyIDAtLjMxOC4xMTYtLjU4Ny4zNDUtLjgwNS4yMy0uMjMuNTAzLS4zNC44Mi0uMzQuMzE4IDAgLjU5LjExMy44Mi4zNDNMOCA2LjM3Nmw0LjAzLTQuMDNjLjIzLS4yMy41MDQtLjM0NS44MjItLjM0NS4zMTcgMCAuNTkuMTE3LjgyLjM0Ni4yMi4yMy4zMjguNTAyLjMyOC44MiAwIC4zMTgtLjExLjU4Ni0uMzI4LjgwNUw5LjY0MiA4eiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+");
    }
    .des-plus{
        background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE5cHgiIGhlaWdodD0iMTlweCIgdmlld0JveD0iMCAwIDE5IDE5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCBCZXRhIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Y3AtdG9vbGJhci1wbHVzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2ggQmV0YS48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iV2hpdGUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJjcC10b29sYmFyLXBsdXMiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0idG9vbGJhci1wbHVzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjAwMDAwMCwgMS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJGaWxsLTEiIHBvaW50cz0iNi42MjUgNC4yMjUxIDcuNjI1IDQuMjI1MSA3LjYyNSA2Ljc5NTEgMTAuMTI1IDYuNzk1MSAxMC4xMjUgNy44MjUxIDcuNjI1IDcuODI1MSA3LjYyNSAxMC4zOTQxIDYuNjI1IDEwLjM5NDEgNi42MjUgNy44MjUxIDQuMTI1IDcuODI1MSA0LjEyNSA2Ljc5NTEgNi42MjUgNi43OTUxIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNy4xMjUsMTMuMzcyIEMzLjg4NiwxMy4zNzIgMS4yNSwxMC42NTMgMS4yNSw3LjMxMSBDMS4yNSwzLjk2OSAzLjg4NiwxLjI1IDcuMTI1LDEuMjUgQzEwLjM2NCwxLjI1IDEzLDMuOTY5IDEzLDcuMzExIEMxMywxMC42NTMgMTAuMzY0LDEzLjM3MiA3LjEyNSwxMy4zNzIgTTE2LjcxNiwxNS4xNDcgTDEzLjE4LDExLjYxMiBDMTMuMTE5LDExLjU1MiAxMy4wNDUsMTEuNTE4IDEyLjk3NCwxMS40NzYgQzEzLjc3NiwxMC4yOTMgMTQuMjUsOC44NTggMTQuMjUsNy4zMTEgQzE0LjI1LDMuMjggMTEuMDU0LDAgNy4xMjUsMCBDMy4xOTYsMCAwLDMuMjggMCw3LjMxMSBDMCwxMS4zNDMgMy4xOTYsMTQuNjIyIDcuMTI1LDE0LjYyMiBDOC44NDIsMTQuNjIyIDEwLjQxOSwxMy45OTUgMTEuNjUsMTIuOTUzIEMxMS42NzksMTIuOTkgMTEuNjkyLDEzLjAzMyAxMS43MjYsMTMuMDY2IEwxNS4yNjIsMTYuNjAxIEMxNS42NTIsMTYuOTkyIDE2LjI4NSwxNi45OTIgMTYuNjc2LDE2LjYwMSBMMTYuNzE2LDE2LjU2MiBDMTcuMTA2LDE2LjE3MiAxNy4xMDYsMTUuNTM4IDE2LjcxNiwxNS4xNDciIGlkPSJGaWxsLTIiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+");
    }
    .des-minus{
        background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE5cHgiIGhlaWdodD0iMTlweCIgdmlld0JveD0iMCAwIDE5IDE5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCBCZXRhIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Y3AtdG9vbGJhci1taW51czwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoIEJldGEuPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IldoaXRlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iY3AtdG9vbGJhci1taW51cyIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIGlkPSJQYWdlLTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkZpbGwtMSIgcG9pbnRzPSI0LjEyNSA3LjgyNTUgMTAuMTI1IDcuODI1NSAxMC4xMjUgNi43OTU1IDQuMTI1IDYuNzk1NSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTcuMTI1LDEzLjM3MiBDMy44ODYsMTMuMzcyIDEuMjUsMTAuNjUzIDEuMjUsNy4zMTEgQzEuMjUsMy45NjkgMy44ODYsMS4yNSA3LjEyNSwxLjI1IEMxMC4zNjQsMS4yNSAxMywzLjk2OSAxMyw3LjMxMSBDMTMsMTAuNjUzIDEwLjM2NCwxMy4zNzIgNy4xMjUsMTMuMzcyIE0xNi43MTYsMTUuMTQ3IEwxMy4xOCwxMS42MTIgQzEzLjExOSwxMS41NTIgMTMuMDQ1LDExLjUxOCAxMi45NzQsMTEuNDc2IEMxMy43NzYsMTAuMjkzIDE0LjI1LDguODU4IDE0LjI1LDcuMzExIEMxNC4yNSwzLjI4IDExLjA1NCwwIDcuMTI1LDAgQzMuMTk2LDAgMCwzLjI4IDAsNy4zMTEgQzAsMTEuMzQzIDMuMTk2LDE0LjYyMiA3LjEyNSwxNC42MjIgQzguODQyLDE0LjYyMiAxMC40MTksMTMuOTk1IDExLjY1LDEyLjk1MyBDMTEuNjc5LDEyLjk5IDExLjY5MiwxMy4wMzMgMTEuNzI2LDEzLjA2NiBMMTUuMjYyLDE2LjYwMSBDMTUuNjUyLDE2Ljk5MiAxNi4yODUsMTYuOTkyIDE2LjY3NiwxNi42MDEgTDE2LjcxNiwxNi41NjIgQzE3LjEwNiwxNi4xNzIgMTcuMTA2LDE1LjUzOCAxNi43MTYsMTUuMTQ3IiBpZD0iRmlsbC0yIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==");
    }
    .des-fit{
        background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE5cHgiIGhlaWdodD0iMTlweCIgdmlld0JveD0iMCAwIDE5IDE5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCBCZXRhIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Y3AtdG9vbGJhci1maXQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaCBCZXRhLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJXaGl0ZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImNwLXRvb2xiYXItZml0IiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9IlBhZ2UtMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi41MDAwMDAsIDIuNTAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iRmlsbC0xIiBwb2ludHM9IjAuOTk5OSAxMi4wMDAyIDAuOTk5OSA4Ljk5OTIgLTAuMDAwMSA4Ljk5OTIgLTAuMDAwMSAxNC4wMDAyIDUuMDAwOSAxNC4wMDAyIDUuMDAwOSAxMy4wMDAyIDEuOTk5OSAxMy4wMDAyIDUuMDAwOSAxMC4wMDAyIDMuOTk5OSA4Ljk5OTIiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJGaWxsLTIiIHBvaW50cz0iMCAtMC4wMDA0IDAgNC45OTk2IDEgNC45OTk2IDEgMi4wMDA2IDQgNC45OTk2IDUgNC4wMDA2IDIgMS4wMDA2IDUgMS4wMDA2IDUgLTAuMDAwNCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTksLTAuMDAwNCBMOSwxLjAwMDYgTDEyLDEuMDAwNiBMOSw0LjAwMDYgTDEwLDQuOTk5NiBMMTMsMi4wMDA2IEwxMyw0Ljk5OTYgTDE0LDQuOTk5NiBMMTQsLTAuMDAwNCBMOSwtMC4wMDA0IFogTTEzLDguOTk5NiBMMTMsMTIuMDAwNiBMMTAsOC45OTk2IEw5LDEwLjAwMDYgTDEyLDEzLjAwMDYgTDksMTMuMDAwNiBMOSwxMy45OTk2IEwxNCwxMy45OTk2IEwxNCw4Ljk5OTYgTDEzLDguOTk5NiBaIiBpZD0iRmlsbC0zIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==");
    }
    .pre-btn{background:url('~@portal/images/pre-btn.png');left:5px }
    .next-btn{background:url('~@portal/images/next-btn.png');right:5px }
    .pre-btn,.next-btn{cursor:pointer;width:35px;height:50px;display:inline-block;position: fixed;top:50%;margin-top:-25px;background-size:cover;background-repeat:no-repeat;background-position: center center }
    .pre-btn-pc:hover{background-color:#ccc }
    .next-btn-pc:hover{background-color:#ccc }




</style>
<script>
    import {imgAutoSize,isMobile} from '@portal/utils/lwh-utils'
    export default {
        props: {
            des: {
                type: String
            },
            imgs: {
                type: String
            },
            baseImgDir:{
                type: String
            }
        },
        data: function () {
            return {
                preNextTimer:null,
                showMobilePreNext:false,
                isMobile:isMobile(),
                curImgIndex:0,
                imgList:[],
                showDialog:false,
                bigImgPath:'',
                bigImgName:'',
                imgSizePre:1,
                showImgPre:false,
                showImgPreTimer:null
            }
        },
        created(){
            console.log(12331212);
        },
        mounted: function () {
            console.log(123);
            this.getImgList()
            window.addEventListener('resize',()=>{
                if(this.showDialog&&this.imgList.length){
                this.setContentHAndImgAutoSize()
                }
            })
        },

        computed:{
            countImgPre(){
                return parseInt(this.imgSizePre*100)+'%'
            }
        },
        methods: {
            initImgSize(){
                this.imgSizePre = 1
                var dialogContent = document.querySelector('.des-dialog-content')
                var bigImg = document.getElementById('bigImgPath')
                dialogContent.style.display = 'flex'
                bigImg.style = ''
            },
            changeImgSize(type){
                //显示隐藏百度比字样
                clearTimeout(this.showImgPreTimer)
                this.showImgPre = true
                this.showImgPreTimer = setTimeout(()=>{
                    this.showImgPre = false
                },1000)
                if(type==='plus'){
                    this.imgSizePre *= 1.25
                    this.changeImgCommonDo()
                }else if(type==='minus'){
                    this.imgSizePre *= 0.75
                    this.changeImgCommonDo()
                }else{
                    this.initImgSize()
                }
            },
            changeImgCommonDo(){
                var bigImg = document.getElementById('bigImgPath')
                var imgW = Number(bigImg.getAttribute('width'))
                var imgH = Number(bigImg.getAttribute('height'))
                var root = document.documentElement
                var rootH = root.clientHeight
                var rootW = root.clientWidth
                var dialogHeaderH = document.querySelector('.des-dialog-header').clientHeight
                var dialogContent = document.querySelector('.des-dialog-content')
                var contentH = rootH - dialogHeaderH

                console.log(imgW);
                console.log(imgH);
                var finallyW = imgW*this.imgSizePre
                var finallyH = imgH*this.imgSizePre
                bigImg.style.width = finallyW+'px'
                bigImg.style.height = finallyH+'px'
                //如果图片高度大于图片最大容器高度 把容器的flex拿掉 同时设置容器的滚动条(宽度也一样)
                //否则就还原成flex样式
                if(finallyH>contentH || finallyW>rootW){
                    dialogContent.style.display = 'inherit'
                    if(finallyH>contentH){
                        dialogContent.scrollTop = finallyH/2
                    }
                    if(finallyW>rootW){
                        dialogContent.scrollLeft = finallyW/2
                    }
                }else{
                    dialogContent.style.display = 'flex'
                }
            },
            getImgList(){
//                this.imgList = []
                var imgList = this.imgs.split(',')
//                console.log(imgList);
                var _this = this
                var count = 0
                var interVal = null
                interVal = setInterval(function(){
                    _this.imgList.push({
                        name:imgList[count],
                        path:_this.baseImgDir + '/'+imgList[count]
                    })
                    count++
                    if(count>imgList.length-1){
                        clearInterval(interVal)
                    }
                },100)
//                this.imgList = imgList.map((img)=>{
//                    return {
//                        name:img,
//                        path:_this.baseImgDir + '/'+img
//                    }
//                })
            },
            createHidePreNextTimeout(){
                var _this = this
                clearTimeout(this.preNextTimer)

                this.preNextTimer = setTimeout(function(){
                    _this.showMobilePreNext = false
                },4500)

            },
            clickDialog(){
                if(this.isMobile){
                    this.showMobilePreNext = !this.showMobilePreNext
                    if(this.showMobilePreNext){
                        this.createHidePreNextTimeout()
                    }else{
                        this.preNextTimer&&clearTimeout(this.preNextTimer)
                    }
                }
            },
            pre(e){
                e.stopPropagation()
                this.curImgIndex --
                if(this.curImgIndex<0){
                    this.curImgIndex = 0
                    this.$message({
                        message: '已经是当前照片组的第一张了',
                        type: 'warning'
                    })
                    return false
                }
                this.initImgSize()
                this.bigImgPath = this.imgList[this.curImgIndex].path
                this.bigImgName = this.imgList[this.curImgIndex].name
                this.setContentHAndImgAutoSize()
                if(this.isMobile){
                    this.createHidePreNextTimeout()
                }

            },
            next(e){
                e.stopPropagation()
                this.curImgIndex ++
                if(this.curImgIndex>this.imgList.length-1){
                    this.curImgIndex = this.imgList.length-1
                    this.$message({
                        message: '已经是当前照片组最后一张了',
                        type: 'warning'
                    })
                    return false
                }
                this.initImgSize()
                this.bigImgPath = this.imgList[this.curImgIndex].path
                this.bigImgName = this.imgList[this.curImgIndex].name
                this.setContentHAndImgAutoSize()
                if(this.isMobile){
                    this.createHidePreNextTimeout()
                }
            },
            setContentHAndImgAutoSize(){
                var bigImgDom = document.getElementById('bigImgPath')
                var root = document.documentElement
                var rootH = root.clientHeight
                var rootW = root.clientWidth
                var dialogHeaderH = document.querySelector('.des-dialog-header').clientHeight
                var dialogContent = document.querySelector('.des-dialog-content')
                var contentH = rootH - dialogHeaderH
                dialogContent.style.height = contentH + 'px'
                var bigImgMaxW = rootW*0.95

                var img = new Image()
                img.src = this.bigImgPath
                img.onload = function(){
                    var colH = document.querySelector('.bor').offsetHeight
                    var colW = document.querySelector('.bor').offsetWidth

                    //原始高度或者宽度比响应式的item还要小那么宽高用item的宽高
                    if(colH>this.height){
                        bigImgDom.setAttribute('height',colH)
                        bigImgDom.setAttribute('width',colW)
                    }else{
                        var bigImgMaxH = this.height
                        //如果图片出现滚动条了要取消垂直居中因为部分会被切割掉，如果小于图片容器的宽度恢复成垂直居中
                        imgAutoSize(bigImgDom,bigImgMaxW,bigImgMaxH,function(w,h){
                            if(Number(h)>contentH){
                                dialogContent.style['align-items'] = 'inherit'
                            }else{
                                dialogContent.style['align-items'] = 'center'
                            }
                        })
                    }
                }
//                debugger
            },
            openImgDialog(e,idx){
                this.curImgIndex = idx
                this.bigImgPath = this.imgList[idx].path
                this.bigImgName = this.imgList[idx].name
                this.showDialog = true
                this.imgSizePre = 1
                console.log(e);
                var _this = this
                this.$nextTick(function(){
                    _this.setContentHAndImgAutoSize()
                })
            },
            closeDialog(e){
                e.preventDefault()
                this.showDialog = false
            }
        }
    }
</script>
