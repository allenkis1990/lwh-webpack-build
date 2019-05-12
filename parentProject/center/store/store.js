import Vue from 'vue'
import Vuex from 'vuex'
import {state} from '@center/store/state'
import {mutations} from '@center/store/mutations'
import {getters} from '@center/store/getters'
import {actions} from '@center/store/actions'



Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})





