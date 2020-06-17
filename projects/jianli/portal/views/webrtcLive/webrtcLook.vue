<template>
    <div class="webrtc-box">
        <div>
            <div>
                <video src=""
                       id="remoteVideo"
                       width="400"
                       controls
                       autoplay></video>
            </div>
            <div class="before">
                <div style="width: 250px;margin-bottom: 10px">
                    昵称：<el-input type="text" v-model="nickName"></el-input>
                </div>

                <el-button type="primary"
                           :disabled="!io"
                           @click="enterRoom">连接直播间
                </el-button>
            </div>
            <div class="after" style="display: none">主播正在直播中！！</div>
        </div>
    </div>
</template>
<script>
    import {Button,Input} from 'element-ui'
    var socket = null
    var pc = null
    var localStream = null
    export default {
        data() {
            return {
                roomNum: '921',
                anchor: 'allen',
                localStream: null,
                io: null,
                nickName:''
            }
        },
        components: {
            elButton: Button,
            elInput: Input
        },
        mounted() {
            if (window.io) {
                this.io = io
//                this.connect()
            } else {
                window.onload = () => {
                    this.io = io
//                    this.connect()
                }
            }
        },
        methods: {
            enterRoom(){
                if(!this.nickName){
                    alert('请输入昵称后进入房间')
                    return
                }
                this.connect('fuck')
            },
            createPc() {
                if (!pc) {
                    let pcConfig = {
                        icServers: [
                            {
                                urls: 'turn:112.74.31.13:3478',
                                credentialType:'password',
                                credential: 'she221943',
                                username: 'allen1990'
                            }
                        ]
                    }
                    pc = new RTCPeerConnection(pcConfig)

                    pc.onicecandidate = (e) => {
                        console.log(e);
//                        debugger
                        if(e.candidate){
                            socket.emit('sendToSomeOne', {
                                roomNum: this.roomNum,
                                nickName: this.nickName,
                                data: {
                                    type:'candidate',
                                    label:e.candidate.sdpMLineIndex,
                                    id:e.candidate.sdpMid,
                                    candidate:e.candidate.candidate
                                }
                            })
                        }
                    }


                    pc.ontrack = (e) => {
                        debugger
                        let remoteVideo = document.querySelector('#remoteVideo')
                        remoteVideo.srcObject = e.streams[0]
                    }

                }
            },
            connect() {
                socket = io.connect('http://193.168.70.87:8081');
                socket.emit('join', {
                    roomNum: this.roomNum,
                    nickName: this.nickName
                })


                socket.on('full',(data)=>{
                    alert('直播间最多容纳'+data+'人')
                })


                socket.on('joined', (obj) => {
                    console.log('欢迎' + obj.nickName + '进入房间' + obj.roomNum)
                    console.log(obj);
                    let before = document.querySelector('.before')
                    before.style.display = 'none'
                    this.createPc()
                })

                socket.on('otherJoined', (obj) => {
                    if(obj.isAnchor){
                        console.log(`欢迎 ${obj.isAnchor?'【主播】':''}${obj.nickName}进入房间${obj.roomNum}`)
                        let after = document.querySelector('.after')
                        after.style.display = 'block'
                        before.style.display = 'none'
                    }else{
                        console.log(`其他用户${obj.nickName}加入`)
                    }
//                    console.log(obj);
                })

                socket.on('hasExist', () => {
                    alert('用户已存在直播间，请勿重复进入')
                })


                socket.on('leave',(obj)=>{
                    console.log(`${obj.nickName}已经离开直播间`,obj);
                })

                socket.on('otherLeaved',(obj)=>{
                    console.log(`${obj.isAnchor?'【主播】':''}${obj.nickName}已经离开直播间`,obj);
                    if(obj.isAnchor){
                        let remoteVideo = document.querySelector('#remoteVideo')
                        remoteVideo.srcObject = null
                        remoteVideo.src = ''
                        let after = document.querySelector('.after')
                        after.textContent = '主播已经离开！！'
                    }
                })


                socket.on('sendToEveryOne', (obj) => {
                    let data = obj.data
                    if(obj.nickName===this.nickName && obj.roomNum === this.roomNum){
                        //看直播的人只会收到offer来发送answer
                        if (data.type === 'offer') {
//                            debugger
                            pc.setRemoteDescription(new RTCSessionDescription(data))
                            pc.createAnswer().then((des) => {
//                                debugger
                                pc.setLocalDescription(des)
                                socket.emit('sendToSomeOne', {
                                    roomNum: this.roomNum,
                                    nickName: this.nickName,
                                    data: des
                                })
                            })
                        }else if (data.type === 'candidate') {//开直播和看直播的人都会收到candidate
//                            debugger
                            let candidate = new RTCIceCandidate({
                                sdpMLineIndex: data.label,
                                candidate: data.candidate
                            })
                            if(candidate){
                                pc.addIceCandidate(candidate)
                            }
                        } else {
//                        alert('err')
                            alert(data.type)
                        }



                    }
                })


            }
        }
    }
</script>

<style scoped lang="less">
    .webrtc-box {
        min-height: 800px;
    }
</style>

