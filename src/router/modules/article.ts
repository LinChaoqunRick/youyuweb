const route = [
  {
    path: '/article',
    name: 'article',
    meta: {
      title: "文章",
    },
    component: () => import('@/views/article/Article.vue'),
    children: [
      {
        path: "",
        name: "articleDefault",
        meta: {
          title: "推荐",
          hide: true
        },
        component: () => import("@/views/article/list/ArticleDefault.vue")
      },
      {
        path: "new",
        name: "articleNew",
        meta: {
          title: "最新",
          hide: true
        },
        component: () => import("@/views/article/list/ArticleDefault.vue")
      },
      {
        path: "hot",
        name: "articleHot",
        meta: {
          title: "热榜",
          hide: true
        },
        component: () => import("@/views/article/list/ArticleDefault.vue")
      }
    ]
  }
]

export default route;
