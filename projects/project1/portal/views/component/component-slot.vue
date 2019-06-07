<template>
    <div>
        <test1>
            <template #default="{student}">hello {{student.name}}</template>
            <template v-slot:a1="{teacher}">hello {{teacher.name}}</template>
            <template #sx="{sx}">hello {{sx.name}}</template>
            <template v-slot:parent>hello {{parent.name}}</template>
        </test1>
    </div>
</template>

<script>

    /**
     * a1是插槽名称
     * student,teacher是test指令里的作用域
     * parent是指令外的作用域
     * 参考：https://cn.vuejs.org/v2/guide/components-slots.html
     */
    import test1 from '@portal/views/component/components/component-slot1.vue'
    export default {
        data(){
            return {
                parent:{name:'parent'}
            }
        },
        mounted(){
        },
        methods: {

        },
        components:{
            test1
        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
