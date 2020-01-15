/**
 * Created by Allen Liu on 2019/11/28.
 */
import instance from '@portal/utils/ajaxRequest'

var $http = instance.create({
    baseURL: '/actions'
})


export const getSkuDetailApi = function(){
    return $http.request({
        url:'/getSkuDetail',
        method:'get'
    })
}
export const getSkuItemArrApi = function(params){
    return $http.request({
        url:'/getSkuItemArr',
        method:'post',
        data:params
    })
}

export const getShoppingCartListApi = function(params){
    return $http.request({
        url:'/getShoppingCartList',
        method:'get'
    })
}
