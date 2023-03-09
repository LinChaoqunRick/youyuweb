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
        meta: {
          title: "用户主页",
          hide: true,
          code: "USER_PROFILE"
        },
        component: () => import("@/views/user/profile/UserProfile.vue")
      },
    ]
  }
]

export default route;
