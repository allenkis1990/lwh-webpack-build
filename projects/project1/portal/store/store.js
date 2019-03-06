import Vue from 'vue'
import Vuex from 'vuex'
import {state} from '@portal/store/state'
import {mutations} from '@portal/store/mutations'
import {getters} from '@portal/store/getters'
import {actions} from '@portal/store/actions'



Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})





