<template>
    <div class="webrtc-box">
        <div>
            <video src=""
                   id="originVideo"
                   width="400"
                   controls
                   autoplay></video>
            <div>
                <el-button type="primary"
                           :disabled="!io"
                           @click="start">开播
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {Button} from 'element-ui'
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
                nickName:'allen',
                roomInfos:[],
                pcList:[]
            }
        },
        components: {
            elButton: Button
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
            fn(){
                this.connect('fuck')
            },
            start() {
                let con = {
                    audio: false,
                    video: true//没有video设备的话会报错
                }
                let originVideo = document.querySelector('#originVideo')
                navigator.mediaDevices.getUserMedia(con).then((stream) => {
                    originVideo.srcObject = stream
                    localStream = stream
                    this.connect(this.anchor)
                })

//                this.call()
            },
            createPc() {
//                console.log(this.roomInfos,888888);

//                return


                for(let i = 0;i<this.roomInfos.length;i++){
//                        this.pcList
                    let item = this.roomInfos[i]

                    if(item.nickName!==this.nickName && item.roomNum===this.roomNum){
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
                        let pc = new RTCPeerConnection(pcConfig)
                        this.pcList.push({
                            nickName:item.nickName,
                            roomNum:item.roomNum,
                            pc:pc
                        })
                    }
                }

                for(let i = 0;i<this.pcList.length;i++){
                    let item = this.pcList[i]
                    item.pc.onicecandidate = (e) => {
//                        debugger
//                        console.log(e);
                        if(e.candidate){
                            socket.emit('sendToEveryOne', {
                                roomNum: item.roomNum,
                                nickName: item.nickName,
                                data: {
                                    type:'candidate',
                                    label:e.candidate.sdpMLineIndex,
                                    id:e.candidate.sdpMid,
                                    candidate:e.candidate.candidate
                                }
                            })
                        }
                    }


                    if (localStream) {
                        localStream.getTracks().forEach((track) => {
//                            debugger
                            item.pc.addTrack(track, localStream);
                        })
                    }



                    let offerOptions = {
                        offerToRecieveAudio: 0,
                        offerToRecieveVideo: 1
                    }
                    item.pc.createOffer(offerOptions).then((des) => {
//                        debugger
                        item.pc.setLocalDescription(des)
                        socket.emit('sendToEveryOne', {
                            roomNum: item.roomNum,
                            nickName: item.nickName,
                            data: des
                        })
                    }).catch((e) => {
                        alert('offerErr')
                    })


                }




                /*if (!pc) {
                    pc = new RTCPeerConnection(pcConfig)

                    pc.onicecandidate = (e) => {
                        debugger
                        console.log(e);
                        if(e.candidate){
                            socket.emit('sendToEveryOne', {
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


                    if (localStream) {
                        localStream.getTracks().forEach((track) => {
                            debugger
                            pc.addTrack(track, localStream);
                        })
                    }

                    let offerOptions = {
                        offerToRecieveAudio: 0,
                        offerToRecieveVideo: 1
                    }
                    pc.createOffer(offerOptions).then((des) => {
                        debugger
                        pc.setLocalDescription(des)
                        socket.emit('sendToEveryOne', {
                            roomNum: this.roomNum,
                            nickName: this.nickName,
                            data: des
                        })
                    }).catch((e) => {
                        alert('offerErr')
                    })
                }*/
            },
            connect(user) {
                socket = io.connect('http://193.168.70.87:8081');
                socket.emit('join', {
                    roomNum: this.roomNum,
                    nickName: this.nickName,
                    isAnchor:true
                })

                socket.on('joined', (obj) => {
                    console.log(`欢迎 ${obj.isAnchor?'【主播】':''}${obj.nickName}进入房间${obj.roomNum}`)
                    this.roomInfos = obj.roomInfos
//                    console.log(obj)
                    this.createPc()
                })

                socket.on('otherJoined', (obj) => {
                    console.log(`其他用户${obj.nickName}加入`)
                    this.roomInfos = obj.roomInfos
//                    console.log(obj)
                })


                socket.on('leave',(obj)=>{
                    console.log(`${obj.nickName}已经离开直播间`,obj);
                    this.roomInfos = obj.roomInfos
                })

                socket.on('otherLeaved',(obj)=>{
                    console.log(`${obj.nickName}已经离开直播间`,obj);
                    this.roomInfos = obj.roomInfos
                })



                socket.on('hasExist', () => {
                    alert('用户已存在直播间，请勿重复进入')
                })


                socket.on('sendToSomeOne', (obj) => {
                    let data = obj.data
                    let item = this.pcList.find((it)=>{
                        return it.nickName === obj.nickName && it.roomNum === this.roomNum
                    })
                    //开直播的人，只会收到answer
                    if (data.type === 'answer') {
//                        debugger
                        if(item){
                            item.pc.setRemoteDescription(new RTCSessionDescription(data))
                        }
                    } else if (data.type === 'candidate') {//开直播和看直播的人都会收到candidate
//                        debugger
                        if(item){
                            let candidate = new RTCIceCandidate({
                                sdpMLineIndex: data.label,
                                candidate: data.candidate
                            })
                            if(candidate){
                                item.pc.addIceCandidate(candidate)
                            }
                        }
                    } else {
                        alert('err')
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

