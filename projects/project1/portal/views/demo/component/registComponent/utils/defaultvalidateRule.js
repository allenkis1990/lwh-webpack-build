/**
 * Created by Allen Liu on 2020/1/7.
 */
export default [
    {
        key:'loginInput',
        msg:'账号不能为空',
        needRegValid:true,
        validate:{
            reg:/^\d+$/,
            msg:'账号密码为数字'
        }
    }
]