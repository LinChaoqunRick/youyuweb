const route = [
  {
    path: '/note',
    name: 'note',
    redirect: () => {
      return {name: 'NoteList', params: {page: 1}}
    },
    meta: {
      title: "笔记",
      code: "NOTE"
    },
    component: () => import("@/components/common/system/EmptyPage.vue"),
    children: [
      {
        path: "list/:page(\\d+)?",
        name: "NoteList",
        meta: {
          title: "笔记列表",
          hide: true,
          code: "NOTE_LIST",
          keepAlive: true
        },
        component: () => import("@/views/note/list/NoteList.vue")
      },
      {
        path: 'details/:noteId(\\d+)?',
        name: 'NoteDetail',
        meta: {
          title: "笔记详情",
          hide: true,
          code: "NOTE_DETAIL"
        },
        component: () => import('@/views/note/detail/NoteDetail.vue'),
      }
    ]
  },
]

export default route;
