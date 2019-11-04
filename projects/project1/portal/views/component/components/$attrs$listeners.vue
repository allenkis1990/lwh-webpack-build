<template>
    <div>
        hahahahah
        <a1 v-bind="$attrs" v-on="$listeners"></a1>
    </div>
</template>

<script>

    //如果非inheritAttrs:false  组件标签元素上的attr会加到div上 如果加了inheritAttrs:false 组件标签元素上的attrs就没了
    export default {
        inheritAttrs:false,
        components:{
            a1:{
                template:'<div>a1-component--{{dataSource}}<button @click="fn()">btn</button></div>',
                props:{
                    dataSource:{
                        type:Object
                    }
                },
                methods: {
                    fn(){
                        this.$emit('say')
                    }
                }
            }
        },

        data(){
            return {
            }
        },
        mounted(){
            console.log(this.$attrs,1);
            console.log(this.$listeners,2);
        }
    }
</script>
