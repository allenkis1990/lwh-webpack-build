<template>
    <div>
      <Fk></Fk>
    </div>
</template>

<script>
    import {Fk} from '@portal/selfPlugins/demo1/index'

    export default {
        data(){
            return {

            }
        },
        components:{
            Fk
        },
        mounted(){
            console.log(this.ojbk,'000');
        },
        methods: {

        }
    }
</script>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
<!--scoped-->
