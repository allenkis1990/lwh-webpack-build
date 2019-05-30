/**
 * Created by admin on 2019/5/30.
 */
var baseDialogOptions = {
    template:`<div id="$$dialogId$$">
                    <div class="dialog-header">{{dialogTit}}</div>
                    <div class="dialog-content">$$dialogContent$$</div>
                    <div class="dialog-footer">
                        <button @click="cancelFn()">{{cancelValue}}</button>
                    </div>
              </div>`,
    data:{
        cancelValue:'取消',
        dialogTit:'标题'
    }
}
import Vue from 'vue'
export default {
    contentDialog(opts,vueOpts){
        var options = opts || {}
        var vueOptions = vueOpts || {}
        var scopeOptions = {}
        scopeOptions = Object.assign(scopeOptions,vueOptions)
        scopeOptions.methods.cancelFn = function(){
            var dialogDom = document.getElementById(options.id)
            document.body.removeChild(dialogDom)
            options.cancelCb && options.cancelCb()
        }
        scopeOptions.template = baseDialogOptions.template.replace(/\$\$dialogContent\$\$/ig,vueOptions.template)
        scopeOptions.template = scopeOptions.template.replace(/\$\$dialogId\$\$/ig,options.id)
        scopeOptions.methods = Object.assign(scopeOptions.methods,vueOptions.methods)

        var data = {
            cancelValue: options.cancelValue || baseDialogOptions.data.cancelValue,
            dialogTit:options.title || baseDialogOptions.data.dialogTit
        }
        data = Object.assign(data,(vueOptions.data || {}))
        console.log(data,1212);
        scopeOptions.data = function(){
            return data
        }
        //console.log(scopeOptions);
        var dialogDom = document.getElementById(options.id)
        if(dialogDom){
            dialogDom.style.display = 'block'
        } else {
            var div = document.createElement('div')
            div.id = options.id
            document.body.appendChild(div)
            var compileOpts = Vue.extend(scopeOptions)
            new compileOpts().$mount('#'+options.id)
        }
    }
}