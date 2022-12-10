import {h} from 'vue';
import {RouterView} from 'vue-router';

const route = [
  {
    path: '/post',
    name: 'post',
    redirect: "/post/list/1",
    meta: {
      title: "文章",
      code: "POST"
    },
    component: () => import("@/views/post/Post.vue"),
    children: [
      {
        path: "list/:page(\\d+)?",
        name: "postList",
        meta: {
          title: "推荐",
          hide: true,
          code: "POST_LIST"
        },
        component: () => import("@/views/post/list/postList.vue")
      },
      {
        path: 'details/:blogId(\\d*)',
        name: 'postDetail',
        meta: {
          title: "文章详情",
          hide: true,
          code: "POST_DETAIL"
        },
        component: () => import('@/views/post/detail/PostDetail.vue'),
      }
    ]
  },
]

export default route;
