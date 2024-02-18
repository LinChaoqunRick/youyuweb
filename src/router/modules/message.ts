const route = [
  {
    path: '/message',
    name: 'Message',
    meta: {
      title: "留言",
      code: "MESSAGE"
    },
    component: () => import('@/views/message/Message.vue')
  }
]

export default route;
