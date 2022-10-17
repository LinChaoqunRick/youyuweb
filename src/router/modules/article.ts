import {h} from 'vue';
import {RouterView} from 'vue-router';

const route = [
  {
    path: '/article',
    name: 'article',
    redirect: "/article/list/1",
    meta: {
      title: "文章",
    },
    component: () => import("@/views/article/Article.vue"),
    children: [
      {
        path: "list/:page(\\d*)",
        name: "articleList",
        meta: {
          title: "推荐",
          hide: true
        },
        component: () => import("@/views/article/list/ArticleList.vue")
      },
      {
        path: 'details/:blogId(\\d*)',
        name: 'articleDetail',
        meta: {
          title: "文章详情",
          hide: true
        },
        component: () => import('@/views/article/detail/ArticleDetail.vue'),
      }
    ]
  },
]

export default route;
