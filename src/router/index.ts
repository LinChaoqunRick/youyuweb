import {createRouter, createWebHistory} from 'vue-router';

import home from "./modules/home";
import create from "./modules/create";
import magazine from "./modules/magazine";
import album from "./modules/album";
import about from "./modules/about";
import article from "./modules/article";
import moment from "./modules/moment";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...home,
    ...article,
    ...magazine,
    ...moment,
    ...album,
    ...about,
    ...create,
    {
      path: '/:pathMatch(.*)',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }

    // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { top: 0 }
    // }
  },
})

router.afterEach((to, from): any => {
  document.title = <string>to.meta.title;
})

export default router
