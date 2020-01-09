/**
 * Created by Allen Liu on 2020/1/6.
 */

import userName from '@portal/views/demo/component/formComponent/components/userName'
import passWord from '@portal/views/demo/component/formComponent/components/passWord'
import loginInput from '@portal/views/demo/component/formComponent/components/loginInput'
import sex from '@portal/views/demo/component/formComponent/components/sex'
import fav from '@portal/views/demo/component/formComponent/components/fav'

let formMap = {
    userName,
    passWord,
    loginInput,
    sex,
    fav
}

function getExportObj(...arg){
    let exportObj = {}
    Object.keys(formMap).forEach((key)=>{
        exportObj[key] = formMap[key](...arg)
    })
    return exportObj
}

let exportFn = function(...arg){
    let exportObj = getExportObj(...arg)
    return exportObj
}
exportFn.formMap = formMap

export default exportFn
