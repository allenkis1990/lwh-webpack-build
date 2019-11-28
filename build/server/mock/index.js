/**
 * Created by Allen Liu on 2019/11/28.
 */
module.exports = function(app){
    app.get('/global/getUserInfo',function(req,res){
        res.send({
            code:200,
            info:{
                name:'allen',
                age:18,
                id:'001'
            }
        })
    })
}