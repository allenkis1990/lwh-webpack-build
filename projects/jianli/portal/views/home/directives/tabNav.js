/**
 * Created by Allen Liu on 2019/7/25.
 */
import {lwhAnimate,offset} from '@portal/utils/lwh-utils'
export default {
    bind(ele, binding, vNode){
        ele.addEventListener('click',function(e){
            var target = e.target
            if(target.getAttribute('class')==='active'){
                return false
            }
//                        console.log(target);
            var className = target.getAttribute('loc')
            var jumpTarget = document.querySelector('.'+className)
            var offT = offset(jumpTarget,'top')
            var root = document.documentElement
            lwhAnimate(root,{scrollTop:offT})
            var navLists = ele.querySelectorAll('li')
            navLists.forEach(function(li){
                li.setAttribute('class','')
            })
            target.setAttribute('class','active')
        })
    }
}