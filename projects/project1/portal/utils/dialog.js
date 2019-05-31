/**
 * Created by admin on 2019/5/30.
 */
var baseDialogOptions = {
    template:`<div id="$$dialogId$$">
                    <div class="dialog-mask animateMask"></div>
                    <div class="dialogBox animateDialog">
                        <div class="dialog-header">{{dialogTit}}</div>
                        <div class="dialog-content">$$dialogContent$$</div>
                        <div class="dialog-footer">
                            <button @click="remove()">{{cancelValue}}</button>
                        </div>
                    </div>                    
              </div>`,
    data:{
        cancelValue:'取消',
        dialogTit:'标题'
    }
}
//合并传进来的vue option
var mergerOptionsFn = function(scopeOptions,vueOptions,options){
    scopeOptions = Object.assign(scopeOptions,vueOptions)
    scopeOptions.methods.remove = function(){
        var dialogMask = document.querySelector('.dialog-mask')
        var dialogBox = document.querySelector('.dialogBox')
        // dialog-mask animateMask
        dialogMask.setAttribute('class','dialog-mask animateMaskLeave')
        dialogBox.setAttribute('class','dialogBox animateDialogLeave')
        options.cancelCb && options.cancelCb()
        setTimeout(function(){
            var dialogDom = document.getElementById(options.id)
            document.body.removeChild(dialogDom)
            dialogDom = null;
        },1400)
    }
    scopeOptions.template = baseDialogOptions.template.replace(/\$\$dialogContent\$\$/ig,vueOptions.template)
    scopeOptions.template = scopeOptions.template.replace(/\$\$dialogId\$\$/ig,options.id)
    scopeOptions.methods = Object.assign(scopeOptions.methods,vueOptions.methods)

    var data = {
        cancelValue: options.cancelValue || baseDialogOptions.data.cancelValue,
        dialogTit:options.title || baseDialogOptions.data.dialogTit
    }
    data = Object.assign(data,(vueOptions.data || {}))
    scopeOptions.data = function(){
        return data
    }
}
import Vue from 'vue'
export default {
    contentDialog(opts,vueOpts){
        var options = opts || {}
        var vueOptions = vueOpts || {}
        //console.log(scopeOptions);
        var dialogDom = document.getElementById(options.id)
        if(dialogDom){
            dialogDom.style.display = 'block'
        } else {

            var scopeOptions = {}
            mergerOptionsFn(scopeOptions,vueOptions,options);

            var div = document.createElement('div')
            div.id = options.id
            document.body.appendChild(div)
            var compileOpts = Vue.extend(scopeOptions)
            new compileOpts().$mount('#'+options.id)
        }
    }
}