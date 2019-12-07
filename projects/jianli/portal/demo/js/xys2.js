let designWidth = 900;
let baseNum = 100;
function setRootFontSize() {
    let winWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let html = document.getElementsByTagName('html')[0];
    //本项目大于等于900都按900来算
    if(winWidth>=900){
        winWidth = 900
    }
    html.style.fontSize = (winWidth / designWidth) * baseNum + 'px';
    console.log(html.style.fontSize);
}
setRootFontSize();

window.addEventListener('resize',(e)=>{
    setRootFontSize();
})