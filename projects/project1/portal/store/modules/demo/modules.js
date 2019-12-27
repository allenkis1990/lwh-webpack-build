import {state} from '@portal/store/modules/demo/state'
import {getters} from '@portal/store/modules/demo/getters'
import {mutations} from '@portal/store/modules/demo/mutations'
import {actions} from '@portal/store/modules/demo/actions'

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
