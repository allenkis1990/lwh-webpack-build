<template>
    <div class="face-detect">
        <!--<div id="res"style="width:100%;text-align:center;word-break: break-all;height:50px;overflow:auto"></div>-->
        <div style="width:455px;margin:10px auto 0px" v-if="tipshow">
            <el-tag type="danger" closable @close="closeTip">
                如果当前设备支持摄像头可选择拍照模式。
            </el-tag>
        </div>
        <div style="width:455px;margin:0 auto;" v-show="!defectMode">
            <p style="margin-top:10px;">请选择人脸识别模式：</p>
            <div>
                <el-button style="margin-top:10px;"
                           @click="selectMode(1)"
                           type="primary">图片模式</el-button>
            </div>
            <div>
                <el-button style="margin-top:10px;"
                           @click="selectMode(2)"
                           type="primary">拍照模式</el-button>
            </div>
        </div>

        <div v-show="defectMode">
            <div style="width:455px;margin:10px auto">
                <el-steps :active="active" finish-status="success">
                    <el-step title="上传基准照"></el-step>
                    <el-step title="上传对比照"></el-step>
                    <el-step title="确认提交"></el-step>
                </el-steps>
            </div>
            <div class="clear" style="width:455px;margin:0 auto" v-show="active<2">
                <div class="lwh-container" style="float:left">
                    <div class="main" id="my_camera">
                    </div>
                    <div class="main" id="my_result" style="display:none;">
                        <img src="@portal/images/user_image_container.png" />
                    </div>
                    <!--<div class="progress-box" v-show="hasCam">
                        <div class="progress-txt">上传进度<span>0</span>%</div>
                        <div class="progress"></div>
                    </div>-->


                    <div style="margin-top:10px;position:relative" v-show="defectMode===1" class="chooseFile">
                        <input type="file"
                               id="uploadFile"
                               style="position:absolute;width:100px;height:30px;left:0;top:0;opacity:0" />
                        上传图片
                    </div>


                    <div style="margin-top:10px;"
                         @click="snap()"
                         v-show="defectMode===2"
                         class="snap">拍照</div>
                    <div style="margin-top:10px;"
                         @click="resetCropper"
                         class="reSnap">重置</div>

                    <el-button style="margin-top:10px;"
                               @click="next()"
                               type="primary">下一步</el-button>
                    <el-button style="margin-top:10px;"
                               @click="restart()"
                               type="primary">重新开始</el-button>
                </div>
                <div style="float:left">
                    <div class="preview-box1 preview-box"></div>
                    <div class="preview-box2 preview-box"></div>
                    <div class="preview-box3 preview-box"></div>
                </div>
            </div>

            <div style="width:455px;margin:0 auto;text-align:center"
                 v-show="active===2">
                <div style="display:flex;justify-content: space-around">
                    <div class="resultImgBox">
                        <p>基准照</p>
                        <img :src="basePhoto"
                             @click="openImgWin('basePhoto',$event)"
                             alt="">
                    </div>
                    <div class="resultImgBox">
                        <p>对比照</p>
                        <img :src="curPhoto"
                             @click="openImgWin('curPhoto',$event)"
                             alt="">
                    </div>
                </div>
                <el-button style="margin-top:10px;"
                           @click="submit()"
                           type="primary">提交</el-button>
                <el-button style="margin-top:10px;"
                           @click="restart()"
                           type="primary">重新开始</el-button>
            </div>


            <div style="width:455px;margin:0 auto;text-align:center"
                 v-show="active===3">
                <div style="display:flex;justify-content: space-around">
                    <div class="resultImgBox">
                        <p>基准照</p>
                        <img :src="basePhoto"
                             @click="openImgWin('basePhoto',$event)"
                             alt="">
                    </div>
                    <div class="resultImgBox">
                        <p>对比照</p>
                        <img :src="curPhoto"
                             @click="openImgWin('curPhoto',$event)"
                             alt="">
                    </div>
                </div>
                <div style="color:green;">
                    <p style="text-align:center">人脸识别结果：成功</p>
                    <p style="text-align:center">相似度：{{result.score}}%</p>
                </div>
                <el-button style="margin-top:10px;"
                           @click="restart()"
                           type="primary">重新开始</el-button>
            </div>
        </div>



        <div v-show="showImgDia">
            <button class="dia-close" @click="showImgDia=false"></button>
            <div class="face-detect-mask"></div>
            <img class="face-detect-img"
                 :style="dialogImgStyle"
                 :src="dialogImg" alt="">
        </div>
    </div>
</template>

<script>
    import Webcam from 'webcamjs'
    import Cropper from 'cropperjs'
    import {  Step,Steps,Button,Tag  } from 'element-ui'
    import {isMobile} from '@portal/utils/lwh-utils'
    export default {
        data(){
            return {
                firstLoadCam:false,
                defectMode:'',//1图片模式 2拍照模式
                result:{},
                faceToken:'',
                showImgDia:false,
                dialogImg:'',
                dialogImgStyle:{
                    'margin-left':'',
                    'margin-top':''
                },
                loading:null,
                tipshow:true,
                hasCam:true,
                active:0,
                tempUri:'',
                basePhoto:'',//基准照
                curPhoto:'',//对比照
                defaultConfig:{},
                cropperConfig:{
                    responsive: true,
                    aspectRatio: 10 / 12.5,
                    resizable: true,
                    movable: true,
                    dragCrop: true,
                    preview: '.preview-box',
                    zoomable: false,//放大缩小图片
                    crop: function (data) {
//                        console.log(data);
//                        var $imgData = that.img.cropper('getCroppedCanvas')
//                        var dataurl = $imgData.toDataURL();
//                        console.log(dataurl, '裁剪后的图片');
//                        console.log($imgData, '裁剪后的图片');
                    }
                },
                hasCropper:false,
                img:null,
                cropper:null
            }
        },
        components:{
            elStep:Step,
            elSteps:Steps,
            elButton:Button,
            elTag:Tag
        },
        mounted() {
            this.img = document.querySelector('#my_result img')
//            this.init()
        },
        methods: {
            selectMode(mode){
                var _this = this
                this.defectMode = mode
                this.$nextTick(function(){
                    if(!_this.firstLoadCam){
                        _this.init()
                    }
                })
            },
            //缩放方法：先把宽高按比例缩放，然后转成canvas然后通过canvas转成base64
            suofang(base64, bili, callback) {
                var _this = this
                console.log("执行缩放程序,bili=" + bili);
                //处理缩放，转格式
                var _img = new Image();
                _img.src = base64;
                _img.onload = function() {
                    var _canvas = document.createElement("canvas");
                    var w = this.width / bili;
                    var h = this.height / bili;
                    _canvas.setAttribute("width", w);
                    _canvas.setAttribute("height", h);
                    _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
                    var base64 = _canvas.toDataURL("image/jpeg");
                    _canvas.toBlob(function(blob) {
                        console.log(blob.size);

                        if(blob.size > 1024*1024){
                            _this.suofang(base64, bili, callback);
                        }else{
                            callback(blob, base64);
                        }
                    }, "image/jpeg");
                }
            },
            openImgWin(url,e){
                var ele = e.target
                console.log(e);
                this.dialogImgStyle['margin-left'] = '-'+parseInt(ele.naturalWidth/2)+'px'
                this.dialogImgStyle['margin-top'] = '-'+parseInt(ele.naturalHeight/2)+'px'
                this.showImgDia = true
                this.dialogImg = this[url]
            },
            getComPressBase64(base641,base642){
                var _this = this
                var p1 = new Promise(function(resolve,reject){
                    _this.suofang(base641,1.5,function(b,base64){
                        resolve(base64)
                    })
                })
                var p2 = new Promise(function(resolve,reject){
                    _this.suofang(base642,1.5,function(b,base64){
                        resolve(base64)
                    })
                })
                return Promise.all([p1,p2])
            },
            submit(){
                var _this = this
                console.log(_this.baseFile,111);
                console.log(_this.curFile,222);
                this.loading = this.$loading.service({
                    text:'人脸识别中~~~~~'
                })
//                setTimeout(function(){
//                    _this.loading&&_this.loading.close()
//                    _this.active ++
//                },3000)
                var base64StartReg = /^data:image\/(png|jpg|jpeg|gif);base64,/img
                this.getComPressBase64(this.basePhoto,this.curPhoto).then(function(data){
                    console.log(data,'121sss');
                    var basePhoto = data[0].replace(base64StartReg,'')
                    var curPhoto = data[1].replace(base64StartReg,'')
                    _this.$http.post('/actions/faceMatch',{
                        basePhoto:basePhoto,
                        curPhoto:curPhoto
                    }).then(function(data){
                        _this.loading&&_this.loading.close()
                        var res = data.data
                        if(res.code==='200'){
                            _this.active ++
                            _this.result = res.info.result
                            _this.result.score = parseInt(_this.result.score)

                        }else{
                            _this.$message({
                                message: res.message,
                                type: 'warning'
                            })
                        }
                        console.log(res);
                    })
                })
            },
            getDefaultConfig(){
                var _this = this
                return {
                    swfURL: require('@portal/images/webcam.swf'),
                    iosPlaceholderText:'点击此处可拍照',
                    //点击默认的拍照框
                    user_callback(data_uri){
                        _this.snapCb(data_uri)
                    }
                }
            },
            closeTip(){
                this.tipshow = false
            },
            init(){
                this.defaultConfig = this.getDefaultConfig()
                Webcam.set(this.defaultConfig);
                Webcam.attach( '#my_camera' );
                this.bindEvents()
                this.hasCam = Webcam.loaded
//                if(isMobile()){
//                    this.hasCam = true
//                }else{
//                    if(Webcam.userMedia){
//                        this.hasCam = true
//                    }else{
//                        this.hasCam = false
//                    }
//                }
                this.firstLoadCam = true
                console.log(Webcam);
            },
            beforeFileUploadCheck(file,fileDom){
                var _this = this
                if(!/(png|jpg|jpeg)/.test(file.type)){
                    _this.$message({
                        message: '请上传jpg,png格式的图片',
                        type: 'warning'
                    })
                    fileDom.value = ''
                    return false
                }
                if(file.size>1024*1024){
                    _this.$message({
                        message: '请上传小于1M的图片',
                        type: 'warning'
                    })
                    fileDom.value = ''
                    return false
                }
                return true
            },
            bindEvents() {
                var _this = this
                this.$nextTick(function () {
                    document.getElementById('uploadFile').addEventListener('change', function (e) {
                        _this.file = e.target.files[0]
                        var bol = _this.beforeFileUploadCheck(_this.file,this)
                        if(bol){
                            var reader = new FileReader()
                            reader.addEventListener('load', function (eee) {
                                _this.snapCb(eee.target.result)
                            })
                            reader.readAsDataURL(_this.file)
                        }
                    })
                })

                Webcam.on('error',function(e){
                    _this.$message({
                        message: '没有可用的摄像头',
                        type: 'warning'
                    })
                    console.log('没有可用的摄像头');
                })

            },
            snap(){
                var _this=this;
                Webcam.snap( function(data_uri) {
                    _this.snapCb(data_uri)
                } );
            },
            snapCb(data_uri){
                var _this = this
                document.getElementById('my_camera').style.display = 'none'
                document.getElementById('my_result').style.display = 'block'
                _this.tempUri = data_uri
                if(_this.hasCropper==false){
                    _this.img.setAttribute('src',data_uri);
//                            document.getElementById('res').innerHTML = data_uri
                    _this.cropper = new Cropper(_this.img,_this.cropperConfig)
                    _this.hasCropper=true;
                }else{
                    _this.cropper.replace(data_uri);
                }
            },
            next(){
                if(this.active===0){
                    this.step1()
                }
                if(this.active===1){
                    this.step2()
                }
//                this.active ++
            },
            step1(){
                var _this = this
                if(!this.tempUri){
                    this.$message({
                        message: '请上传人脸识别基准照',
                        type: 'warning'
                    })
                    return false
                }else{
                    this.basePhoto =  this.getCropperedImgUriAndNext()
                    this.baseFile = _this.file
                }
            },
            step2(){
                var _this = this
                if(!this.tempUri){
                    this.$message({
                        message: '请上传人脸识别对比照',
                        type: 'warning'
                    })
                    return false
                }else{
                    this.curPhoto = this.getCropperedImgUriAndNext()
                    this.curFile = _this.file
                }
            },
            getCropperedImgUriAndNext(photo){
                var _this = this
                var cropperImg = this.cropper.getCroppedCanvas()
                var cropperUri = cropperImg.toDataURL();
//                console.log(cropperUri);
//                photo = cropperUri
//                    this.curPhoto = this.tempUri
                setTimeout(function(){
                    _this.active ++
                    _this.resetCropper()
                },100)
                return cropperUri
            },
            restart(){
                this.defectMode = ''
                this.active = 0
                this.basePhoto = ''
                this.curPhoto = ''
                this.resetCropper()
            },
            resetCropper(){
                this.tempUri = ''
                document.getElementById('my_camera').style.display = 'block'
                document.getElementById('my_result').style.display = 'none'
                document.querySelectorAll('.preview-box').forEach(function(item){
                    item.innerHTML = ''
                })
                document.querySelectorAll('.box').forEach(function(item){
                    item.innerHTML = ''
                })
                var files = document.getElementById('uploadFile')
                files.value=''

                //销毁一下 防止JS报错
                this.cropper&&this.cropper.destroy()
                this.hasCropper = false
            }
        }
    }
</script>

<style scoped>
    .dia-close{
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+MTYvaTAwMjdfY2xvc2UtZGlhbG9nPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48cGF0aCBkPSJNOS42NCA4bDQuMDE2IDQuMDE2Yy4yMy4yMy4zNDQuNTAyLjM0NC44MiAwIC4zMTgtLjExNS41OS0uMzQ0LjgyLS4yMy4yMy0uNTAyLjM0NC0uODIuMzQ0LS4zMTggMC0uNTktLjExNS0uODItLjM0NEw4IDkuNjRsLTQuMDE2IDQuMDE2Yy0uMjMuMjMtLjUwMi4zNDQtLjgyLjM0NC0uMzE4IDAtLjU5LS4xMTUtLjgyLS4zNDQtLjIzLS4yMy0uMzQ0LS41MDItLjM0NC0uODIgMC0uMzE4LjExNS0uNTkuMzQ0LS44Mkw2LjM2IDggMi4zNzQgNC4wMTZjLS4yMy0uMjMtLjM0NC0uNTAzLS4zNDQtLjgyIDAtLjMxOC4xMTYtLjU4Ny4zNDUtLjgwNS4yMy0uMjMuNTAzLS4zNC44Mi0uMzQuMzE4IDAgLjU5LjExMy44Mi4zNDNMOCA2LjM3Nmw0LjAzLTQuMDNjLjIzLS4yMy41MDQtLjM0NS44MjItLjM0NS4zMTcgMCAuNTkuMTE3LjgyLjM0Ni4yMi4yMy4zMjguNTAyLjMyOC44MiAwIC4zMTgtLjExLjU4Ni0uMzI4LjgwNUw5LjY0MiA4eiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+");
        width:40px;
        height:40px;
        background-repeat:no-repeat;
        background-position: center center;
        background-color: transparent;
        text-align: center;
        outline:none;
        border:none;
        position:fixed;
        right:5px;
        top:5px;
        z-index:1001;
    }
    .dia-close:hover{background-color:#ccc }
    .face-detect-img{position:fixed;z-index:1000;left:50%;top:50%;}
    .face-detect-mask{width:100%;height:100%;background:#000;opacity:0.7;position:fixed;top:0;left:0;z-index:999}
    .resultImgBox{width:150px;text-align:center;}
    .resultImgBox p {text-align:center}
    .resultImgBox img{
        width:100%;height:187.5px;
    }
    #my_camera {
        background-image: url('~@portal/images/user_image_container.png');
        background-repeat:no-repeat;
        background-size: cover;
        background-position: center center;
    }
    .face-detect,.face-detect *{box-sizing:border-box}
    .clear{clear:both;_zoom:1;}
    .clear:after,.clear:before{display:block; content:"clear"; height:0; clear:both; overflow:hidden; visibility:hidden;}
    .lwh-container{width:300px; margin:0px auto;}
    .main{width:300px; height:300px;border:1px dashed #ddd;}
    .main img{width:300px;height:300px;}
    .preview-box{margin-bottom:5px;margin-left:5px;}
    .preview-box:last-child{margin-bottom:0px;}
    .preview-box1{width:50px; height:50px;overflow:hidden;}
    .preview-box2{width:100px; height:100px;overflow:hidden;}
    .preview-box3{width:150px; height:150px;overflow:hidden;}
    .box1 img,.box2 img,.box3 img{width:100%;height:100%;}

    .progress-box{line-height:30px; margin:10px 0px;width:100%;height:30px;position:relative;border:1px solid #ddd;}
    .progress-box .progress{
        height:100%;position:absolute;left:0;top:0;background:deepskyblue;
    }
    .progress-txt{display:inline-block;position:absolute;left:35%;z-index:999;}
    .progress-box span{}
    .hide{display:none;}
    .show{display:block;}

    .snap{width:100px;height:30px;line-height:30px;text-align:center;color:#fff;background:red;cursor:pointer;}
    .reSnap{width:100px;height:30px;line-height:30px;text-align:center;color:#fff;background:red;cursor:pointer;}
    .chooseFile{width:100px;height:30px;line-height:30px;text-align:center;color:#fff;background:red;cursor:pointer;}
</style>

<style>
    .cropper-container {
        font-size: 0;
        line-height: 0;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        direction: ltr;
        -ms-touch-action: none;
        touch-action: none
    }

    .cropper-container img {
        /* Avoid margin top issue (Occur only when margin-top <= -height) */
        display: block;
        min-width: 0 !important;
        max-width: none !important;
        min-height: 0 !important;
        max-height: none !important;
        width: 100%;
        height: 100%;
        image-orientation: 0deg
    }
    .cropper-wrap-box,
    .cropper-canvas,
    .cropper-drag-box,
    .cropper-crop-box,
    .cropper-modal {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .cropper-wrap-box {
        overflow: hidden;
    }
    .cropper-drag-box {
        opacity: 0;
        background-color: #fff;
    }
    .cropper-modal {
        opacity: .5;
        background-color: #000;
    }
    .cropper-view-box {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 100%;
        outline: 1px solid #39f;
        outline-color: rgba(51, 153, 255, 0.75);
    }

    .cropper-dashed {
        position: absolute;
        display: block;
        opacity: .5;
        border: 0 dashed #eee
    }
    .cropper-dashed.dashed-h {
        top: 33.33333%;
        left: 0;
        width: 100%;
        height: 33.33333%;
        border-top-width: 1px;
        border-bottom-width: 1px
    }
    .cropper-dashed.dashed-v {
        top: 0;
        left: 33.33333%;
        width: 33.33333%;
        height: 100%;
        border-right-width: 1px;
        border-left-width: 1px
    }
    .cropper-center {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 0;
        height: 0;
        opacity: .75
    }
    .cropper-center:before,
    .cropper-center:after {
        position: absolute;
        display: block;
        content: ' ';
        background-color: #eee
    }
    .cropper-center:before {
        top: 0;
        left: -3px;
        width: 7px;
        height: 1px
    }
    .cropper-center:after {
        top: -3px;
        left: 0;
        width: 1px;
        height: 7px
    }
    .cropper-face,
    .cropper-line,
    .cropper-point {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        opacity: .1;
    }
    .cropper-face {
        top: 0;
        left: 0;
        background-color: #fff;
    }
    .cropper-line {
        background-color: #39f
    }
    .cropper-line.line-e {
        top: 0;
        right: -3px;
        width: 5px;
        cursor: e-resize
    }
    .cropper-line.line-n {
        top: -3px;
        left: 0;
        height: 5px;
        cursor: n-resize
    }
    .cropper-line.line-w {
        top: 0;
        left: -3px;
        width: 5px;
        cursor: w-resize
    }
    .cropper-line.line-s {
        bottom: -3px;
        left: 0;
        height: 5px;
        cursor: s-resize
    }
    .cropper-point {
        width: 5px;
        height: 5px;

        opacity: .75;
        background-color: #39f
    }
    .cropper-point.point-e {
        top: 50%;
        right: -3px;
        margin-top: -3px;
        cursor: e-resize
    }
    .cropper-point.point-n {
        top: -3px;
        left: 50%;
        margin-left: -3px;
        cursor: n-resize
    }
    .cropper-point.point-w {
        top: 50%;
        left: -3px;
        margin-top: -3px;
        cursor: w-resize
    }
    .cropper-point.point-s {
        bottom: -3px;
        left: 50%;
        margin-left: -3px;
        cursor: s-resize
    }
    .cropper-point.point-ne {
        top: -3px;
        right: -3px;
        cursor: ne-resize
    }
    .cropper-point.point-nw {
        top: -3px;
        left: -3px;
        cursor: nw-resize
    }
    .cropper-point.point-sw {
        bottom: -3px;
        left: -3px;
        cursor: sw-resize
    }
    .cropper-point.point-se {
        right: -3px;
        bottom: -3px;
        width: 20px;
        height: 20px;
        cursor: se-resize;
        opacity: 1
    }
    @media (min-width: 768px) {
        .cropper-point.point-se {
            width: 15px;
            height: 15px
        }
    }
    @media (min-width: 992px) {
        .cropper-point.point-se {
            width: 10px;
            height: 10px
        }
    }
    @media (min-width: 1200px) {
        .cropper-point.point-se {
            width: 5px;
            height: 5px;
            opacity: .75
        }
    }
    .cropper-point.point-se:before {
        position: absolute;
        right: -50%;
        bottom: -50%;
        display: block;
        width: 200%;
        height: 200%;
        content: ' ';
        opacity: 0;
        background-color: #39f
    }
    .cropper-invisible {
        opacity: 0;
    }
    .cropper-bg {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
    }
    .cropper-hide {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
    }
    .cropper-hidden {
        display: none !important;
    }
    .cropper-move {
        cursor: move;
    }
    .cropper-crop {
        cursor: crosshair;
    }
    .cropper-disabled .cropper-drag-box,
    .cropper-disabled .cropper-face,
    .cropper-disabled .cropper-line,
    .cropper-disabled .cropper-point {
        cursor: not-allowed;
    }
</style>

