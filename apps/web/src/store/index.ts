import { createStore } from 'vuex';

import album from '@/store/album';
import lab from '@/store/lab';
import link from '@/store/link';
import moment from '@/store/moment';
import note from '@/store/note/note';
import post from '@/store/post/post';
import login from '@/store/system/login/login';
import message from '@/store/system/messae/message';
import search from '@/store/system/search';
import theme from '@/store/system/theme/theme';
import user from '@/store/user/user';

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {};
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
    lab,
    album,
    link,
  },
});

export default store;
