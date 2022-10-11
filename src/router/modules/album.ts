const route = [
  {
    path: '/album',
    name: 'album',
    meta: {
      title: "相册",
      hide: true
    },
    component: () => import('@/views/album/Album.vue')
  }
]

export default route;
