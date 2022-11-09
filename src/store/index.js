import { createStore } from 'vuex'

import login from './login'

const store = createStore({
  state() {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
  login}
})

export function setupStore () {
  store.dispatch('login/loadLocalLogin')
}

export default store
