const route = [
  {
    path: '/article',
    name: '文章',
    component: () => import('@/views/article/Article.vue')
  }
]

export default route;
