<template>
    <div>a2
    </div>
</template>

<script>
    export default {
        mounted(){
            setTimeout(()=>{
                this.$bus.$emit('haha','哇哈哈哈哈哈')
            },3000)
        }
    }
</script>