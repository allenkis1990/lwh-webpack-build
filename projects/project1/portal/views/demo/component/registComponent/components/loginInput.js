export default function(context){
    return {
        class:{
            hide:context.ui.loginInput
        },
        domProps: {
            innerHTML: 'loginInput'
        },
        on:{
            click(){
                // console.log(context.da);
            }
        }
    }
}
