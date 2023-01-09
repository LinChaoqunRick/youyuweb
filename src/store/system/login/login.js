import http from "@/network/https";
import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGOUT,
  GET_AUTH_ROUTES,
  GET_REGISTER_CODE,
  ACCOUNT_REGISTER
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
      return http.post(ACCOUNT_LOGIN, params, {headers: {'content-type': "application/json"}});
    },
    logout(state, params) {
      return http.post(ACCOUNT_LOGOUT, params);
    },
    getAuthRoutes(state, params) {
      return http.get(GET_AUTH_ROUTES, params);
    },
    getRegisterCode(state, params) {
      return http.post(GET_REGISTER_CODE, params, {headers: {'content-type': "application/json"}});
    },
    register(state, params) {
      return http.post(ACCOUNT_REGISTER, params, {headers: {'content-type': "application/json"}});
    },

  },
}
