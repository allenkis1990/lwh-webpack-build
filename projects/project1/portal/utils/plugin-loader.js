/**
 * Created by Allen Liu on 2019/11/22.
 */
import {demo1Plugin,demo1PluginComponents,demo1PluginRouters,demo1PluginStores} from '@portal/selfPlugins/demo1/index'
export default function(Vue){
    Vue.use(demo1Plugin)
}
//模块多了后一个个合并进来
export const Routers = [...demo1PluginRouters]
export const Stores = {...demo1PluginStores}