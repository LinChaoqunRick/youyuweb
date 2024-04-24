import http from "@/network/https";
import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGOUT,
  GET_AUTH_ROUTES,
  SEND_EMAIL_CODE,
  ACCOUNT_REGISTER,
  GET_CURRENT_USER,
  GET_CONNECT_URL,
  CONNECT_BIND
} from "@/network/apis";

export default {
  state: () => ({
    showLogin: false,
    user: JSON.parse(localStorage.getItem("user") || "{}"),
    authorId: 10000, // 本站作者id
  }),
  getters: {
    loginPanelStatus(state: any) {
      return state.showLogin;
    },
    isLogin(state: any) {
      return JSON.stringify(state.user) !== "{}";
    },
    userInfo(state: any) {
      return state.user;
    },
    isAuthor(state: any) {
      return state.user.id === state.authorId;
    },
    getAuthorId(state: any) {
      return state.authorId;
    }
  },
  mutations: {
    changeLogin(state: any, status: any) {
      state.showLogin = status;
    },
    changeUser(state: any, user: any) {
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
  },
  actions: {
    token(context: any, params: object) {
      return http.post(ACCOUNT_LOGIN, params, {
        headers: {
          Authorization: "Basic " + btoa("web" + ":" + "654321"),
        },
      });
    },
    logout(context: any, params: object) {
      return http.post(ACCOUNT_LOGOUT, params);
    },
    getAuthRoutes(context: any, params: object) {
      return http.get(GET_AUTH_ROUTES, params);
    },
    sendEmailCode(context: any, params: object) {
      return http.post(SEND_EMAIL_CODE, params);
    },
    register(context: any, params: object) {
      return http.post(ACCOUNT_REGISTER, params);
    },
    getCurrentUser(context: any, params: object) {
      return http.post(GET_CURRENT_USER, params);
    },
    getConnectURL(context: any, params: object) {
      return http.get(GET_CONNECT_URL, params);
    },
    connectBind(context: any, params: object) {
      return http.get(CONNECT_BIND, params);
    },
  },
};
