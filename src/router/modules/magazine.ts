const route = [
  {
    path: '/magazine',
    name: 'magazine',
    meta: {
      title: "期刊",
      code: "MAGAZINE"
    },
    component: () => import('@/views/magazine/Magazine.vue')
  }
]

export default route;
