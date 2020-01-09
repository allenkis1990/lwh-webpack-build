export default function (context, key, createEle) {//context是作用域  key是字段名：loginInput
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
                innerHTML: context.ui.keyName[key] ? `${context.ui.keyName[key]}:` : '用户名:'
            }
        }),
        createEle('input', {
            domProps: {
                type: 'text',
                value: context.formData[key],
                placeholder: context.ui.placeholder[key] || '请输入用户名'
            },
            on: {
                input(e) {
                    let value = e.target.value
                    context.formData[key] = value
                }
            }
        })
    ]
}
