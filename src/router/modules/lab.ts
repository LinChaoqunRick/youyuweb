const route = [
  {
    path: '/lab',
    name: 'lab',
    meta: {
      title: "实验室",
      code: "LAB"
    },
    component: () => import('@/views/lab/Lab.vue')
  }
]

export default route;
