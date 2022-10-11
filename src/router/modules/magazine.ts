const route = [
  {
    path: '/magazine',
    name: 'magazine',
    meta: {
      title: "期刊",
    },
    component: () => import('@/views/magazine/Magazine.vue')
  }
]

export default route;
