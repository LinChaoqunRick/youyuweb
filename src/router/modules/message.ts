const route = [
  {
    path: '/message',
    name: 'Message',
    meta: {
      title: "留言",
      code: "MESSAGE"
    },
    component: () => import('@/views/message/index.vue')
  }
]

export default route;
