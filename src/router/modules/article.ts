const route = [
  {
    path: '/article',
    name: '文章',
    component: () => import('@/views/article/Article.vue'),
    children: [
      {
        path: "",
        name: "推荐",
        component: () => import("@/views/article/list/ArticleDefault.vue")
      },
      {
        path: "new",
        name: "最新",
        component: () => import("@/views/article/list/ArticleDefault.vue")
      },
      {
        path: "hot",
        name: "热榜",
        component: () => import("@/views/article/list/ArticleDefault.vue")
      }
    ]
  }
]

export default route;
