/**
 * Created by Allen Liu on 2019/11/28.
 */
import axios from 'axios'
import interceptors from '@portal/utils/interceptors'
class AjaxRequest{
    constructor(){

    }
    create(options){
        var opts = {
            baseURL: '',
            timeout: 10000,
            // headers: {'fuck': 'fuckYou'},
            ...options
        }
        const instance = axios.create(opts);
        //用create创建的实例需要重新添加拦截器
        interceptors(instance)
        return instance
    }
}

export default new AjaxRequest()