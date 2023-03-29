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
    component: () => import('@/views/about/About.vue'),
    children: [
      {
        path: 'site',
        name: 'aboutSite',
        meta: {
          title: "关于本站",
          code: "ABOUT"
        },
        component: () => import('@/views/about/About.vue')
      },
      {
        path: 'me',
        name: 'aboutMe',
        meta: {
          title: "关于作者",
          code: "ABOUT"
        },
        component: () => import('@/views/about/About.vue')
      },
      {
        path: 'updateLogs',
        name: 'updateLogs',
        meta: {
          title: "更新日志",
          code: "ABOUT"
        },
        component: () => import('@/views/about/About.vue')
      }
    ]
  }
]

export default route;
