const route = [
  {
    path: '/post',
    name: 'post',
    redirect: () => {
      return {name: 'postList', params: {page: 1}}
    },
    meta: {
      title: "文章",
      code: "POST",
    },
    component: () => import("@/views/post/Post.vue"),
    children: [
      {
        path: "list/:page(\\d+)?",
        name: "postList",
        meta: {
          title: "帖子列表",
          hide: true,
          keepAlive: true,
          code: "POST_LIST"
        },
        component: () => import("@/views/post/list/PostList.vue")
      },
      {
        path: 'details/:postId(\\d+)',
        name: 'postDetail',
        meta: {
          title: "文章详情",
          hide: true,
          code: "POST_DETAIL"
        },
        alias: ':postId(\\d*)',
        component: () => import('@/views/post/detail/PostDetail.vue'),
      }
    ]
  },
]

export default route;
