<template>
    <div>a1
    </div>
</template>

<script>
    export default {
        mounted(){
            this.$bus.$on('haha',function(data){
                console.log('bus输出!!!!!====>',data);
            })
        }
    }
</script>