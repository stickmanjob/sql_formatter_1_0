import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sqlInputData: '',
    sqlOutputData: ''
  },
  mutations: {
    updateSqlInputData(state, value) {
      state.sqlInputData = value
    },
    updateSqlOutputData(state, value) {
      state.sqlOutputData = value
    }
  },
  actions: {

  }
})