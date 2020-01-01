/**
 * Created by admin on 2019/3/11.
 */
import { Message,Loading,MessageBox } from 'element-ui'
export default function(Vue){
    Vue.prototype.$message = Message
    Vue.prototype.$loading = Loading
    Vue.prototype.$messageBox = MessageBox
}