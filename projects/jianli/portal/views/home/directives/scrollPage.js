/**
 * Created by Allen Liu on 2019/7/25.
 */
import {offset} from '@portal/utils/lwh-utils'
export default {
    bind(ele,binding,vNode){
        var root = document.documentElement || document.body
        var navlocs = ['scroll-aboutMe','scroll-jobSelect','scroll-demo','scroll-base','scroll-mvvm','scroll-lastJob']
        window.addEventListener('scroll',function(){
            bindScrollFn(root,navlocs);
        })
        // bindScrollFn(root,navlocs)

        function bindScrollFn(root,navlocs){
            //导航滚动固定
            //
            var navSection = document.getElementById('section2')
            var nav = document.getElementById('nav-bar')
            var navOffsetTop = offset(navSection,'top')
            var navlis = document.querySelectorAll('.nav-ul li')
            if(root.scrollTop>=navOffsetTop){
                nav.setAttribute('class','bar fixed')
            }else{
                nav.setAttribute('class','bar')
                //滚动小于导航的时候去掉所有navli的active
                navlis.forEach(function(li){
                    li.setAttribute('class','')
                })
            }
            //导航滚动固定


            var navUlDoms = document.querySelectorAll('.nav-ul')
            navlocs.forEach(function(className,blockIndex){
                var block = document.querySelector('.'+className)
                var nextBlock = document.querySelector('.'+navlocs[blockIndex+1])
                // console.log(nextBlock);
                navUlDoms.forEach(function(ul){
                    var lis =ul.querySelectorAll('li')
                    lis.forEach(function(li){
                        if(root.scrollTop>=offset(block,'top')-30){
                            // block.setAttribute('class',className+' active')
                            // console.log(block.parentNode,123);
                            var section = block.parentNode
                            if(nextBlock){
                                if(root.scrollTop<offset(nextBlock,'top')-30){
                                    if(section.getAttribute('class').indexOf('active')<=-1){
                                        section.setAttribute('class','section active')
                                    }
                                }
                            }else{
                                if(section.getAttribute('class').indexOf('active')<=-1){
                                    section.setAttribute('class','section active')
                                }
                            }
                            if(li.getAttribute('loc')===className){
                                li.setAttribute('class','active')
                            }else{
                                li.setAttribute('class','')
                            }
                        }else{
                            // li.setAttribute('class','')
                        }
                    })



                })

            })
        }


    }
}