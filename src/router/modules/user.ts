const route = [
  {
    path: '/user',
    name: 'user',
    meta: {
      title: "用户",
      code: "USER",
      hide: true
    },
    component: () => import('@/views/user/User.vue'),
    children: [
      {
        path: ":userId(\\d+)",
        name: "userProfile",
        redirect: ":userId(\\d+)/moment",
        meta: {
          title: "用户主页",
          code: "USER_PROFILE"
        },
        component: () => import("@/views/user/profile/UserProfile.vue"),
        children: [
          {
            path: "moment",
            name: "userMoment",
            meta: {
              title: "动态",
              code: "USER_PROFILE"
            },
            component: () => import("@/views/user/profile/child/MomentList.vue"),
          },
          {
            path: "post",
            name: "userPost",
            meta: {
              title: "文章",
              code: "USER_PROFILE"
            },
            component: () => import("@/views/user/profile/child/PostList.vue"),
          },
          {
            path: "column",
            name: "userColumn",
            meta: {
              title: "专栏",
              code: "USER_PROFILE"
            },
            component: () => import("@/views/user/profile/child/SpecialColumn.vue"),
          },
          {
            path: "collect",
            name: "userCollect",
            meta: {
              title: "收藏",
              code: "USER_PROFILE"
            },
            component: () => import("@/views/user/profile/child/CollectList.vue"),
          },
          {
            path: "subscribe",
            name: "userSubscribe",
            meta: {
              title: "关注",
              code: "USER_PROFILE"
            },
            component: () => import("@/views/user/profile/child/SubscribeList.vue"),
          }
        ]
      },
    ]
  }
]

export default route;
