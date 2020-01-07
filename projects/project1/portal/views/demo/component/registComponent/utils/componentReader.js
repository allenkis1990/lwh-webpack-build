/**
 * Created by Allen Liu on 2020/1/6.
 */

import userName from '@portal/views/demo/component/registComponent/components/userName'
import passWord from '@portal/views/demo/component/registComponent/components/passWord'
import loginInput from '@portal/views/demo/component/registComponent/components/loginInput'
import sex from '@portal/views/demo/component/registComponent/components/sex'

export default function(...arg){
    return {
        userName:userName(...arg),
        passWord:passWord(...arg),
        loginInput:loginInput(...arg),
        sex:sex(...arg)
    }
}
