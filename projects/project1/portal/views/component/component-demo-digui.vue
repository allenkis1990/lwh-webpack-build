<template>
    <div>

        <List :data-source="list">
            <template #sub="{subData}">
                <SubList :data-source="subData"></SubList>
            </template>
        </List>

    </div>
</template>

<script>

    //递归列表组件
    import List from '@portal/views/component/components/component-list.vue'
    import SubList from '@portal/views/component/components/component-subList.vue'
    export default {
        data(){
            return {
                list:[
                    {
                        name: 'allen',
                        children: [
                            {
                                name:'allen-1',
                                children:[
                                    {name:'allen-1-1'},
                                    {
                                        name:'allen-1-2',
                                        children:[
                                            {name:'allen-1-2-1'},
                                            {name:'allen-1-2-2'}
                                        ]
                                    }
                                ]
                            },
                            {name:'allen-2'}
                        ]
                    },
                    {
                        name: 'jack'
                    },
                    {
                        name: 'tom',
                        children: [
                            {
                                name:'allen-1',
                                children:[
                                    {name:'allen-1-1'},
                                    {
                                        name:'allen-1-2',
                                        children:[
                                            {name:'allen-1-2-1'},
                                            {name:'allen-1-2-2'}
                                        ]
                                    }
                                ]
                            },
                            {name:'allen-2'}
                        ]
                    }
                ]
            }
        },
        mounted(){

        },
        methods: {

        },
        components:{
            List,
            SubList
        }
    }
</script>
<style>
    *{list-style-type: none}
    .xing{color:red;vertical-align:-7px;font-size:26px;font-weight:bold}
</style>
<style>
    body, html {
        width: 100%;
        height: 100%;
    }
</style>
