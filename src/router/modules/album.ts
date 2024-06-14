const route = [
  {
    path: '/album',
    name: 'Album',
    redirect: '/album/list/1',
    meta: {
      title: "相册",
      code: "ALBUM"
    },
    component: () => import("@/components/common/system/EmptyPage.vue"),
    children: [
      {
        path: "list/:page(\\d+)?",
        name: "AlbumList",
        meta: {
          title: "相册列表",
          hide: true,
          code: "ALBUM_LIST",
          keepAlive: true,
        },
        component: () => import("@/views/album/list/AlbumList.vue")
      },
      {
        path: 'detail/:albumId(\\d*)',
        name: 'AlbumDetail',
        meta: {
          title: "相册详情",
          hide: true,
          code: "ALBUM_DETAIL"
        },
        component: () => import('@/views/album/detail/AlbumDetail.vue'),
      }
    ]
  }
]

export default route;
