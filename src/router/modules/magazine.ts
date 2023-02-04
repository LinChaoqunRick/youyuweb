const route = [
  {
    path: '/magazine',
    name: 'magazine',
    redirect: '/magazine/list/1',
    meta: {
      title: "期刊",
      code: "MAGAZINE"
    },
    component: () => import('@/views/magazine/Magazine.vue'),
    children: [
      {
        path: "list/:page(\\d+)?",
        name: "magazineList",
        meta: {
          title: "期刊列表",
          hide: true,
          code: "MAGAZINE_LIST"
        },
        component: () => import("@/views/magazine/list/MagazineList.vue")
      },
      {
        path: 'details/:magazineId(\\d*)',
        name: 'magazineDetail',
        meta: {
          title: "期刊详情",
          hide: true,
          code: "MAGAZINE_DETAIL"
        },
        component: () => import('@/views/magazine/detail/MagazineDetail.vue'),
      }
    ]
  }
]

export default route;
