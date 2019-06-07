<template>
    <div>
        <div>默认插槽：<slot :student="student"><!--这里可以放一个值，没传的slot的时候会默认显示--></slot></div>
        <div>a1插槽：<slot name="a1" :teacher="teacher"></slot></div>
        <div>缩写插槽：<slot name="sx" :sx="sx"></slot></div>
        <div>parent插槽：<slot name="parent"></slot></div>
    </div>
</template>

<script>

    export default {
        props:{

        },

        data(){
            return {
                student:{
                    name:'allen'
                },
                teacher:{
                    name:'tom'
                },
                sx:{
                    name:'缩写'
                }
            }
        },
        mounted(){

        },
        methods: {

        }
    }
</script>
