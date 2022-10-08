import {createStore} from 'vuex';

import theme from "@/store/system/theme/theme";
import login from "@/store/system/login/login";
import article from "@/store/article/article";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {}
  },
  mutations: {},

  modules: {
    theme,
    login,
    article
  }
})

export default store;
