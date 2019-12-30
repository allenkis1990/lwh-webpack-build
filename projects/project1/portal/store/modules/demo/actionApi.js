/**
 * Created by Allen Liu on 2019/11/28.
 */
import instance from '@portal/utils/ajaxRequest'

var base1 = instance.create({
    baseURL: 'http://127.0.0.1:8989/sku'
})
var base2 = instance.create({
    baseURL: 'http://127.0.0.1:8989/shoppingCart'
})

export const getSkuDetailApi = function(){
    return base1.request({
        url:'/getSkuDetail',
        method:'get'
    })
}
export const getSkuItemArrApi = function(params){
    return base1.request({
        url:'/getSkuItemArr',
        method:'post',
        data:params
    })
}

export const getShoppingCartListApi = function(params){
    return base2.request({
        url:'/getShoppingCartList',
        method:'get'
    })
}