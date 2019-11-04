<template>
    <div>
        <ul>
            <li v-for="(item,index) in list">
                <slot name="childCell" :childItem="item"></slot>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                list:[
                    {name:'allen',age:18},
                    {name:'jack',age:20},
                    {name:'tom',age:22}
                ]
            }
        },
        mounted(){
            console.log(this.$children,'children对象');
        },
        methods: {

        }
    }
</script>
<style>

</style>
<!--scoped-->
