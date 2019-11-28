/**
 * Created by Allen Liu on 2019/11/28.
 */
import instance from '@portal/utils/ajaxRequest'

var $http = instance.create({
    baseURL: '/global'
})

export const getUserInfoApi = function(){
    return $http.request({
        url:'/getUserInfo',
        method:'get',
        headers:{
            lll:'123'
        }
    })
}
export const getErrApi = function(){
    return $http.request({
        url:'/err',
        method:'get'
    })
}