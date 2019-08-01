/**
 * Created by Allen Liu on 2019/8/1.
 */

var path = require('path')
var htmlPdf = require('html-pdf')
var template = require('art-template')
var tempPath = path.resolve(__dirname, './temp/print.html')
var fs = require('fs');
var mineType = require('mime-types');
var formdata = require('formidable');
var fileDataBase = './fileDataBase'


function onData(req, cb) {
    var form = new formdata.IncomingForm();
    var obj = {
        files: {},
        data: {}
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

function getFileBase64(filePath, mt) {
    let data = fs.readFileSync(filePath);
    data = new Buffer(data).toString('base64');
    let base64 = 'data:' + (mt ? mt : mineType.lookup(filePath)) + ';base64,' + data;
    return base64
}

var actions = {
    start(app) {
        this.print(app)
        this.previewPdf(app)
    },
    print(app) {
        app.post('/actions/print', function (req, res) {
            var headers = req.headers
            if (headers.referer.indexOf(headers.host) <= -1) {
                res.send({code: '500', message: '来自外部链接的操作', pdfPath: null})
            }
            // console.log(req);
            onData(req, function (obj) {
                // console.log(obj.data);
                // console.log(JSON.stringify(obj.files.imgPath));
                var imgBase64 = getFileBase64(obj.files.imgPath.path, obj.files.imgPath.type)
                var userInfo = Object.assign({imgBase64: imgBase64}, obj.data)

                var tempStr = template(tempPath, {userInfo})

                var pdfDestPath = decodeURI(userInfo.userName + '.pdf')
                // console.log(pdfDestPath,'pdfDestPath');
                htmlPdf.create(tempStr, {}).toFile(path.resolve(__dirname, fileDataBase, pdfDestPath), function (err, r) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    console.log('生成pdf成功');
                    res.send({code: '200', message: '生成pdf成功', pdfPath: pdfDestPath})
                });
            })
        })
    },
    previewPdf(app) {
        app.get('/preview/pdf/*', function (req, res) {
            var pathArr = req.url.split('/')
            var fileName = decodeURI(pathArr[pathArr.length - 1])
            // console.log(fileName,'fileName');
            fs.readFile(path.resolve(__dirname, fileDataBase, fileName), function (err, data) {
                res.setHeader('Content-Type', 'application/pdf')
                res.send(data)
            })
        })
    }

}
module.exports = actions