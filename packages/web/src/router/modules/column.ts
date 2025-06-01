const route = [
  {
    path: '/column',
    name: 'column',
    redirect: '/404',
    meta: {
      title: "专栏",
      hide: true,
      code: "COLUMN"
    },
    component: () => import('@/views/column/Column.vue'),
    children: [
      {
        path: "list/:page(\\d+)?",
        name: "ColumnList",
        meta: {
          title: "专栏列表",
          code: "COLUMN_LIST"
        },
        component: () => import("@/views/column/list/ColumnList.vue")
      },
      {
        path: ':columnId(\\d*)/:page(\\d+)?',
        name: 'ColumnDetail',
        meta: {
          title: "专栏详情",
          code: "COLUMN_DETAIL"
        },
        component: () => import('@/views/column/detail/ColumnDetail.vue'),
      }
    ]
  }
]

export default route;
