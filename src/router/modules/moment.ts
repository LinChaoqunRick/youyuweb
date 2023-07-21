const route = [
  {
    path: '/moment',
    name: 'Moment',
    meta: {
      title: "时刻",
      code: "MOMENT"
    },
    component: () => import('@/views/moment/Moment.vue'),
    children: [
      {
        path: "",
        redirect: "/moment/new",
        meta: {
          title: "时刻列表",
          hide: true,
          code: "MOMENT_LIST",
          keepAlive: true
        },
        component: () => import("@/views/moment/list/MomentList.vue"),
        children: [
          {
            path: "",
            alias: "new",
            name: "MomentListNew",
            meta: {
              title: "时刻列表-最新",
              code: "MOMENT_LIST",
              keepAlive: true
            },
            component: () => import("@/views/moment/list/MomentListNew.vue")
          },
          {
            path: "hot",
            name: "MomentListHot",
            meta: {
              title: "时刻列表-热门",
              code: "MOMENT_LIST",
              keepAlive: true
            },
            component: () => import("@/views/moment/list/MomentListHot.vue")
          },
          {
            path: "following",
            name: "MomentListFollowing",
            meta: {
              title: "时刻列表-关注",
              code: "MOMENT_LIST",
              keepAlive: true
            },
            component: () => import("@/views/moment/list/MomentListFollow.vue")
          },
        ]
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
