/**
 * Created by admin on 2019/5/30.
 */
export default function(context){
    return {
        template:'按钮：<button @click="clickMe()">{{btnValue}}</button>',
        data:{
            btnValue:'点我点我'
        },
        methods:{
            clickMe(){
                context.fuck = '66666'
            }
        },
        mounted(){
            console.log('弹窗被挂载');
        }
    }
}