const route = [
  {
    path: '/moment',
    name: 'moment',
    redirect: '/moment/list/1',
    meta: {
      title: "时刻",
      code: "MOMENT"
    },
    component: () => import('@/views/moment/Moment.vue'),
    children: [
      {
        path: "list/:page(\\d+)?",
        name: "momentList",
        meta: {
          title: "时刻列表",
          hide: true,
          code: "MOMENT_LIST"
        },
        component: () => import("@/views/moment/list/MomentList.vue")
      },
      {
        path: 'details/:momentId(\\d*)',
        name: 'momentDetail',
        meta: {
          title: "时刻详情",
          hide: true,
          code: "MOMENT_DETAIL"
        },
        component: () => import('@/views/moment/detail/MomentDetail.vue'),
      }
    ]
  }
]

export default route;
