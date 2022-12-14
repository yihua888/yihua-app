import { createStore } from 'vuex'

import login from './login'
import cpnModule from './cpnviews'
import mycaseModule from './mycase'
import myutilsModule from './myutils'
import nodeCodeModule from './nodeCodeInfo'
import algorithmModule from './algorithmInfo'

const store = createStore({
  state() {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    cpnModule,
    mycaseModule,
    myutilsModule,
    nodeCodeModule,
    algorithmModule,
  login}
})

export function setupStore () {
  store.dispatch('login/loadLocalLogin')
}

export default store
