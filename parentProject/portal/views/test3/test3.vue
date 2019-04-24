<template>
    <div>
        <test :list="arr"></test>

        <hr>
        <fuck :list="arr"></fuck>
    </div>
</template>

<script>
    export default {
        created(){
            setTimeout(()=>{
                this.arr = [{name:'allen'},{name:'jack'},{name:'tom'}]
            })
        },
        data(){
           return {
               arr:[]
           }
        },
        methods:{
            fn:function(){
            }
        },
        components:{
            test:{
                data(){
                    return {
                    }
                },
                template:'<div><div v-for="(item,index) in list" v-text="item.name"></div><button @click="pop()">pop</button></div>',
                props:{
                    list:{
                        type:Array
                    }
                },
                methods:{
                    pop:function(){
                        this.list.pop()
                        console.log(this.list,123);
                    }
                },
                mounted(){
//                    console.log(this.list);
                }
            },
            fuck:{
                data(){
                    return {
                    }
                },
                template:'<div><div v-for="(item,index) in list" v-text="item.name"></div></div>',
                props:{
                    list:{
                        type:Array
                    }
                },
                methods:{
                }
            }
        }
    }
</script>

<style>
</style>
