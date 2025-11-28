const route = [
  {
    path: '/album',
    name: 'Album',
    redirect: to => {
      return { name: 'AlbumList', params: { page: 1 } };
    },
    meta: {
      title: '相册',
      code: 'ALBUM',
    },
    component: () => import('@/components/common/system/EmptyPage.vue'),
    children: [
      {
        path: 'detail/:albumId(\\d+)',
        name: 'AlbumDetail',
        meta: {
          title: '相册详情',
          hide: true,
          code: 'ALBUM_DETAIL',
        },
        component: () => import('@/views/album/detail/AlbumDetail.vue'),
      },
      {
        path: 'list',
        name: 'AlbumList',
        redirect: to => {
          return { name: 'AlbumListAllPage', params: { page: 1 } };
        },
        meta: {
          title: '相册列表',
          hide: true,
          code: 'ALBUM_LIST',
        },
        component: () => import('@/views/album/list/AlbumList.vue'),
        children: [
          {
            path: 'all',
            name: 'AlbumListAll',
            redirect: to => {
              return { name: 'AlbumListAllPage', params: { page: 1 } };
            },
            meta: {
              title: '相册列表-全部',
              keepAlive: true,
            },
            component: () => import('@/components/common/system/EmptyPage.vue'),
            children: [
              {
                path: ':page(\\d+)',
                name: 'AlbumListAllPage',
                meta: {
                  title: '相册列表-全部',
                },
                component: () => import('@/views/album/list/AlbumListAll.vue'),
              },
            ],
          },
          {
            path: 'mine',
            name: 'AlbumListMine',
            redirect: to => {
              return { name: 'AlbumListMinePage', params: { page: 1 } };
            },
            meta: {
              title: '相册列表-我的',
              keepAlive: true,
            },
            component: () => import('@/views/album/list/AlbumListMine.vue'),
            children: [
              {
                path: 'page',
                name: 'AlbumListMineList',
                redirect: to => {
                  return { name: 'AlbumListMinePage', params: { page: 1 } };
                },
                meta: {
                  title: '个人中心-相册-列表',
                  keepAlive: true,
                },
                component: () => import('@/components/common/system/EmptyPage.vue'),
                children: [
                  {
                    path: ':page(\\d+)',
                    name: 'AlbumListMinePage',
                    meta: {
                      title: '个人中心-相册-列表',
                      keepAlive: true,
                    },
                    component: () => import('@/views/album/list/AlbumListMinePage.vue'),
                  },
                ],
              },
              {
                path: 'recycle',
                name: 'AlbumListMineRecycle',
                meta: {
                  title: '个人中心-相册-回收站',
                  keepAlive: true,
                },
                component: () => import('@/views/album/list/AlbumRecycle.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default route;
