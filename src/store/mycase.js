import { getCache, setCache } from '@/utils/cache'
const mycaseModule = {
  namespaced: true,
  state() {
    return {
      caseinfo: {}
    }
  },
  getters: {},
  mutations: {
    changeCaseinfo(state, info) {
      state.caseinfo = info
      setCache('caseinfo', info)
    }
  },
  actions: {}
}

export default mycaseModule
