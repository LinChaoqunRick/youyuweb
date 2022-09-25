export default {
  state: () => ({
    showLogin: true
  }),
  mutations: {
    changeLogin(state: any, status: boolean) {
      state.showLogin = status;
    }
  },
  actions: {},
  getters: {
    loginPanelStatus(state: any) {
      return state.showLogin;
    }
  }
}
