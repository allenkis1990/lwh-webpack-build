import {getSkuDetailApi,getSkuItemArrApi} from '@portal/store/modules/demo/actionApi'
export const actions = {
    getSkuDetail: function (context) {
        return new Promise((resolve,reject)=>{
            getSkuDetailApi().then(function (data) {
                let res = data.data
                if(res.code==200){
                    resolve(res)
                }else{
                    reject()
                }
            })
        })
    },
    getSkuItemArr: function (context,params) {
        return new Promise((resolve,reject)=>{
            getSkuItemArrApi(params).then(function (data) {
                let res = data.data
                if(res.code==200){
                    resolve(res)
                }else{
                    reject()
                }
            })
        })
    }
}
