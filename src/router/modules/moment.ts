const route = [
  {
    path: '/moment',
    name: 'moment',
    redirect: '/moment/list',
    meta: {
      title: "时刻",
      code: "MOMENT"
    },
    component: () => import('@/components/common/system/EmptyPage.vue'),
    children: [
      {
        path: "list",
        name: "momentList",
        meta: {
          title: "时刻列表",
          hide: true,
          code: "MOMENT_LIST",
          keepAlive: true
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
