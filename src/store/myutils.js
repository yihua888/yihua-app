import { getCache, setCache } from '@/utils/cache'
const myutilsModule = {
  namespaced: true,
  state() {
    return {
      utilsinfo: {}
    }
  },
  getters: {},
  mutations: {
    changeUtilsinfo(state, info) {
      state.utilsinfo = info
      setCache('utilsinfo', info)
    }
  },
  actions: {}
}

export default myutilsModule
