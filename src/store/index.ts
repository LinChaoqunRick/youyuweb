import {createStore} from 'vuex';

import theme from "@/store/system/theme/theme";
import login from "@/store/system/login/login";
import message from "@/store/system/messae/message";
import search from "@/store/system/search";
import post from "@/store/post/post";
import user from "@/store/user/user";
import note from "@/store/note/note";
import moment from "@/store/moment";
import lab from "@/store/lab";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {}
  },
  mutations: {},

  modules: {
    theme,
    login,
    message,
    search,
    post,
    user,
    note,
    moment,
    lab
  }
})

export default store;
