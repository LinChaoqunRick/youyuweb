const route = [
  {
    path: '/moment',
    name: 'moment',
    meta: {
      title: "时刻",
    },
    component: () => import('@/views/moment/Moment.vue')
  }
]

export default route;
