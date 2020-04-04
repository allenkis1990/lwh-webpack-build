<template>
    <div>
        请选择性别：<button :class="{'current':valueData.current==='1'}"
                            @click="changeSex($event,'1')">男</button>
                    <button :class="{'current':valueData.current==='2'}"
                            @click="changeSex($event,'2')">女</button>
    </div>
</template>
<style scoped>
    .current{
        background:red;
        color:#fff;
    }
</style>
<script>

    /**
     * 在组件内部会改变外部传进来的值 包括用computed接的
     */
    export default {
        props:{
            valueData:{
                type:Object
            }
        },
        //初始是value和input，改成了prop=>valueData  event=>change-sex
        model:{
            event:'change-sex',
            prop:'valueData'
        },
        data(){
            return {
            }
        },
        computed:{

        },
        mounted(){
        },
        methods: {
            changeSex(e,sex){
                e.preventDefault()
                this.$emit('change-sex',{current:sex})
            }
        }
    }
</script>
