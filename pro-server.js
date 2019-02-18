let project = './dist/project1'
let express = require('express')
let app = express()
let path = require('path')
app.use(express.static(path.resolve(__dirname,project)))

/*app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname,`${project}/portal/index.html`))
})
app.get('/center',function(req,res){
    res.sendFile(path.resolve(__dirname,`${project}/center/index.html`))
})*/

app.listen('8989')