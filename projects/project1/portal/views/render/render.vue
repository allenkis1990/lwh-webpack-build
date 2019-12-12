<template>
    <div>
        <fuck></fuck>
        <shit></shit>
        <haha>
            <template v-slot:s1>s1</template>
            <template v-slot:s2>s2</template>
            <!--<div slot="s1">s1</div>
            <div slot="s2">s2</div>-->
        </haha>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        mounted(){
        },
        components:{
            fuck:{
                render(createEle){
                    let _this = this
                    return createEle('input',{
                        //扩展的属性
                        attrs:{
//                            class:'a b'
                        },
                        class:{
                            haha:true,
                            a:true,
                            b:true
                        },
                        style:{
                            color:'red'
                        },
                        //dom上原有的属性
                        domProps:{
//                            innerHTML:'fuck!!!'
                            value:_this.ddd,
                            name:'lwh'
                        },
                        //原生事件
                        on:{
//                            click(){
//                                alert(_this.ddd)
//                            },
                            input(e){
                                _this.ddd = e.target.value
                            }
                        }
                    })
                },
                data(){
                    return {
                        ddd:'fuck hoho~~~'
                    }
                }
            },


            shit:{
                render(createEle){
                    let _this = this
                    return createEle('div',{
                        //dom上原有的属性
                    },[
                        createEle('p',
                            {
                                domProps:{innerHTML:'child1'},
                                on:{
                                    click(){
                                        console.log(_this.da);
                                    }
                                }
                            }
                        ),
                        createEle('span',
                            {
                                domProps:{innerHTML:'child2'},
                                on:{
                                    click(){
                                        console.log(_this.da);
                                    }
                                }
                            }
                        )
                    ])
                },
                data(){
                    return {
                        da:'shit!!! gaga~~~'
                    }
                }
            },

            haha:{
                render(createEle){
                    let s1 = this.$slots.s1
                    let s2 = this.$slots.s2
                    return createEle('div',{
                        //dom上原有的属性
                    },[
                        createEle('p',s1),
                        createEle('p',s2)
                    ])
                },
                data(){
                    return {
                        da:'shit!!! gaga~~~'
                    }
                }
            }
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
