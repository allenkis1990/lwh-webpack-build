<template>
    <div>
        <parent-cell>
            <template #childCell="{childItem}">
                <child-cell :item="childItem"></child-cell>
            </template>
        </parent-cell>
    </div>
</template>

<script>
    import parentCell from '@portal/views/parent-child-commu/components/parentCell.vue'
    import childCell from '@portal/views/parent-child-commu/components/childCell.vue'
    export default {
        data(){
            return {

            }
        },
        mounted(){
        },
        methods: {

        },
        components:{
            parentCell,
            childCell
        }
    }
</script>
<style>

</style>
<!--scoped-->
