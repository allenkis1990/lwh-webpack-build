<template>


    <div>
        <div class="container center">
            <p class="intros">{{des}}</p>
            <div class="col-md-3 col-xs-6 desBar-img-box"
                 @click="openImgDialog($event,index)"
                 v-for="(item,index) in imgList">
                <div class="bor">
                    <img :src="item.path">
                </div>
            </div>
        </div>



        <div class="des-dialog" v-if="showDialog" @click="clickDialog">
            <div class="mask"></div>
            <div class="des-dialog-main">
                <div class="des-dialog-header">
                    <span class="des-pic-ico"></span><span class="des-pictit">{{bigImgName}}</span>
                    <button class="des-close" @click="closeDialog"></button>
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
    .intros{padding:0 15px;animation:fadeIn_left 1.5s;}
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
    .des-dialog-header{background:#000;height:40px;width:100%;line-height:40px;}
    .des-dialog-main{width:100%;height:100%;position:fixed;left:0;top:0;z-index:99;}
    .des-dialog-content {
        overflow: auto;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .des-close:hover{background-color:#ccc }
    .des-close{
        float: right;
        width:40px;
        height:40px;
        background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+MTYvaTAwMjdfY2xvc2UtZGlhbG9nPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48cGF0aCBkPSJNOS42NCA4bDQuMDE2IDQuMDE2Yy4yMy4yMy4zNDQuNTAyLjM0NC44MiAwIC4zMTgtLjExNS41OS0uMzQ0LjgyLS4yMy4yMy0uNTAyLjM0NC0uODIuMzQ0LS4zMTggMC0uNTktLjExNS0uODItLjM0NEw4IDkuNjRsLTQuMDE2IDQuMDE2Yy0uMjMuMjMtLjUwMi4zNDQtLjgyLjM0NC0uMzE4IDAtLjU5LS4xMTUtLjgyLS4zNDQtLjIzLS4yMy0uMzQ0LS41MDItLjM0NC0uODIgMC0uMzE4LjExNS0uNTkuMzQ0LS44Mkw2LjM2IDggMi4zNzQgNC4wMTZjLS4yMy0uMjMtLjM0NC0uNTAzLS4zNDQtLjgyIDAtLjMxOC4xMTYtLjU4Ny4zNDUtLjgwNS4yMy0uMjMuNTAzLS4zNC44Mi0uMzQuMzE4IDAgLjU5LjExMy44Mi4zNDNMOCA2LjM3Nmw0LjAzLTQuMDNjLjIzLS4yMy41MDQtLjM0NS44MjItLjM0NS4zMTcgMCAuNTkuMTE3LjgyLjM0Ni4yMi4yMy4zMjguNTAyLjMyOC44MiAwIC4zMTgtLjExLjU4Ni0uMzI4LjgwNUw5LjY0MiA4eiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+");
        background-repeat:no-repeat;
        background-position: center center;
        text-align: center;
        outline:none;
        border:none;
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
                a:null,
                b:null
            }
        },
        mounted: function () {
            this.getImgList()
            window.addEventListener('resize',()=>{
                if(this.showDialog&&this.imgList.length){
                this.setContentHAndImgAutoSize()
                }
            })
        },

        methods: {
            getImgList(){
                console.log(11111);
                var imgList = this.imgs.split(',')
                var _this = this
                var count = 0
                var interVal = null
                interVal = setInterval(function(){
                    _this.imgList.push({
                        name:imgList[count],
                        path:'/demo/images/'+imgList[count]
                    })
                    count++
                    if(count>imgList.length-1){
                        clearInterval(interVal)
                    }
                },100)
                imgList.forEach(function(img,index){

                })
//            this.imgList = imgList.map((img)=>{
//                return {
//                    name:img,
//                    path:'/demo/images/'+img
//                }
//            })
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
                        imgAutoSize(bigImgDom,bigImgMaxW,bigImgMaxH)
                    }
                }
//                debugger
            },
            openImgDialog(e,idx){
                this.curImgIndex = idx
                this.bigImgPath = this.imgList[idx].path
                this.bigImgName = this.imgList[idx].name
                this.showDialog = true
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
