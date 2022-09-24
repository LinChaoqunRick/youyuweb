const route = [
  {
    path: '/create',
    name: '创作',
    component: () => import("@/views/create/Create.vue"),
    redirect: "/create/blog",
    children: [
      {
        path: 'blog',
        name: '博客',
        component: () => import("@/views/create/child/Blog.vue"),
      },
      {
        path: 'sketch',
        name: '随笔',
        component: () => import("@/views/create/child/Sketch.vue"),
      }
    ]
  },
]

export default route;
