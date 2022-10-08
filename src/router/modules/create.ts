const route = [
  {
    path: '/create',
    name: '创作',
    component: () => import("@/views/create/Create.vue"),
    redirect: "/create/blog",
    children: [
      {
        path: 'blog',
        name: '创作-文章',
        component: () => import("@/views/create/child/Blog.vue"),
      },
      {
        path: 'moment',
        name: '创作-时刻',
        component: () => import("@/views/create/child/Blog.vue"),
      },
      {
        path: 'sketch',
        name: '创作-随笔',
        component: () => import("@/views/create/child/Sketch.vue"),
      }
    ]
  },
]

export default route;
