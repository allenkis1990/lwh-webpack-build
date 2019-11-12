<template>
    <div>
        router
        <button @click="fn">参数不同就在这页面</button>
    </div>
</template>

<script>
    export default {
        beforeRouteUpdate(to,form,next){
            console.log('路由参数改变');
            next()
        },
        beforeRouteLeave(to,form,next){
            //可拿到this
            console.log(this,'leave this');
            console.log(to,'leave');
            next()
        },
        beforeRouteEnter(to,form,next){
            //拿不到this
            console.log(this,'enter this');
            console.log(form,'enter');
            next(function(context){
                //外面拿不到this，next的回调里可拿到
                console.log(context,'context');
            })
        },
        mounted() {

        },
        methods: {
            fn(){
                this.$router.push({
                    name:'router',
                    query:{
                        t:new Date().getTime()
                    }
                })
            }
        },
        data(){
            return {
                lwh:'lwh'
            }
        }
    }
</script>
