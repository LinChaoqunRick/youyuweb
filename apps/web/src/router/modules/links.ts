const route = [
  {
    path: '/links',
    name: 'Links',
    meta: {
      title: '友链',
      code: 'LINKS',
    },
    component: () => import('@/views/links/Link.vue'),
  },
];

export default route;
