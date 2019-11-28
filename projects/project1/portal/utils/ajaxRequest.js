/**
 * Created by Allen Liu on 2019/11/28.
 */
import axios from 'axios'

class AjaxRequest{
    constructor(options){
        this.options = options || {}
    }
    create(){
        var _this = this
        var opts = {
            baseURL: '',
            timeout: 5000,
            headers: {'fuck': 'fuckYou'},
            ..._this.options
        }
        const instance = axios.create(opts);
        return instance
    }
    request(options){
        var instance = this.create()
        return instance.request({
            url:options.url,
            method:options.method
        })
    }
}

export default new AjaxRequest()