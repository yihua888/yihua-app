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
    }
  },
  actions: {}
}

export default cpnModule
