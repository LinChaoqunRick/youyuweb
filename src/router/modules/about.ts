import type {RouteRecordRaw} from "vue-router";

const route: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'about',
    meta: {
      title: "关于",
      code: "ABOUT"
    },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/about/About.vue')
  }
]

export default route;
