/**
 * Created by Allen Liu on 2019/11/20.
 */
import fk from './components/fk/index.vue'

class Demo1{
    constructor(){

    }
    install(Vue){
        Vue.prototype.ojbk = 'ojbk!!!!'
    }
}

var demo1 = new Demo1()

export default demo1
export const Fk = fk