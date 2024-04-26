const route = [
  {
    path: '/user',
    name: 'user',
    redirect: '/404',
    meta: {
      title: "用户",
      code: "USER",
      hide: true
    },
    children: [
      {
        path: ":userId(\\d+)",
        // redirect: to => {return {name: 'userMoment'}},
        name: "userProfile",
        meta: {
          title: "用户主页",
          code: "USER_PROFILE"
        },
        component: () => import("@/views/user/profile/UserProfile.vue"),
        children: [
          {
            path: "",
            name: "userHome",
            meta: {
              title: "Ta的动态",
              keepAlive: true
            },
            component: () => import("@/views/user/profile/home/UserHome.vue"),
          },
          {
            path: "moment",
            name: "userMoment",
            meta: {
              title: "Ta的时刻",
              keepAlive: true
            },
            component: () => import("@/views/user/profile/moment/MomentList.vue"),
          },
          {
            path: "post",
            redirect: to => {
              return {name: 'userPost', params: {userId: to.params.userId, page: 1}}
            },
            meta: {
              title: "Ta的文章",
              keepAlive: true
            },
            children: [
              {
                path: ':page(\\d+)',
                name: "userPost",
                meta: {
                  title: "Ta的文章",
                },
                component: () => import("@/views/user/profile/post/PostList.vue"),
              }
            ]
          },
          {
            path: "column",
            name: "userColumn",
            meta: {
              title: "Ta的专栏",
              keepAlive: true
            },
            component: () => import("@/views/user/profile/column/SpecialColumn.vue"),
          },
          {
            path: "note",
            redirect: to => {
              return {name: 'userNote', params: {userId: to.params.userId, page: 1}}
            },
            children: [
              {
                path: ':page(\\d+)',
                name: 'userNote',
                meta: {
                  title: "Ta的笔记",
                  keepAlive: true
                },
                component: () => import("@/views/user/profile/note/NoteList.vue"),
              }
            ]
          },
          {
            path: "collection",
            redirect: to => {
              return {name: 'userCollectionFolder', params: {userId: to.params.userId, page: 1}}
            },
            component: () => import("@/views/user/profile/collection/CollectionList.vue"),
            children: [
              {
                path: 'folder',
                redirect: to => {
                  return {name: 'userCollectionFolder', params: {userId: to.params.userId, page: 1}}
                },
                meta: {
                  title: "Ta的收藏夹",
                  keepAlive: true
                },
                children: [
                  {
                    path: ':page(\\d+)',
                    name: 'userCollectionFolder',
                    meta: {
                      title: "Ta的收藏夹",
                      keepAlive: true
                    },
                    component: () => import("@/views/user/profile/collection/CollectListFolder.vue"),
                  }
                ],
              },
              {
                path: 'column',
                redirect: to => {
                  return {name: 'userCollectionColumn', params: {userId: to.params.userId, page: 1}}
                },
                meta: {
                  title: "Ta收藏的专栏",
                  keepAlive: true
                },
                children: [
                  {
                    path: ':page(\\d+)',
                    name: 'userCollectionColumn',
                    meta: {
                      title: "Ta收藏的专栏",
                      keepAlive: true
                    },
                    component: () => import("@/views/user/profile/collection/CollectListColumn.vue"),
                  }
                ],
              },
              {
                path: 'note',
                redirect: to => {
                  return {name: 'userCollectionNote', params: {userId: to.params.userId, page: 1}}
                },
                meta: {
                  title: "Ta收藏的笔记",
                  keepAlive: true
                },
                children: [
                  {
                    path: ':page(\\d+)',
                    name: 'userCollectionNote',
                    meta: {
                      title: "Ta收藏的笔记",
                      keepAlive: true
                    },
                    component: () => import("@/views/user/profile/collection/CollectListNote.vue"),
                  }
                ],
              }
            ]
          },
          {
            path: "follow",
            redirect: to => {
              return {name: 'userFollow', params: {userId: to.params.userId, page: 1}}
            },
            children: [
              {
                path: ':page(\\d+)',
                name: "userFollow",
                meta: {
                  title: "Ta的关注",
                  keepAlive: true
                },
                component: () => import("@/views/user/profile/follow/FollowList.vue"),
              }
            ]
          },
          {
            path: "fans",
            redirect: to => {
              return {name: 'userFans', params: {userId: to.params.userId, page: 1}}
            },
            children: [
              {
                path: ':page(\\d+)',
                name: "userFans",
                meta: {
                  title: "Ta的关注",
                  keepAlive: true
                },
                component: () => import("@/views/user/profile/fans/FansList.vue"),
              }
            ]
          }
        ]
      },
      {
        path: 'center',
        name: 'userCenter',
        meta: {
          title: "用户中心",
          code: "USER_CENTER"
        },
        component: () => import("@/views/user/center/UserCenter.vue"),
        children: [
          {
            path: "profile",
            name: "userCenterProfile",
            meta: {
              title: "个人资料",
            },
            component: () => import("@/views/user/center/profile/CenterProfile.vue"),
          },
          {
            path: "account",
            name: "userCenterAccount",
            meta: {
              title: "账号设置",
            },
            component: () => import("@/views/user/center/account/CenterAccount.vue"),
          },
          {
            path: "message",
            name: "userCenterMessage",
            meta: {
              title: "消息通知",
            },
            component: () => import("@/views/user/center/message/CenterMessage.vue"),
          },
        ]
      }
    ]
  }
]

export default route;
