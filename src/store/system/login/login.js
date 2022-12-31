import http from "@/network/https";
import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGOUT
} from "@/network/apis";

export default {
  state: () => ({
    showLogin: false,
    user: JSON.parse(localStorage.getItem("user")) || {},
  }),
  mutations: {
    changeLogin(state, status) {
      state.showLogin = status;
    },
    changeUser(state, user) {
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    }
  },
  getters: {
    loginPanelStatus(state) {
      return state.showLogin;
    },
    isLogin(state) {
      return JSON.stringify(state.user) !== '{}'
    },
    userInfo(state) {
      return state.user;
    }
  },
  actions: {
    accountLogin(state, params) {
      return http.post(ACCOUNT_LOGIN, params);
    },
    logout(state, params) {
      return http.post(ACCOUNT_LOGOUT, params);
    },
  },
}
