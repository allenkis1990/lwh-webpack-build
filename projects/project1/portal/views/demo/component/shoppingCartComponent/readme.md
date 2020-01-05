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

