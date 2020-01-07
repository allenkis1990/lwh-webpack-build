export default function (context, key, createEle) {//context是作用域  key是字段名：loginInput
    function getOptions(name,sex){
        return {
            domProps:{
                innerHTML:name
            },
            class:{
                current:context.registInfo[key]===sex
            },
            on:{
                click(){
                    context.registInfo[key] = sex
                }
            }
        }
    }
    return [
        //*号
        createEle('span', {
            class: {
                hide: !context.ui.required[key],
                red: true
            },
            domProps: {
                innerHTML: '*'
            }
        }),
        //key的中文名
        createEle('span', {
            domProps: {
                innerHTML: context.ui.keyName[key] ? `${context.ui.keyName[key]}:` : '性别:'
            }
        }),
        createEle('div', {
            class:{
                sex:true
            }
            /*on: {
                input(e) {
                    let value = e.target.value
                    context.registInfo[key] = value
                }
            }*/
        },[
            createEle('span',getOptions('男','1')),
            createEle('span',getOptions('女','2'))
        ])
    ]
}
