/**
 * Created by Allen Liu on 2019/11/28.
 */
module.exports = function(app){
    app.get('/global/getUserInfo',function(req,res){
        setTimeout(function(){
            res.send({
                code:200,
                info:{
                    name:'allen',
                    age:18,
                    id:'001'
                }
            })
        },1000)
    })


    app.get('/global/getList',function(req,res){
        setTimeout(function(){
            res.send({
                code:200,
                info:[
                    {name:'allen'},
                    {name:'jack'},
                    {name:'tom'}
                ]
            })
        },3000)
    })
}