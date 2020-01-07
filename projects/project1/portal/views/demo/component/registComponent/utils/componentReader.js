/**
 * Created by Allen Liu on 2020/1/6.
 */

// import userName from '@portal/views/demo/component/registComponent/components/userName'
// import passWord from '@portal/views/demo/component/registComponent/components/passWord'
import loginInput from '@portal/views/demo/component/registComponent/components/loginInput'

export default function(...arg){
    return {
        // userName:userName(context),
        // passWord:passWord(context),
        loginInput:loginInput(...arg)
    }
}
