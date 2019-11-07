<template>
    <div v-if="dataObj.children && dataObj.children.length && dataObj.showSub">
        <ul>
            <li v-for="(item,index) in dataObj.children"
                @click="show(item,$event)"
                :key="item.name">
                <span class="xing" v-if="item.children&&item.children.length">*</span>{{item.name}}
                <template v-if="item.children&&item.children.length&&item.showSub">
                    <SubList :data-source="item"></SubList>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name:'SubList',//有 name在可以自己调自己
        props:{
            dataSource:{
                type:Object
            }
        },

        data(){
            return {
                dataObj:{},
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
                        if(nv.children&&nv.children.length){
                            if(!this.listLoaded){
                                this.dataObj = nv;
                                this.initList(this.dataObj.children)
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
