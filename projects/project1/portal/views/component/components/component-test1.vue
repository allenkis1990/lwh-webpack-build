<template>
    <div>

        <p>test1组件</p>
        <div><button @click="dataChange()">test1组件内部直接改变对象</button></div>
        <div><button @click="emit()">test1组件内部$emit改变对象</button></div>
        <div>组件内部的data==>:{{innerData.name}}</div>
        <div>组件内部的computedData==>:{{computedData.name}}</div>
    </div>
</template>

<script>

    /**
     * 在组件内部会改变外部传进来的值 包括用computed接的
     */
    export default {
        name:'component-test1',
        activated(){
            //激活
            console.log('激活模式test1');
        },
        deactivated(){
            //激活
            console.log('后台模式test1');
        },
        props:{
            dataSource:{
                type:Object
            }
        },
        watch:{
            dataSource:{
                handler(nv,ov){
                    if(nv){
                        this.innerData = nv;
                    }
                },
                deep:true,
                immediate:true
            }
        },
        data(){
            return {
                innerData:{}
            }
        },
        mounted(){
            console.log('test1组件第一次被加载');
        },
        computed:{
            computedData(){
                return this.dataSource
            }
        },
        methods: {
            dataChange(){
                this.innerData.name = 'test1InnerData'
            },
            emit(){
                this.$emit('dataChange','emitChangeData')
            }
        }
    }
</script>
