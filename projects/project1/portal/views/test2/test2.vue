<template>
  <div>{{name}}<br>
    {{json.data}}
  </div>
</template>

<script>
export default {
    data(){
        return {
            name:'test2~~',
            json:''
        }
    },
    mounted(){
        let a = require('@portal/static/jsonData.json')
        this.json = a
    }
}
</script>

<style>
</style>
