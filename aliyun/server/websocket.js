/**
 * Created by AllenLiu on 2019/7/29.
 */
var http=require('http');


//所有进入聊天室的用户存在这个数组里
function wbStart(app){
    var server=http.createServer(app);
    var io=require('socket.io')(server);
    var clientsArr=[];
    io.on('connection',function(client){
        //console.log('服务端连接成功！！');
        //client.emit('hello');
        //console.log(client);

        //clientObj是每个客户端私有的
        var clientObj={

        };
        client.on('message',function(msg){
            //init为true为取名阶段
            if(msg.init){


                var index=findIndex(clientsArr,'name',msg.name);
                if(index===null){
                    //如果数组里找不到这个用户就存进数组
                    clientsArr.push({
                        name:msg.name,
                        client:client,
                        userImg:msg.userImg
                    });

                    //广播欢迎用户来到直播间
                    client.emit('system','system',msg);
                    client.broadcast.emit('system','system',msg);

                    //这里保存当前用户的名字和头像用户断开连接
                    clientObj.name=msg.name;
                    clientObj.userImg=msg.userImg;

                    //关闭弹窗
                    client.emit('hideDialog');
                    client.broadcast.emit('hideDialog');


                    var nameArr=collectUserArr(clientsArr);
                    //广播用户列表 用于前端显示右侧用户列表
                    client.broadcast.emit('countTotalUser',{arr:nameArr});
                    client.emit('countTotalUser',{arr:nameArr});
                }else{
                    //如果找到用户提示用户名已存在
                    client.emit('existUser');
                }

            }else{

                //私聊正则 匹配'@name content'
                var chatReg=/^\@(.+)\s+(.+)\s$/;
                //match[1]匹配name match[2]匹配content
                var match=msg.content.match(chatReg);
                console.log(match);

                if(match){
                    //console.log(clientsArr);
                    var index=findIndex(clientsArr,'name',match[1]);
                    //如果私聊的对象存在
                    if(index!==null){

                        //如果私聊的不是自己
                        if(match[1]!==msg.name){
                            //私聊对方可以看到 发私聊者也能看到信息
                            clientsArr[index].client.emit(
                                'system',
                                'pm',
                                {name:msg.name,
                                    content:match[2],
                                    init:false,
                                    fromUserImg:msg.userImg,
                                    toUserImg:clientsArr[index].userImg
                                }
                            );
                            client.emit(
                                'system',
                                'pm',
                                {name:msg.name,
                                    content:match[2],
                                    init:false,
                                    fromUserImg:msg.userImg,
                                    toUserImg:clientsArr[index].userImg
                                }
                            );
                        }else{
                            //和自己说话
                            client.emit('downSayWithSelf');
                        }
                    }else{
                        //找不到私聊用户提示
                        client.emit('canontFindPmUser');
                    }
                }else{
                    //init为false为聊天阶段
                    client.emit('system','user',msg);
                    client.broadcast.emit('system','user',msg);
                }

            }
            client.send(msg);
        });


        //断开连接
        client.on('disconnect',function(){
            //console.log(clientObj);


            var index=findIndex(clientsArr,'name',clientObj.name);
            if(index!==null){
                //把断开连接的踢出数组
                clientsArr.splice(index,1);
            }
            //广播用户离开
            client.broadcast.emit('leave',clientObj.name,clientObj.userImg);
            var nameArr=collectUserArr(clientsArr);
            //刷新一下右边用户列表
            client.broadcast.emit('countTotalUser',{arr:nameArr});
            client.emit('countTotalUser',{arr:nameArr});
        });


    });
    return server
}



function collectUserArr(arr){
    var newArr=[];
    arr.forEach(function(item){
        newArr.push({
            name:item.name,
            userImg:item.userImg
        });
    });
    return newArr;
}

function findIndex (arr, property, id) {
    var index = null;
    arr.forEach(function (item, itemIndex) {
        if (item[property] === id) {
            index = itemIndex;
        }
    });
    return index;
}

module.exports = wbStart


