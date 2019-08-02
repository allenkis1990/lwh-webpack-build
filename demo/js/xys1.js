/**
 * Created by Allen Liu on 2019/7/20.
 */
//获取元素距离顶部或者左边的距离
function offset(obj, direction) {
    //将top,left首字母大写,并拼接成offsetTop,offsetLeft
    var offsetDir = 'offset' + direction[0].toUpperCase() + direction.substring(1);

    var realNum = obj[offsetDir];
    var positionParent = obj.offsetParent;  //获取上一级定位元素对象

    while (positionParent != null) {
        realNum += positionParent[offsetDir];
        positionParent = positionParent.offsetParent;
    }
    return realNum;
}

function setFontSize(){
    var root = document.documentElement
    var fontSize = root.clientWidth/1920*100
    root.style.fontSize = fontSize+'px'
}
window.onload = function(){
    setFontSize()
}
window.addEventListener('resize',function(){
    setFontSize()
    var fixSilderNav = document.getElementById('fixSilderNav')
    fixSilderNav.style.left = '-70%'
})



var hideNavBtn = document.getElementById('nav-hide-btn')
var fixSilderNav = document.getElementById('fixSilderNav')
hideNavBtn.addEventListener('click',function(e){
    e.stopPropagation()
    fixSilderNav.style.left = 0
})
window.addEventListener('click',function(){
    fixSilderNav.style.left = '-70%'
})

// nav-list
var nav=  document.getElementById('nav-list')
registNavAddEvent(nav)
registNavAddEvent(fixSilderNav)
function registNavAddEvent(ele){
    ele.addEventListener('click',function(e){
        var target = e.target
        var className = target.getAttribute('loc')
        var jumpTarget = document.querySelector('.'+className)
        var offT = offset(jumpTarget,'top')
        var root = document.documentElement
        lwhAnimate(root,{scrollTop:offT})
    })
}
