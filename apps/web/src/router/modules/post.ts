const route = [
  {
    path: '/post',
    name: 'post',
    redirect: () => {
      return { name: 'PostList', params: { page: 1 } };
    },
    meta: {
      title: '文章',
      code: 'POST',
    },
    component: () => import('@/components/common/system/EmptyPage.vue'),
    children: [
      {
        path: 'list/:page(\\d+)?',
        name: 'PostList',
        meta: {
          title: '文章列表',
          hide: true,
          code: 'POST_LIST',
          keepAlive: true,
        },
        component: () => import('@/views/post/list/PostList.vue'),
      },
      {
        path: 'details/:postId(\\d+)',
        name: 'PostDetail',
        meta: {
          title: '文章详情',
          hide: true,
          code: 'POST_DETAIL',
        },
        alias: ':postId(\\d*)',
        component: () => import('@/views/post/detail/PostDetail.vue'),
      },
    ],
  },
];

export default route;
