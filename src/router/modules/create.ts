const route = [
  {
    path: '/create',
    name: 'create',
    component: () => import("@/views/create/Create.vue"),
    redirect: "/create/post",
    meta: {
      title: "创作",
      code: "CREATE"
    },
    children: [
      {
        path: 'post',
        name: 'createPost',
        meta: {
          title: "写文章",
          code: "CREATE_POST"
        },
        component: () => import("@/views/create/post/PostCreate.vue"),
      },
      {
        path: 'edit',
        name: 'editPost',
        alias: '/editPost',
        meta: {
          title: "编辑文章",
          code: "CREATE_POST", // 如果有写文章的权限，那么一定有编辑文章的权限，沿用CREATE_POST,
          hide: true
        },
        component: () => import("@/views/create/post/PostEdit.vue"),
      },
      {
        path: 'moment',
        name: 'createMoment',
        meta: {
          title: "发时刻",
          code: "CREATE_MOMENT"
        },
        component: () => import("@/views/create/post/PostCreate.vue"),
      },
      {
        path: 'sketch',
        name: 'createSketch',
        // redirect: '/create/sketch/test1',
        meta: {
          title: "写随笔",
          code: "CREATE_SKETCH"
        },
        component: () => import("@/views/create/child/Sketch.vue"),
        children: [
          {
            path: 'test1',
            name: 'test1',
            meta: {
              title: "Test1",
              code: "CREATE_SKETCH_TEST1"
            },
            component: () => import("@/views/create/child/Test1.vue")
          },
          {
            path: 'test2',
            name: 'test2',
            meta: {
              title: "Test2",
              /*code: "CREATE_SKETCH"*/
            },
            component: () => import("@/views/create/child/Test2.vue")
          }
        ]
      }
    ]
  },
]

export default route;
