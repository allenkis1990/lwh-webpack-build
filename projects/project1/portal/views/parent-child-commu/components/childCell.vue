<template>
    <div>
        name:{{item.name}} - age:{{item.age}}
    </div>
</template>

<script>
    export default {
        props:{
            item:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        data(){
            return {
                haha:'我是child的data数据'
            }
        },
        mounted(){
//            console.log(this.item);
            console.log(this.$parent,'parent对象');
        },
        methods: {

        }
    }
</script>
<style>

</style>
<!--scoped-->
