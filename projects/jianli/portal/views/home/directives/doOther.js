/**
 * Created by Allen Liu on 2019/7/25.
 */
import {lwhAnimate,offset} from '@portal/utils/lwh-utils'
export default {
    bind(ele, binding, vNode){

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


            var returnTop = document.getElementById("top")
            //回到顶部
            returnTop.addEventListener('click',function(){
                var root = document.documentElement || document.body
                lwhAnimate(root,{scrollTop:0})
            })
            //滚动显示隐藏回到顶部按钮
            window.addEventListener('scroll',function(){
                var root = document.documentElement || document.body
                var min_height = root.clientHeight /2
                var s = root.scrollTop
                if(s>min_height){
                    returnTop.style.display = 'block'
                }else{
                    returnTop.style.display = 'none'
                }
            })




            var moreNavBtn = document.querySelector('.more-nav')
            var xsNav = document.querySelector('.nav-ul.nav-xs-ul')
            var bol = false
            moreNavBtn.addEventListener('click',function(){
                bol = !bol
                if(bol){
                    xsNav.style.display = 'block'
                    setTimeout(function(){
                        xsNav.style.opacity = 1
                    },50)
                }else{
                    xsNav.style.opacity = 0
                    setTimeout(function(){
                        xsNav.style.display = 'none'
                    },1000)
                }
                // console.log(123);
            })

            // $(".more-nav").bind("click", function () {
            //     $(".nav-ul.nav-xs-ul").stop().slideToggle(300);
            // });
            // $(".nav-xs-ul li").click(function () {
            //     $(".nav-xs-ul").slideUp(300)
            // });
        });

        $(window).resize(function (){
            var wid = $(window).width();
            if(wid>768){
                $(".nav-xs-ul").hide();
            }else{
                $(".nav-xs-ul").show();
            }
        });
    }
}