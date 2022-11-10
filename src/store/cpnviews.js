import { getCache, setCache } from '@/utils/cache'
const cpnModule = {
  namespaced: true,
  state() {
    return {
      cpnInfo: {}
    }
  },
  getters: {},
  mutations: {
    changeCpnInfo(state, info) {
      state.cpnInfo = info
      setCache('cpnInfo', info)
    }
  },
  actions: {}
}

export default cpnModule
