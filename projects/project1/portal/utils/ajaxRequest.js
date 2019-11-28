/**
 * Created by Allen Liu on 2019/11/28.
 */
import axios from 'axios'

class AjaxRequest{
    constructor(){

    }
    create(options){
        var opts = {
            baseURL: '',
            timeout: 5000,
            headers: {'fuck': 'fuckYou'},
            ...options
        }
        const instance = axios.create(opts);
        return instance
    }
}

export default new AjaxRequest()