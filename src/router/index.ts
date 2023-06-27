import {createRouter, createWebHistory} from 'vue-router';
import whiteList from "./whiteList";
import {generateAuthRoutes} from "@/router/config/useGenerateRoutes";
import Cookies from "js-cookie";
import store from "@/store";
import {computed} from "vue";
import {message} from "ant-design-vue";

const isLogin = computed(() => store.getters['isLogin']);


/**
 * fix: #12
 * 1. 如果token存在，则更新用户数据。
 * 2. 如果token不存在
 *   2.1 如果用户数据存在，清空用户数据并提示过期
 *   2.2 如果用户数据不存在，用户信息设置为初始值
 */
const checkTokenValid = async () => {
  const token = Cookies.get("token");
  if (token) {
    store.dispatch('getCurrentUser').then(res => {
      store.commit("changeUser", res.data);
    })
  } else {
    if (isLogin.value) {
      message.warning('登录凭证已过期，请重新登录！');
      store.commit("changeUser", {});
      setTimeout(() => {
        location.reload();
      }, 1500)
    } else {
      store.commit("changeUser", {});
    }
  }
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...whiteList,
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {top: 0}
    // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { top: 0 }
    // }
  },
})

let isInit = false;
router.beforeEach(async (to, from, next) => {
  if (!isInit) {
    await checkTokenValid();
    await generateAuthRoutes();
    next({...to});
  } else {
    next();
  }
  isInit = true;
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = <string>title;
  }
  next();
})

router.afterEach((to, from): any => {
  // document.title = <string>to.meta.title;
})

export default router
