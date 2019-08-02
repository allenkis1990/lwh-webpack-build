/**
 * Created by Allen Liu on 2019/7/25.
 */
import {offset} from '@portal/utils/lwh-utils'
var scrollListener
export default {
    bind(ele,binding,vNode){
        var navlocs = ['scroll-aboutMe','scroll-jobSelect','scroll-demo','scroll-demo2','scroll-base','scroll-mvvm','scroll-lastJob']
        scrollListener = function(){
            bindScrollFn(navlocs);
        }
        window.addEventListener('scroll',scrollListener)
        // bindScrollFn(root,navlocs)

        function bindScrollFn(navlocs){
            //导航滚动固定
            //
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            var navSection = document.getElementById('section2')
            var nav = document.getElementById('nav-bar')
            var navOffsetTop = offset(navSection,'top')
            var navlis = document.querySelectorAll('.nav-ul li')
            if(scrollTop>=navOffsetTop){
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
                        if(scrollTop>=offset(block,'top')-30){
                            // block.setAttribute('class',className+' active')
                            // console.log(block.parentNode,123);
                            var section = block.parentNode
                            // console.log(section.getAttribute('class'),123);
                            var classStr = section.getAttribute('class').indexOf('demo-section')>-1?
                                'section demo-section active':'section active'
                            if(nextBlock){
                                if(scrollTop<offset(nextBlock,'top')-30){
                                    if(section.getAttribute('class').indexOf('active')<=-1){
                                        section.setAttribute('class',classStr)
                                    }
                                }
                            }else{
                                if(section.getAttribute('class').indexOf('active')<=-1){
                                    section.setAttribute('class',classStr)
                                }
                            }
                            if(li.getAttribute('loc')===className){
                                li.setAttribute('class','active')
                            }else{
                                if(className!=='scroll-demo2'){
                                    li.setAttribute('class','')
                                }
                            }
                        }else{
                            // li.setAttribute('class','')
                        }
                    })



                })

            })
        }


    },
    unbind(){
        window.removeEventListener('scroll',scrollListener)
    }
}