const route = [
  {
    path: '/search',
    name: 'search',
    meta: {
      title: "搜索",
      code: "SEARCH",
      hide: true
    },
    component: () => import('@/views/search/index.vue')
  }
];

export default route;