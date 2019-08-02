var dom={
    nav:$('.nav a'),
    scrollBtnMain:$('#scroll-btn-main'),
    bannerBtn:$('.banner-btn a'),
    bannerTxt:$('.banner-tit a'),
    bannerItem:$('.bannerItem'),
    oneScroll:$('#oneScroll'),
    manyScroll:$('#manyScroll')
};

var bannerIndex= 0,bannerTimePlay=null,scrollIndex1= 0,scrollEq= 0;
var manyScroll={
    index0:0,
    index1:0,
    index2:0,
    index3:0,
    index4:0
}

dom.nav.click(function(){
    var $this=$(this);
    $this.addClass('hover').find('i').css('display','inline-block');
    $this.siblings().removeClass('hover').find('i').css('display','none');
    //alert(1);
});


dom.scrollBtnMain.find('.scroll-tab-btn').click(function(){
    var $this=$(this);
    scrollEq=$this.index();
    $this.addClass('hover').siblings().removeClass('hover');
    dom.manyScroll.find('.scroll-item-box').eq(scrollEq).show().siblings('.scroll-item-box').hide();
});



dom.bannerBtn.click(function(){
    var $this=$(this);
    bannerIndex=$this.index();
    $this.addClass('hover').siblings().removeClass('hover');
    dom.bannerTxt.eq(bannerIndex).show().siblings().hide();
    dom.bannerItem.eq(bannerIndex).show().siblings('.bannerItem').hide();
});


function bannerAutoPlay(){
    bannerTimePlay=setInterval(function(){
        bannerDo();
    },3000);
}

bannerAutoPlay();

function bannerDo(){
    bannerIndex++;
    if(bannerIndex>dom.bannerItem.length-1){
        bannerIndex=0;
    }

    dom.bannerBtn.eq(bannerIndex).addClass('hover').siblings().removeClass('hover');
    dom.bannerTxt.eq(bannerIndex).show().siblings().hide();
    dom.bannerItem.eq(bannerIndex).show().siblings('.bannerItem').hide();
}


$('.banner').hover(function(){
    clearInterval(bannerTimePlay);
},function(){
    bannerAutoPlay();
});



dom.oneScroll.find('.next').click(function(){

    if(dom.oneScroll.find('.scroll-item-box').find('.scroll-ul-long li').length<=5){
        //alert('小于等于5');
    }else{
        scrollIndex1++;
        if(scrollIndex1+5>dom.oneScroll.find('.scroll-item-box').find('.scroll-ul-long li').length){
            scrollIndex1=dom.oneScroll.find('.scroll-item-box').find('.scroll-ul-long li').length-5;
            return false;
        }
        dom.oneScroll.find('.scroll-item-box').find('.scroll-ul-long').stop(true,true).animate({'margin-left':-184*scrollIndex1});
    }


});
dom.oneScroll.find('.pre').click(function(){

    scrollIndex1--;
    if(scrollIndex1<=0){
        scrollIndex1=0;
    }
    dom.oneScroll.find('.scroll-item-box').find('.scroll-ul-long').stop(true,true).animate({'margin-left':-184*scrollIndex1});


});

dom.manyScroll.find('.next').click(function(){
    if(dom.manyScroll.find('.scroll-item-box').eq(scrollEq).find('.scroll-ul-long li').length<=5){
        //alert('小于等于5');
    }else{
        manyScroll['index'+scrollEq]++;
        //scrollIndex1++;
        if(manyScroll['index'+scrollEq]+5>dom.manyScroll.find('.scroll-item-box').eq(scrollEq).find('.scroll-ul-long li').length){
            manyScroll['index'+scrollEq]=dom.manyScroll.find('.scroll-item-box').eq(scrollEq).find('.scroll-ul-long li').length-5;
            return false;
        }
        dom.manyScroll.find('.scroll-item-box').eq(scrollEq).find('.scroll-ul-long').stop(true,true).animate({'margin-left':-184*manyScroll['index'+scrollEq]});
    }
});

dom.manyScroll.find('.pre').click(function(){

    manyScroll['index'+scrollEq]--;
    if(manyScroll['index'+scrollEq]<=0){
        manyScroll['index'+scrollEq]=0;
    }
    dom.manyScroll.find('.scroll-item-box').eq(scrollEq).find('.scroll-ul-long').stop(true,true).animate({'margin-left':-184*manyScroll['index'+scrollEq]});


});


$('.tab-box a').click(function(){
    var $this=$(this),index=$this.index();
    $this.addClass('hover').siblings().removeClass('hover');
    $('#js-tabItem .tabList-item').eq(index).show().siblings().hide();
});



$('.erji-nav li').click(function(){
    var $this=$(this);
    $this.addClass('hover').siblings().removeClass('hover');
});




