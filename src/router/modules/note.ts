const route = [
  {
    path: '/note',
    name: 'note',
    redirect: "/note/list",
    meta: {
      title: "笔记",
      code: "NOTE"
    },
    component: () => import("@/views/note/Note.vue"),
    children: [
      {
        path: "list",
        name: "noteList",
        meta: {
          title: "笔记列表",
          hide: true,
          code: "NOTE_LIST"
        },
        component: () => import("@/views/note/list/NoteList.vue")
      },
      {
        path: 'details/:noteId(\\d+)?',
        name: 'noteDetail',
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
