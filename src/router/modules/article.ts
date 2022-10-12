const route = [
  {
    path: '/article',
    name: 'article',
    redirect: "/article/default",
    meta: {
      title: "文章",
    },
    component: () => import('@/views/article/Article.vue'),
    children: [
      {
        path: "default/:page(\\d+)?",
        name: "articleDefault",
        meta: {
          title: "推荐",
          hide: true
        },
        component: () => import("@/views/article/list/ArticleDefault.vue")
      },
      {
        path: "new/:page(\\d+)?",
        name: "articleNew",
        meta: {
          title: "最新",
          hide: true
        },
        component: () => import("@/views/article/list/ArticleNew.vue")
      },
      {
        path: "hot/:page(\\d+)?",
        name: "articleHot",
        meta: {
          title: "热榜",
          hide: true
        },
        component: () => import("@/views/article/list/ArticleHot.vue")
      }
    ]
  }
]

export default route;
