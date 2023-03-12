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
        // redirect: "/user/:userId(\\d+)/moment",
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
              title: "Ta的动态",
              code: "USER_PROFILE"
            },
            component: () => import("@/views/user/profile/child/MomentList.vue"),
          },
          {
            path: "post",
            name: "userPost",
            meta: {
              title: "Ta的文章",
              code: "USER_PROFILE"
            },
            component: () => import("@/views/user/profile/child/PostList.vue"),
          },
          {
            path: "column",
            name: "userColumn",
            meta: {
              title: "Ta的专栏",
              code: "USER_PROFILE"
            },
            component: () => import("@/views/user/profile/child/SpecialColumn.vue"),
          },
          {
            path: "collection",
            name: "userCollection",
            meta: {
              title: "Ta的收藏",
              code: "USER_PROFILE"
            },
            component: () => import("@/views/user/profile/child/CollectList.vue"),
          },
          {
            path: "subscribe",
            name: "userSubscribe",
            meta: {
              title: "Ta的关注",
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
