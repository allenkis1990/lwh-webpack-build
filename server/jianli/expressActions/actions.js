/**
 * Created by Allen Liu on 2019/8/1.
 */

var path = require('path')
var htmlPdf = require('html-pdf')
var template = require('art-template')
var tempPath = path.resolve(__dirname,'./temp/print.html')
var fs = require('fs');
var mineType = require('mime-types');
var formdata = require('formidable');
var fileDataBase = './fileDataBase'
var $http = require('axios')

function onData(req,cb) {
    var form = new formdata.IncomingForm();
    var obj = {
        files:{},
        data:{}
    }
    form.on('field', function (name, value) {
        obj.data[name] = value;//这里提取的是键值对数据
    }).on('file', function (name, file) {
        obj.files[name] = file;//这里提取上传的文件
    }).on('end', function () {
        cb(obj)
    });
    form.parse(req);
}
function getFileBase64(filePath,mt){
    let data = fs.readFileSync(filePath);
    data = new Buffer(data).toString('base64');
    let base64 = 'data:' + (mt?mt:mineType.lookup(filePath)) + ';base64,' + data;
    return base64
}
var actions = {
    start(app){
        this.print(app)
        this.previewPdf(app)
        this.faceMatch(app)
    },
    print(app){
        app.post('/actions/print',function(req,res){
            var headers = req.headers
            if(headers.referer.indexOf(headers.origin)<=-1){
                res.send({code:'500',message:'来自外部链接的操作',pdfPath:null})
            }
            // console.log(req);
            onData(req,function(obj){
                // console.log(obj.data);
                // console.log(JSON.stringify(obj.files.imgPath));
                var imgBase64
                try {
                    imgBase64 = getFileBase64(obj.files.imgPath.path, obj.files.imgPath.type)
                }catch(e){
                    if(e){
                        console.log('没找到上传的文件')
                        res.send({code: '500', message: '没找到上传的文件', pdfPath: null})
                    }
                }
                var userInfo = Object.assign({imgBase64:imgBase64},obj.data)

                var tempStr = template(tempPath,{userInfo})

                var pdfDestPath = decodeURI(userInfo.userName+'.pdf')
                // console.log(pdfDestPath,'pdfDestPath');
                htmlPdf.create(tempStr, {}).toFile(path.resolve(__dirname,fileDataBase,pdfDestPath), function (err, r) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    console.log('生成pdf成功');
                    res.send({code:'200',message:'生成pdf成功',pdfPath:pdfDestPath})
                });
            })
        })
    },
    previewPdf(app){
        app.get('/preview/pdf/*',function(req,res){
            // console.log(req.url);
            var pathArr = req.url.split('/')
            var fileName =decodeURI(pathArr[pathArr.length-1])
            // console.log(fileName,'fileName');
            fs.readFile(path.resolve(__dirname,fileDataBase,fileName),function(err,data){
                res.setHeader('Content-Type', 'application/pdf')
                res.send(data)
            })
        })
    },
    getFaceToken(){
        var params = {
            grant_type:'client_credentials',
            client_id:'lzOrvaTAdUoztDMYwyxoraYz',
            client_secret:'f8A5twK7rgsrjGMBBz8jd3DYDOYa5qu4'
        }
        return new Promise(function(resolve,reject){
            $http.post('https://aip.baidubce.com/oauth/2.0/token?grant_type='+params.grant_type+'&client_id='+params.client_id+'&client_secret='+params.client_secret).then(function(data){
                var response = data.data
                if(response.error){
                    resolve({
                        code:'500',
                        message:response.error_description
                    })
                }else{
                    resolve({
                        code:'200',
                        info:response
                    })
                }
            },function(){
                resolve({
                    code:'500',
                    message:'服务调用失败'
                })
            })
        })
    },
    faceMatchRequest(access_token,basePhoto,curPhoto){
        var params = []
        for(let i=0;i<2;i++){
            params.push({
                image_type:'BASE64',
                image:'',
                face_type:'LIVE',
                quality_control:'NONE',
                liveness_control:'NONE'
            })
        }
        params[0].image = encodeURIComponent(basePhoto)
        params[0].image = encodeURIComponent(curPhoto)

        console.log(params);
        return new Promise(function(resolve,reject){
            $http.post('https://aip.baidubce.com/rest/2.0/face/v3/match?access_token='+access_token,params).then(function(data){
                var response = data.data
                resolve({
                    code:'200',
                    info:response
                })
            },function(){
                resolve({
                    code:'500',
                    message:'服务调用失败'
                })
            })
        })
    },
    faceMatch(app){
        var _this = this
        app.post('/actions/faceMatch',function(req,res){
            _this.getFaceToken().then(function(data){
                if(data.code==='200'){
                    onData(req,function(obj){
                        _this.faceMatchRequest(data.info.access_token,obj.data.basePhoto,obj.data.curPhoto).then(function(requestData){
                            res.send(requestData)
                        })
                    })
                }else{
                    res.send(data)
                }
            })
        })
    }

}
module.exports = actions