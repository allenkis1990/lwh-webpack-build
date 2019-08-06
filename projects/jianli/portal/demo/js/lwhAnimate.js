/**
 * Created by Allen Liu on 2019/7/20.
 */

function lwhAnimate(ele,options,callBack,ingFn,beishu){
    function doSpecFn(styleName,n){
        if(styleName==='scrollTop'){
            return function(){
                var html = document.documentElement
                var body = document.body
                html[styleName] = n
                body[styleName] = n
            }
        }else{
            return false
        }
    }
    Object.keys(options).forEach(function(styleName,i){
        ele['animateId'+i] = requestAnimationFrame(function(time){
            move(time,ele['animateId'+i],function(ele){
                callBack&&callBack(ele)
            })
        })
        var trueStyles = window.getComputedStyle(ele)
        var initNum = 0
        var initBei = 1
        if(styleName==='opacity'){
            initBei = 1000
            initNum = 1
        }
        // debugger
        var initLocation = parseFloat(trueStyles[styleName]?trueStyles[styleName]:initNum)*initBei
        var fallyLocation = parseFloat(options[styleName])*initBei
//            console.log(initLocation);
//            console.log(fallyLocation);
        var danwei = isNaN(Number(options[styleName]))?(options[styleName].replace(/\d+/,'')):''
        var distant = 0
        function move(time,animateId,cb){
            distant++
            if(initLocation>fallyLocation){
                initLocation -= distant * (beishu || 1)
                var a = (initLocation/initBei)<=fallyLocation?fallyLocation:(initLocation/initBei)
                var n = danwei? a+danwei : a
                var spec = doSpecFn(styleName,n)
                if(spec){
                    spec()
                }else{
                    ele.style[styleName] =n
                }
                ingFn && ingFn(ele,animateId)
                if(initLocation>fallyLocation){
                    animateId = requestAnimationFrame(function(){
                        move(time,animateId,cb)
                    })
                }else{
                    cancelAnimationFrame(animateId)
                    cb(ele)
                }
            }else{
                initLocation += distant * (beishu || 1)
                var a = (initLocation/initBei)>=fallyLocation?fallyLocation:(initLocation/initBei)
                var n = danwei? a+danwei : a
                var spec = doSpecFn(styleName,n)
                if(spec){
                    spec()
                }else{
                    ele.style[styleName] =n
                }
                ingFn && ingFn(ele,animateId)
                if(initLocation<fallyLocation){
                    animateId = requestAnimationFrame(function(){
                        move(time,animateId,cb)
                    })
                }else{
                    cb(ele)
                    cancelAnimationFrame(animateId)
                }
            }
        }
    })
}