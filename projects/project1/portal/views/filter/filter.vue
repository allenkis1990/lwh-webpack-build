<template>
    <div>
      <ul>
          <li>价格：{{money | moneyFilter}}</li>
          <li>过滤HTML片段：{{htmlContent | filterHtmlTag}}</li>
          <li>多过滤：{{content | filterMultipart(/\$/g) | filterMultipart(/\*/g)}}</li>
      </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                money:'666',
                htmlContent:'<div>hello<span> Allen!!</span></div>',
                content:'$$$我是内容****'
            }
        },
        mounted(){
        },
        methods: {

        },
        filters:{
            moneyFilter(value){
                return '￥'+value
            },
            //过滤HTML标签
            filterHtmlTag(value){
                var htmlTagReg = /<\/?.+?>/g
                return value.replace(htmlTagReg,'')
            },
            //多过滤并且传参
            filterMultipart(value,regOrStr){
                return value.replace(regOrStr,'')
            }
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
<!--scoped-->
<style lang="less" scoped>
    @import "~@portal/less/onlyPortal.less";
</style>
