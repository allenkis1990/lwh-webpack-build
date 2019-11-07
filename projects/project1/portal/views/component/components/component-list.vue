<template>
    <div>
        <ul>
            <li v-for="(item,index) in list"
                @click="show(item,$event)"
                :key="item.name">
                <span class="xing" v-if="item.children&&item.children.length">*</span>{{item.name}}
                <slot name="sub" :subData="item"></slot>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        props:{
            dataSource:{
                type:Array
            }
        },

        data(){
            return {
                list:[],
                listLoaded:false
            }
        },
        mounted(){

        },
        methods: {
            show(item,e){
                e.stopPropagation()
                item.showSub = !item.showSub
//                console.log(item);
            },
            initList(arr){
                let _this = this
                arr.forEach(function(item){
                    _this.$set(item,'showSub',false)
                })
            }
        },
        watch:{
            dataSource:{
                handler(nv,ov){
                    if(nv){
                        if(nv.length){
                            if(!this.listLoaded){
                                console.log(nv,99);
                                this.list = nv;
                                this.initList(this.list)
                                this.listLoaded = true
                            }
                        }
                    }
                },
//                deep:true,
                immediate:true
            }
        }
    }
</script>
