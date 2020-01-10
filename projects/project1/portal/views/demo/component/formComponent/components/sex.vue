<template>
    <span>
        <span class="red" v-if="required">*</span>
        <span>{{keyName}}</span>
        <div class="sex">
            <span @click="clickItem('1')" :class="{'current':formData[property]==='1'}">男</span>
            <span @click="clickItem('2')" :class="{'current':formData[property]==='2'}">女</span>
        </div>
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
                keyName:this.$parent.ui.keyName[this.property] || '性别',
                show:this.$parent.ui.show[this.property],
                required:this.$parent.ui.required[this.property]
            }
        },
        mounted(){

        },
        methods: {
            clickItem(sex){
                this.formData[this.property] = sex
            }
        },
        components:{

        },
        watch:{

        }
    }
</script>
