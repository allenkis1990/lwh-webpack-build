<template>
    <div>
        请输入英文：<input type="text"
                     :value="value"
                     @input="fn($event)">
    </div>
</template>

<script>

    export default {
        props:{
            value:{
                type:String
            }
        },
        model:{

        },
        data(){
            return {

            }
        },
        mounted(){

        },
        methods: {
            fn(e){
                this.$emit('input', e.target.value)
            }
        }
    }
</script>
