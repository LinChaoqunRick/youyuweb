import http from "@/network/https";
import {
  ACCOUNT_LOGIN,
  TELEPHONE_LOGIN,
  ACCOUNT_LOGOUT,
  GET_AUTH_ROUTES,
  SEND_EMAIL_CODE,
  ACCOUNT_REGISTER,
  GET_CURRENT_USER
} from "@/network/apis";

export default {
  state: () => ({
    showLogin: false,
    user: JSON.parse(localStorage.getItem("user")) || {},
    authorId: 10000, // 本站作者id
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
    },
    isAuthor(state) {
      return state.user.id === state.authorId;
    }
  },
  actions: {
    accountLogin(state, params) {
      return http.post(ACCOUNT_LOGIN, params);
    },
    telephoneLogin(state, params) {
      return http.post(TELEPHONE_LOGIN, params);
    },
    logout(state, params) {
      return http.post(ACCOUNT_LOGOUT, params);
    },
    getAuthRoutes(state, params) {
      return http.get(GET_AUTH_ROUTES, params);
    },
    sendEmailCode(state, params) {
      return http.post(SEND_EMAIL_CODE, params);
    },
    register(state, params) {
      return http.post(ACCOUNT_REGISTER, params);
    },
    getCurrentUser(state, params) {
      return http.post(GET_CURRENT_USER, params);
    },
  },
}
