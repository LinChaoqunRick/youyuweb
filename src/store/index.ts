import {createStore} from 'vuex';

import theme from "@/store/system/theme/theme";
import login from "@/store/system/login/login";
import post from "@/store/post/post";
import user from "@/store/user/user";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {}
  },
  mutations: {},

  modules: {
    theme,
    login,
    post,
    user
  }
})

export default store;