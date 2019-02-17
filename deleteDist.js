/**
 * Created by admin on 2019/2/17.
 */
const rimraf = require('rimraf');
rimraf('./dist', function (err) {
    if(err){
        console.log(err);
    }
});