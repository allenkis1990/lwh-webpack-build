/**
 * Created by Allen Liu on 2019/11/20.
 */
import fk from './components/fk/index.vue'
import Routers from './routers/index.js'
import Stores from './store/modules.js'

class Demo1{
    constructor(){

    }
    install(Vue,options){
        Vue.prototype.ojbk = 'ojbk!!!!'
        console.log(options);
    }
}

var demo1 = new Demo1()

export const demo1Plugin = demo1
export const demo1PluginComponents = {
    fk
}
export const demo1PluginRouters = Routers
export const demo1PluginStores = Stores