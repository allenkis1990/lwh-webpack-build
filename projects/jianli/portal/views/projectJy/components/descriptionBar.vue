<template>


    <div>
        <div class="container center">
            <p class="intros">{{des}}</p>
            <div class="col-md-3 col-xs-6 desBar-img-box" v-for="(item,index) in imgList">
                <div class="bor">
                    <img :src="item">
                </div>
            </div>
        </div>



        <div class="des-dialog" v-if="showDialog">
            <div class="mask"></div>
            <div class="des-dialog-content">
                <div class="des-dialog-header">
                    <span class="des-pic-ico"></span><span class="des-pictit">aaa.png</span>
                    <button class="des-close" @click="closeDialog"></button>
                </div>
            </div>
        </div>

    </div>
</template>
<style scoped>

    .desBar-box{}
    .desBar-img-box{cursor:pointer}
    .desBar-img-box .bor{border:1px solid #ddd;}
    .desBar-img-box img{width:100%;height:100%;}
    .intros{padding:0 15px;}
    .mask{width:100%;height:100%;background: #000;opacity:0.5;position:fixed;top:0;left:0}

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
    .des-dialog-content{width:100%;height:100%;position:fixed;left:0;top:0;z-index:99}
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
</style>
<script>
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
                imgList:[],
                showDialog:true
            }
        },
        mounted: function () {
            var imgList = this.imgs.split(',')
            this.imgList = imgList.map((img)=>{
                return '/demo/images/'+img
            })
        },

        methods: {
            closeDialog(e){
                e.preventDefault()
                this.showDialog = false
            }
        }
    }
</script>
