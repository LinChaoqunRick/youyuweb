import { computed } from 'vue';
import { message } from 'ant-design-vue';
import NProgress from 'nprogress';
import { createRouter, createWebHistory } from 'vue-router';
import 'nprogress/nprogress.css';

import { executeConnect, isConnectRoute } from '@/router/config/connect';
import { generateAuthRoutes } from '@/router/config/useGenerateRoutes';
import store from '@/store';
import { RouteStatus } from '@/store/system/login/login';
import whiteList from './whiteList';

const isLogin = computed(() => store.getters['isLogin']);
const routeStatus = computed(() => store.getters['getRouteStatus']);
const setRouteStatus = (status: string) => store.commit('setRouteStatus', status);

/**
 * fix: #12
 * 1. 如果token存在，则更新用户数据。
 * 2. 如果token不存在
 *   2.1 如果用户数据存在，清空用户数据并提示过期
 *   2.2 如果用户数据不存在，用户信息设置为初始值
 */
const checkTokenValid = async () => {
  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    store.dispatch('getCurrentUser').then(res => {
      store.commit('changeUser', res.data);
    });
  } else {
    if (isLogin.value) {
      message.warning('登录凭证已过期，请重新登录！');
      store.commit('changeUser', {});
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      store.commit('changeUser', {});
    }
  }
};

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...whiteList],
  scrollBehavior(to, from, savedPosition) {
    // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  try {
    if (routeStatus.value === RouteStatus.Pending) {
      await executeConnect();
      await checkTokenValid();
      await generateAuthRoutes();
      if (isConnectRoute(location.pathname)) {
        // 如果是授权页面，清除query参数
        next({ path: '/', query: {} });
      } else {
        next({ ...to });
      }
    } else {
      next();
    }
    setRouteStatus(RouteStatus.Resolved);
  } catch (e) {
    setRouteStatus(RouteStatus.Rejected);
    console.error('路由守卫错误', e);
    next(false);
  }
});

router.afterEach((to, from): any => {
  NProgress.done();
  const { title } = to.meta;
  if (title) {
    document.title = <string>title + '-有语';
  }
});

export default router;
