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
    }
  },
  actions: {}
}

export default mycaseModule
