import {createStore} from 'vuex';

import theme from "@/store/system/theme/theme";
import login from "@/store/system/login/login";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {}
  },
  mutations: {},

  modules: {
    theme,
    login
  }
})

export default store;
