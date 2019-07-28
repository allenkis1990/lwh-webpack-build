/**
 * Created by Allen Liu on 2019/7/25.
 */
import {lwhAnimate,offset,addClass} from '@portal/utils/lwh-utils'
export default {
    inserted(){
        window.onload = function(){
            //初始化一些动画样式
            addClass('.fades','fadesin')
            addClass('h1.fade','fadesin1')
            addClass('h3.fade','fadesin2')
            addClass('span.fade','fadesin3')


            //返回顶部动画
            var returnTop = document.getElementById("top")
            //回到顶部
            returnTop.addEventListener('click',function(){
                var root = document.documentElement || document.body
                lwhAnimate(root,{scrollTop:0})
            })


            //滚动显示隐藏回到顶部按钮
            window.addEventListener('scroll',function(){
                var root = document.documentElement || document.body
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                var min_height = root.clientHeight /2
                if(scrollTop>min_height){
                    returnTop.style.display = 'block'
                }else{
                    returnTop.style.display = 'none'
                }
            })




            //点击超小导航按钮显示隐藏超小导航
            var moreNavBtn = document.querySelector('.more-nav')
            var xsNav = document.querySelector('.nav-ul.nav-xs-ul')
            function getXsNavHeight(obj){
                var res = 0
                var liList = Array.from(obj.childNodes).filter(function(node){
                    return node.nodeName.toLowerCase()==='li'
                })
                liList.forEach(function(item){
                    var itemH = Number.parseFloat(window.getComputedStyle(item).height)
                    res+=itemH
                })
                res+=Number.parseFloat(window.getComputedStyle(xsNav).paddingBottom)
                return res
            }
            var xsNavH = getXsNavHeight(xsNav)
            var bol = false
            var t = 0

            xsNav.addEventListener('click',function(e){
                var target = e.target
                if(target.nodeName.toLowerCase()==='li'){
                    toggleSlider()
                }
            })


            moreNavBtn.addEventListener('click',function(){
                toggleSlider()
            })

            function toggleSlider(){
                if(new Date().getTime() - t<350){
                    return false
                }
                bol = !bol
                if(bol){
                    xsNav.style.display = 'block'
                    xsNav.style.height = '0px'
                    setTimeout(function(){
                        xsNav.style.height = xsNavH + 'px'
                    },50)
                }else{
                    xsNav.style.height = '0px'
                    setTimeout(function(){
                        xsNav.style.display = 'none'
                    },280)
                }
                t = new Date().getTime()
            }


            //屏幕大于768隐藏超小导航
            window.addEventListener('resize',function(){
                var root = document.documentElement || document.body
                var wid = root.clientWidth
                if(wid>768){
                    xsNav.style.display = 'none'
                }
            })
        }
    }
}