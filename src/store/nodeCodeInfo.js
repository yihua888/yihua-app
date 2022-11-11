import { getCache, setCache } from '@/utils/cache'
const nodeCodeModule = {
  namespaced: true,
  state() {
    return {
        nodeCodeInfo: {}
    }
  },
  getters: {},
  mutations: {
    changeNodeCodeInfo(state, info) {
      state.nodeCodeInfo = info
      setCache('nodeCodeInfo', info)
    }
  },
  actions: {}
}

export default nodeCodeModule
