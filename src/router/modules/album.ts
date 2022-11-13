const route = [
  {
    path: '/album',
    name: 'album',
    meta: {
      title: "相册",
      code: "ALBUM"
    },
    component: () => import('@/views/album/Album.vue')
  }
]

export default route;
