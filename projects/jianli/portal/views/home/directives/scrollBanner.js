/**
 * Created by Allen Liu on 2019/7/25.
 */
export default {
    inserted(){
        new BannerScroll({
            main:'.bannerMain',
            scrollMain:'ul',
            item:'li',
            duration:5000
        })
    }
}


function BannerScroll(options){
    this.init(options)
}
BannerScroll.prototype.init = function(options){
    var _this = this;
    this.scrollIndex = 0;
    this.duration = options.duration || '2500';
    this.timer = null;
    this.main = document.querySelectorAll(options.main)
    //console.log(document.querySelectorAll(options.main));
    this.main.forEach(function(main){
        _this.initDom(options,main)
    })
}
//初始化dom元素变量
BannerScroll.prototype.initDom = function(options,main){
    var scrollMain = main.querySelector(options.scrollMain)
    var items = scrollMain.querySelectorAll(options.item)
    this.autoPlay(items)
}

//自动轮播
BannerScroll.prototype.autoPlay = function(items){
    var _this = this
    this.timer = setInterval(function(){
        _this.scrollIndex ++
        if(_this.scrollIndex>items.length -1){
            _this.scrollIndex = 0
        }
        _this.move(items)
    },this.duration)
}
//公用move
BannerScroll.prototype.move = function(items){
    Array.from(items).forEach(function(item,i){
        item.style.display = 'none'
    })
    Array.from(items)[this.scrollIndex].style.display = 'block'
}