const route = [
  {
    path: '/user',
    name: 'user',
    redirect: '/404',
    meta: {
      title: '用户',
      code: 'USER',
      hide: true,
    },
    children: [
      {
        path: ':userId(\\d+)',
        name: 'userProfile',
        meta: {
          title: '用户主页',
          code: 'USER_PROFILE',
        },
        component: () => import('@/views/user/profile/UserProfile.vue'),
        children: [
          {
            path: '',
            name: 'userHome',
            meta: {
              title: 'Ta的动态',
              keepAlive: true,
            },
            component: () => import('@/views/user/profile/home/UserHome.vue'),
          },
          {
            path: 'moment',
            name: 'userMoment',
            meta: {
              title: 'Ta的时刻',
              keepAlive: true,
            },
            component: () => import('@/views/user/profile/moment/MomentList.vue'),
          },
          {
            path: 'post',
            name: 'userPost',
            redirect: to => {
              return { name: 'userPostList', params: { userId: to.params.userId, page: 1 } };
            },
            meta: {
              title: 'Ta的文章',
              keepAlive: true,
            },
            children: [
              {
                path: ':page(\\d+)',
                name: 'userPostList',
                meta: {
                  title: 'Ta的文章',
                },
                component: () => import('@/views/user/profile/post/PostList.vue'),
              },
            ],
          },
          {
            path: 'column',
            name: 'userColumn',
            meta: {
              title: 'Ta的专栏',
              keepAlive: true,
            },
            component: () => import('@/views/user/profile/column/SpecialColumn.vue'),
          },
          {
            path: 'note',
            name: 'userNote',
            redirect: to => {
              return { name: 'userNoteList', params: { userId: to.params.userId, page: 1 } };
            },
            children: [
              {
                path: ':page(\\d+)',
                name: 'userNoteList',
                meta: {
                  title: 'Ta的笔记',
                  keepAlive: true,
                },
                component: () => import('@/views/user/profile/note/NoteList.vue'),
              },
            ],
          },
          {
            path: 'favorites',
            name: 'userFavorites',
            redirect: to => {
              return { name: 'userFavoritesFolder', params: { userId: to.params.userId, page: 1 } };
            },
            component: () => import('@/views/user/profile/favorites/FavoritesList.vue'),
            children: [
              {
                path: 'folder',
                name: 'userFavoritesFolder',
                redirect: to => {
                  return { name: 'FavoritesFolder', params: { userId: to.params.userId, page: 1 } };
                },
                meta: {
                  title: 'Ta的收藏夹',
                  keepAlive: true,
                },
                children: [
                  {
                    path: ':page(\\d+)',
                    name: 'FavoritesFolder',
                    meta: {
                      title: 'Ta的收藏夹',
                    },
                    component: () => import('@/views/user/profile/favorites/FavoritesFolder.vue'),
                  },
                ],
              },
              {
                path: 'column',
                name: 'userFavoritesColumn',
                redirect: to => {
                  return { name: 'FavoritesColumn', params: { userId: to.params.userId, page: 1 } };
                },
                meta: {
                  title: 'Ta收藏的专栏',
                  keepAlive: true,
                },
                children: [
                  {
                    path: ':page(\\d+)',
                    name: 'FavoritesColumn',
                    meta: {
                      title: 'Ta收藏的专栏',
                    },
                    component: () => import('@/views/user/profile/favorites/FavoritesColumn.vue'),
                  },
                ],
              },
              {
                path: 'note',
                name: 'userFavoritesNote',
                redirect: to => {
                  return { name: 'FavoritesNote', params: { userId: to.params.userId, page: 1 } };
                },
                meta: {
                  title: 'Ta收藏的笔记',
                  keepAlive: true,
                },
                children: [
                  {
                    path: ':page(\\d+)',
                    name: 'FavoritesNote',
                    meta: {
                      title: 'Ta收藏的笔记',
                    },
                    component: () => import('@/views/user/profile/favorites/FavoritesNote.vue'),
                  },
                ],
              },
            ],
          },
          {
            path: 'follow',
            name: 'userFollow',
            redirect: to => {
              return { name: 'userFollowList', params: { userId: to.params.userId, page: 1 } };
            },
            children: [
              {
                path: ':page(\\d+)',
                name: 'userFollowList',
                meta: {
                  title: 'Ta的关注',
                  keepAlive: true,
                },
                component: () => import('@/views/user/profile/follow/FollowList.vue'),
              },
            ],
          },
          {
            path: 'fans',
            name: 'userFans',
            redirect: to => {
              return { name: 'userFansList', params: { userId: to.params.userId, page: 1 } };
            },
            children: [
              {
                path: ':page(\\d+)',
                name: 'userFansList',
                meta: {
                  title: 'Ta的关注',
                  keepAlive: true,
                },
                component: () => import('@/views/user/profile/fans/FansList.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'center',
        name: 'userCenter',
        meta: {
          title: '用户中心',
          code: 'USER_CENTER',
        },
        component: () => import('@/views/user/center/UserCenter.vue'),
        children: [
          {
            path: 'profile',
            name: 'userCenterProfile',
            meta: {
              title: '个人资料',
            },
            component: () => import('@/views/user/center/profile/CenterProfile.vue'),
          },
          {
            path: 'account',
            name: 'userCenterAccount',
            meta: {
              title: '账号设置',
            },
            component: () => import('@/views/user/center/account/CenterAccount.vue'),
          },
          {
            path: 'message',
            name: 'userCenterMessage',
            meta: {
              title: '消息通知',
            },
            component: () => import('@/views/user/center/message/CenterMessage.vue'),
          },
        ],
      },
    ],
  },
];

export default route;
