/**
 * Created by Allen Liu on 2020/1/19.
 */
import Vue from 'vue'
export default function(){
    Vue.prototype.$bus = new Vue()
    return Vue
}