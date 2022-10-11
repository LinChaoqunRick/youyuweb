const route = [
  {
    path: '/create',
    name: 'create',
    component: () => import("@/views/create/Create.vue"),
    redirect: "/create/blog",
    meta: {
      title: "创作",
    },
    children: [
      {
        path: 'blog',
        name: 'createBlog',
        meta: {
          title: "文章",
        },
        component: () => import("@/views/create/child/Blog.vue"),
      },
      {
        path: 'moment',
        name: 'createMoment',
        meta: {
          title: "时刻",
        },
        component: () => import("@/views/create/child/Blog.vue"),
      },
      {
        path: 'sketch',
        name: 'createSketch',
        meta: {
          title: "随笔",
        },
        component: () => import("@/views/create/child/Sketch.vue"),
      }
    ]
  },
]

export default route;
