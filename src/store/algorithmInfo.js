import { getCache, setCache } from '@/utils/cache'
const algorithmModule = {
  namespaced: true,
  state() {
    return {
      algorithmInfo: {}
    }
  },
  getters: {},
  mutations: {
    changeAlgorithmInfo(state, info) {
      state.algorithmInfo = info
      setCache('algorithmInfo', info)
    }
  },
  actions: {}
}

export default algorithmModule
