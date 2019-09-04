<template>
    <div class="face-detect">
        <!--<div id="res"style="width:100%;text-align:center;word-break: break-all;height:50px;overflow:auto"></div>-->
        <div style="width:455px;margin:10px auto 0px" v-if="!hasCam&&tipshow">
            <el-tag type="danger" closable @close="closeTip">
                当前未检测到摄像头，如果想要启用拍照模式，请安装摄像头或者使用移动设备打开此页面。
            </el-tag>
        </div>
        <div style="width:455px;margin:10px auto">
            <el-steps :active="active" finish-status="success">
                <el-step title="上传基准照"></el-step>
                <el-step title="上传对比照"></el-step>
                <el-step title="人脸识别结果"></el-step>
            </el-steps>
        </div>
        <div class="clear" style="width:455px;margin:0 auto">
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


                <div style="margin-top:10px;position:relative" v-show="!hasCam" class="chooseFile">
                    <input type="file"
                           id="uploadFile"
                           style="position:absolute;width:100px;height:30px;left:0;top:0;opacity:0" />
                    上传图片
                </div>


                <div style="margin-top:10px;"
                     @click="snap()"
                     v-show="hasCam"
                     class="snap">拍照</div>
                <div style="margin-top:10px;"
                     @click="resetCropper"
                     class="reSnap">重置</div>

                <el-button style="margin-top:10px;"
                           @click="next()"
                           type="primary">下一步</el-button>
            </div>
            <div style="float:left">
                <div class="preview-box1 preview-box"></div>
                <div class="preview-box2 preview-box"></div>
                <div class="preview-box3 preview-box"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import Webcam from 'webcamjs'
    import Cropper from 'cropperjs'
    import {  Step,Steps,Button,Tag  } from 'element-ui'
    export default {
        data(){
            return {
                tipshow:true,
                hasCam:true,
                active:0,
                tempUri:'',
                basePhoto:'',//基准照
                curPhoto:'',//对比照
                defaultConfig:{
                    swfURL: require('@portal/images/webcam.swf')
                },
                cropperConfig:{
                    responsive: true,
                    aspectRatio: 4 / 3,
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
            this.init()
        },
        methods: {
            closeTip(){
                this.tipshow = false
            },
            init(){
                Webcam.set(this.defaultConfig);
                Webcam.attach( '#my_camera' );
                this.bindEvents()
                console.log(Webcam);
            },
            bindEvents() {
                var _this = this
                this.$nextTick(function () {
                    document.getElementById('uploadFile').addEventListener('change', function (e) {
                        var file = e.target.files[0]
                        var reader = new FileReader()
                        reader.addEventListener('load', function (eee) {
                            document.getElementById('my_camera').style.display = 'none'
                            document.getElementById('my_result').style.display = 'block'
                            _this.tempUri = eee.target.result
                            if (_this.hasCropper == false) {
                                _this.img.setAttribute('src', eee.target.result);
//                                    document.getElementById('res').innerHTML = eee.target.result
                                _this.cropper = new Cropper(_this.img, _this.cropperConfig)
                                _this.hasCropper = true;
                            } else {
                                _this.cropper.replace(eee.target.result);
                            }
                        })
                        reader.readAsDataURL(file)
                    })
                })

                Webcam.on('error',function(e){
                    console.log('没有可用的摄像头');
                    _this.hasCam = false
                })
            },
            snap(){
                var _this=this;
                Webcam.snap( function(data_uri) {
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
                } );
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
                    this.getCropperedImgUriAndNext(this.basePhoto)
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
                    this.getCropperedImgUriAndNext(this.curPhoto)
                }
            },
            getCropperedImgUriAndNext(photo){
                var _this = this
                var cropperImg = this.cropper.getCroppedCanvas()
                var cropperUri = cropperImg.toDataURL();
                photo = cropperUri
//                    this.curPhoto = this.tempUri
                setTimeout(function(){
                    _this.active ++
                    _this.resetCropper()
                },100)
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
                this.cropper.destroy()
                this.hasCropper = false
            }
        }
    }
</script>

<style scoped>
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

