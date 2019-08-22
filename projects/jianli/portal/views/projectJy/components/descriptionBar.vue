<template>
    <div class="desBar-box">
        <div>{{des}}</div>
        <div class="desBar-img-box">
            <a href="javascript:void(0)"
               class="des-img-item"
               v-for="(item,index) in imgList">
                <img :src="item">
            </a>
        </div>
    </div>
</template>
<style scoped>
    .desBar-box{}
    .desBar-img-box{display: flex}
    .des-img-item{display:inline-block;border:1px solid #ddd;}
</style>
<script>
    export default {
        props: {
            des: {
                type: String
            },
            imgs: {
                type: String
            }
        },
        data: function () {
            return {
                imgList:[]
            }
        },
        mounted: function () {
            var imgList = this.imgs.split(',')
            this.imgList = imgList.map((img)=>{
                return '/demo/images/'+img
            })
        },

        methods: {}
    }
</script>
