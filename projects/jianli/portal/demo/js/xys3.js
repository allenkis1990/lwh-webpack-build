

//响应式实现思路
// 媒体查询定义container的宽度
// 如果设备宽度大于等于900全部都按html fontsize 100px来算rem
// 如果设备小于900就按(winWidth / designWidth) * baseNum + 'px'来换算
// 高度可以用rem  宽度尽量用百分比  太小的单位可以直接用px如边框
// 设置body的通用字号14PX
// 最后再用媒体查询修修补补
let minFontSize = 50
let designWidth = 1200;
let baseNum = 100;
function setRootFontSize() {
    let winWidth = document.documentElement.clientWidth || document.body.clientWidth;
    console.log(winWidth);
    let html = document.getElementsByTagName('html')[0];
    //本项目大于等于900都按900来算
    if(winWidth>=1200){
        winWidth = 1200
    }
    let fontSize = ((winWidth / designWidth) * baseNum)>minFontSize?((winWidth / designWidth) * baseNum):minFontSize
     //let fontSize = (winWidth / designWidth) * baseNum
    html.style.fontSize = fontSize + 'px';
    console.log(html.style.fontSize);
}
setRootFontSize();

window.addEventListener('resize',(e)=>{
    setRootFontSize();
})