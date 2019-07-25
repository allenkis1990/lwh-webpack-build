
//背景随机
$(function() {
    var length = 3;
    $(".bg-img li:nth-child(2)").show();
    setInterval(function () {
        var randomBgIndex = Math.round(Math.random() * length);
        $("#section1 .bg-img li").eq(randomBgIndex).addClass("show").siblings().removeClass("show");
    },5000);
});

$(function() {
    //编辑器控制
    // $("h4,.nav b").css("color","#fff");

    $(".fades").addClass("fadesin");
    $(" h1.fade").addClass("fadesin1");
    $(" h3.fade").addClass("fadesin2");
    $(" span.fade").addClass("fadesin3");

    //回到顶部
    $("#top").click(function () {
        $('html,body').stop().animate({
            scrollTop: 0
        }, 700);
    });
    showScroll();
    var min_height = document.documentElement.clientHeight /2;
    function showScroll() {
        $(window).scroll(function() {
            var s = $(window).scrollTop();
            s > min_height ? $('#top').fadeIn() : $('#top').fadeOut();
        });
    }


    $(".more-nav").bind("click", function () {
        $(".nav-ul.nav-xs-ul").stop().slideToggle(300);
    });
    function moveTo(){
        $('html,body').animate({
            scrollTop: _top
        }, 500);
    }
    $(".nav-xs-ul li").click(function () {
       $(".nav-xs-ul").slideUp(300)
    });
});

$(window).resize(function (){
    var wid = $(window).width();
    if(wid>768){
        $(".nav-xs-ul").hide();
    }else{
        $(".nav-xs-ul").show();
    }
});