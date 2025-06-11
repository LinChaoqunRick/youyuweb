const routes = [
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      title: '404 NotFound',
      hide: true,
    },
    component: () => import('@/views/error/404.vue'),
  },
];

export default routes;
