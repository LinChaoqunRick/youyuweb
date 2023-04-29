const route = [
  {
    path: '/search/:page(\\d+)?',
    name: 'search',
    meta: {
      title: "", // 由业务代码决定title
      code: "SEARCH",
      hide: true
    },
    component: () => import('@/views/search/index.vue')
  }
];

export default route;
