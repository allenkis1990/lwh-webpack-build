//拦截器
import axios from 'axios'
import { Message,Loading } from 'element-ui'
let requestMapper = {}
var loadingInstance
var utils = {
    pushUrl(url){
        loadingInstance = Loading.service({});
        if(!requestMapper.hasOwnProperty(url)){
            requestMapper[url] = url
        }
    },
    processLoading(url){
        if(requestMapper.hasOwnProperty(url)){
            delete requestMapper[url]
        }
        // console.log(requestMapper,55);
        if(JSON.stringify(requestMapper)==='{}'){
            console.log('隐藏loading')
            loadingInstance.close()
        }
    }
}
export default function(instance){
    instance.interceptors.request.use(function (request) {
        // console.log(request);
        let dateHsh = /\?/ig.test(request.url) ? '&' : '?'
        request.url += `${dateHsh}_q_='${new Date().getTime()}`
        //不加timeout会拿不到baseUrl  比如/global.xxx 就只会拿到/xxx
        setTimeout(function(){
            utils.pushUrl(request.url)
        })
        return request;
    }, function (error) {
        // console.log(error,55555);
        return Promise.reject(error);
    });

// Add a response interceptor
    instance.interceptors.response.use(function (response) {
        var url = response.config.url
        utils.processLoading(url)
        return response;
    }, function (error,a,b) {
        if (error.response) {
            var url = error.response.config.url
            setTimeout(function(){
                utils.processLoading(url)
            })
            if (error.response.status === 404) {
                Message({
                    message:'请求404',
                    type:'error'
                })
                console.log(Message);
                console.error('请求404!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                return;
            }
            if (error.response.status === 401) {
                console.error('还没登陆!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                return;
            }
            if (error.response.status === 500) {
                console.error('服务器出错!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                return;
            }
        }else{
            //超时了隐藏loading
            setTimeout(()=>{
                loadingInstance.close()
            },500)
        }
        return Promise.reject(error);
    });
}

//添加全局header头
// axios.defaults.headers.common['lwh'] = 'liuweiheng123';
axios.defaults.headers.post['Content-Type'] = 'application/json';
