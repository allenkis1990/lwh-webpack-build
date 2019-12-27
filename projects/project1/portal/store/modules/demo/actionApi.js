/**
 * Created by Allen Liu on 2019/11/28.
 */
import instance from '@portal/utils/ajaxRequest'

var $http = instance.create({
    baseURL: 'http://127.0.0.1:8989/sku'
})

export const getSkuDetailApi = function(){
    return $http.request({
        url:'/getSkuDetail',
        method:'get'
    })
}
