<template>
    <!--如果非inheritAttrs:false  组件标签元素上的attr会加到div上 如果加了inheritAttrs:false 组件标签元素上的attrs就没了 -->
    <div>
        <button v-on="$listeners" v-bind="$attrs">点我</button>
        <!--<button>点我</button>-->
    </div>
</template>

<script>
    export default {
        //为false的时候
        inheritAttrs:false,
        data(){
            return {

            }
        },
        mounted(){
        },
        methods: {

        },
        components:{

        }
    }
</script>
<style>

</style>
<!--scoped-->
