const route = [
  {
    path: '/album',
    name: 'album',
    redirect: '/album/list/1',
    meta: {
      title: "相册",
      code: "ALBUM"
    },
    component: () => import('@/views/album/Album.vue'),
    children: [
      {
        path: "list/:page(\\d+)?",
        name: "albumList",
        meta: {
          title: "时刻列表",
          hide: true,
          code: "ALBUM_LIST"
        },
        component: () => import("@/views/album/list/AlbumList.vue")
      },
      {
        path: 'details/:albumId(\\d*)',
        name: 'albumDetail',
        meta: {
          title: "时刻详情",
          hide: true,
          code: "ALBUM_DETAIL"
        },
        component: () => import('@/views/album/detail/AlbumDetail.vue'),
      }
    ]
  }
]

export default route;
