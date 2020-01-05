# 购物车组件
## 作者：Allen Liu
## demo：

```
import shoppingCart from '@portal/views/demo/component/shoppingCartComponent/shoppingCart.vue'
components: {
    shoppingCart
}
```

```
<shopping-cart :data-source="shoppingCartList"
               ref="shoppingCartList"
               @beforeSelectOneUnit="beforeSelectOneUnit"
               @selectOneUnit="selectOneUnit"
               @beforeSelectItem="beforeSelectItem"
               @selectItem="selectItem"
               @beforeDeleteItem="beforeDeleteItem"
               @deleteItem="deleteItem"
               @beforeSelectAll="beforeSelectAll"
               @selectAll="selectAll"
               @beforeBatchDelete="beforeBatchDelete"
               @batchDelete="batchDelete"
               @beforeGoPay="beforeGoPay"
               @goPay="goPay"></shopping-cart>
```
## 参数
## 1.data-source： (必需) 类型：Array 传进来的数据源，结构：
```
[
        {
            name: 'Allen体育用品店',
            id:'ty',
            subList: [
                {
                    parentId:'ty',
                    id:'zuqiu',
                    name: '足球',
                    price:80
                },
                {
                    parentId:'ty',
                    id:'paobuxie',
                    name: '跑步鞋',
                    price:190
                },
                {
                    parentId:'ty',
                    id:'yongjing',
                    name: '泳镜',
                    price:25
                }
            ]
        }
    ]
```

## 2.@beforeSelectItem (非必需) 类型：Function 勾选单个商品之前促发，入参是
### (1).当前勾选的商品item对象
### (2).当前勾选的类别item对象
### (3).next方法，需要手动调用才能触发@selectItem事件否则不触发


## 3.@selectItem (非必需) 类型：Function 勾选单个商品之时促发，入参是
### (1).当前勾选的商品item对象
### (2).当前勾选的类别item对象


## 4.@beforeSelectOneUnit (非必需) 类型：Function 勾选一个分类前促发，入参是
### (1).当前勾选的分类item对象
### (2).next方法，需要手动调用才能触发@selectOneUnit事件否则不触发


## 5.@selectOneUnit (非必需) 类型：Function 勾选一个分类时促发，入参是
### (1).当前勾选的分类item对象


## 6.@beforeDeleteItem (非必需) 类型：Function 删除一个商品前促发，入参是
### (1).当前删除的商品item对象
### (2).next方法，需要手动调用才能触发@deleteItem事件否则不触发


## 7.@deleteItem (非必需) 类型：Function 删除一个商品时促发，入参是
### (1).当前删除的商品item对象

## 8.@beforeSelectAll (非必需) 类型：Function 选择全部商品之前触发，入参是
### (1).next方法，需要手动调用才能触发@selectAll事件否则不触发

## 9.@selectAll (非必需) 类型：Function 选择全部商品时触发

## 10.@beforeBatchDelete (非必需) 类型：Function 批量删除商品之前触发，入参是
### (1).next方法，需要手动调用才能触发@batchDelete事件否则不触发

## 11.@batchDelete (非必需) 类型：Function 批量删除商品时触发

## 12.@beforeGoPay (非必需) 类型：Function 去结算之前触发，入参是
### (1).next方法，需要手动调用才能触发@goPay事件否则不触发

## 13.@goPay (非必需) 类型：Function 去结算时触发



## 组件内的方法通过refs暴露给组件外使用的方法：

## 1.getPayParams 类型 Function 获取当前购物车结算提交的数据：

```
let shoppingCartListComponent = this.$refs.shoppingCartList
let result = shoppingCartListComponent.getPayParams()
console.log('购物车提交的数据======>',result);
```