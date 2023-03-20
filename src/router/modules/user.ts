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
        // redirect: '/user/:userId(\\d+)/moment',
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
            },
            component: () => import("@/views/user/profile/moment/MomentList.vue"),
          },
          {
            path: "post",
            name: "userPost",
            meta: {
              title: "Ta的文章",
            },
            component: () => import("@/views/user/profile/post/PostList.vue"),
          },
          {
            path: "column",
            name: "userColumn",
            meta: {
              title: "Ta的专栏",
            },
            component: () => import("@/views/user/profile/column/SpecialColumn.vue"),
          },
          {
            path: "collection",
            name: "userCollection",
            meta: {
              title: "Ta的收藏",
            },
            component: () => import("@/views/user/profile/collection/CollectList.vue"),
          },
          {
            path: "follow",
            name: "userFollow",
            meta: {
              title: "Ta的关注",
            },
            component: () => import("@/views/user/profile/follow/FollowList.vue"),
          }
        ]
      },
    ]
  }
]

export default route;
