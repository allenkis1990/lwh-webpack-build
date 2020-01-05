# sku组件
## 作者：Allen Liu
## demo：

```
import skuList from '@portal/views/demo/component/skuComponent/skuList.vue'
components: {
    skuList
}
```

```
<sku-list :data-source="skuData"
            v-model="skuParams"
          @beforeItemChanged="beforeItemChanged"
          @itemChanged="itemChanged"
          @cancelSelect="cancelSelect"
          @skuLoaded="skuLoaded"
          @beforeClearSelected="beforeClearSelected"
          @clearSelectedBar="clearSelectedBar"
          ref="skuComponent"></sku-list>
```
## 参数
## 1.data-source： (必需) 类型：Array 传进来的数据源，结构：
```
[
    {
        propertyCode:'year',
        propertyCName:'年度',
        propertyId:'sku1'
    },
    {
        propertyCode:'subject',
        propertyCName:'科目',
        propertyId:'sku2'
    },
    {
        propertyCode:'area',
        propertyCName:'地区',
        propertyId:'sku3'
    }
]
```


## 2.@beforeItemChanged (非必需) 类型：Function 选择sku之前促发，入参是
### (1).当前选择的item对象
### (2).next方法，需要手动调用才能触发@itemChanged事件否则不触发
## 3.@itemChanged  (非必需) 类型：Function 选择sku的时候促发，入参是当前选择的item对象

## 4.@cancelSelect (非必需) 类型：Function 取消选择的时候促发，入参是当前取消选择的item对象

## 5.@beforeClearSelected (非必需) 类型：Function 清空已选SKU之前触发，入参是
### (1).已经选择的SKU数组
### (2).next方法，需要手动调用才能触发@clearSelectedBar事件否则不触发

## 6.@clearSelectedBar (非必需) 类型：Function 清空已选SKU后触发

## 7.@skuLoaded (非必需) 类型：Function sku组件就绪后促发，只促发一次

## 8.v-model：(必需) 类型：Array 最终输出的结果，结构

```
[
    {
        propertyCode:'year',
        value:'skuItem002',
        valueCode:'2019',
        valueName:'2019'
    },
    {
        propertyCode:'area',
        value:'skuItem103',
        valueCode:'quanzhou',
        valueName:'泉州'
    }
]
```

## 9.插槽里的内容会被插入到已选筛选条件后面，(目前就只支持default插槽)显示或者删除逻辑可自行控制，例子：
```
<sku-list :data-source="skuData"
          ref="skuComponent"
          v-model="skuParams">

        <template #default>
            <li style="margin-right:10px"
                class="skuSelectedItem fl">
                爱好:
                <button class="btn current">运动</button>
            </li>
        </template>

</sku-list>
```



## 如果需要回显，需要在@skuLoaded事件里手动给v-model赋值，结构必须和组件输出的结果一样



## 组件内的方法通过refs暴露给组件外使用的方法：

## 1.showItem 类型 Function 显示指定的sku项，入参是需要显示的propertyCode 例子：

```
var skuListComponent = this.$refs.skuComponent
skuListComponent.showItem('year')
```

## 2.hideItem 类型 Function 隐藏指定的sku项，入参是需要隐藏的propertyCode 例子：
```
var skuListComponent = this.$refs.skuComponent
skuListComponent.hideItem('year')
```

## 3.setItemValue 类型 Function 手动设置指定sku项的值，入参是 propertyCode,value,valueCode,valueName   例子：
```
var skuListComponent = this.$refs.skuComponent
skuListComponent.setItemValue('year','xxxx','2018','2018'){
```
