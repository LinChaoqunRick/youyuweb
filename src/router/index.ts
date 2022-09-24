import {createRouter, createWebHistory} from 'vue-router';

import home from "./modules/home";
import create from "./modules/create";
import magazine from "./modules/magazine"
import album from "./modules/album"
import about from "./modules/about";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...home,
    ...magazine,
    ...create,
    ...album,
    ...about,
    {
      path: '/:pathMatch(.*)',
      redirect: '/',
    },
  ],
})

router.afterEach((to, from): any => {
  document.title = <string>to.name;
})

export default router
