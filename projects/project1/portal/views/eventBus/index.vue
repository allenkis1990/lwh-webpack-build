<template>
    <div>bus
        <a1></a1>
        <a2></a2>
    </div>
</template>

<script>
    //在父亲这边定义一个bus然后自组件间就可以用emit和on通信
    import eventBus from '@portal/utils/eventBus'
    let bus = eventBus()
    import a1 from '@portal/views/eventBus/components/a1.vue'
    import a2 from '@portal/views/eventBus/components/a2.vue'
    export default {
        mounted(){

        },
        components:{
            a1:a1,
            a2:a2
        }
    }
</script>