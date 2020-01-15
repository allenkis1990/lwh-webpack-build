<template>
    <span>
        <span class="red" v-if="required">*</span>
        <span>{{keyName}}</span>
        <input type="text"
               :placeholder="placeholder"
               v-model="formData[property]">
    </span>
</template>

<script>
    export default {
        props:{
            property:{
                type:String
            }
        },
        data(){
            return {
                formData:this.$parent.formData,
                keyName:this.$parent.ui.keyName[this.property] || '姓名',
                placeholder:this.$parent.ui.placeholder[this.property] || '请输入姓名',
                show:this.$parent.ui.show[this.property],
                required:this.$parent.ui.required[this.property]
            }
        },
        mounted(){

        },
        methods: {

        },
        components:{

        },
        watch:{

        }
    }
</script>
