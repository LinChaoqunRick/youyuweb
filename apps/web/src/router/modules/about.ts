import type {RouteRecordRaw} from "vue-router";

const route: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'about',
    redirect: '/about/site',
    meta: {
      title: "关于",
      code: "ABOUT"
    },
    component: () => import('@/views/about/About.vue'),
    children: [
      {
        path: 'site',
        name: 'aboutSite',
        meta: {
          title: "关于本站",
          code: "ABOUT"
        },
        component: () => import('@/views/about/site/AboutSite.vue')
      },
      {
        path: 'me',
        name: 'aboutMe',
        meta: {
          title: "关于作者",
          code: "ABOUT"
        },
        component: () => import('@/views/about/me/AboutMe.vue')
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
