import {createRouter, createWebHistory} from 'vue-router';
import whiteList from "./whiteList";
import {generateAuthRoutes} from "@/router/config/useGenerateRoutes";


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
    await generateAuthRoutes();
    next({...to});
  } else {
    next();
  }
  isInit = true;
})

router.beforeResolve((to) => {
  const title = to.meta.title
  if (title) {
    document.title = <string>title;
  }
})

router.afterEach((to, from): any => {
  // document.title = <string>to.meta.title;
})

export default router
