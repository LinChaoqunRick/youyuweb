const route = [
  {
    path: '/lab',
    name: 'lab',
    meta: {
      title: "实验室",
      code: "LAB"
    },
    component: () => import("@/components/common/system/EmptyPage.vue"),
    children: [
      {
        path: "",
        name: "LabList",
        meta: {
          title: "实验室",
          keepAlive: true,
          hide: true
        },
        component: () => import("@/views/lab/Lab.vue")
      },
      {
        path: "microModule",
        name: "MicroModule",
        meta: {
          title: "微模块3D",
          hide: true
        },
        component: () => import("@/views/lab/microModule/index.vue")
      },
      {
        path: "machineRoom",
        name: "MachineRoom",
        meta: {
          title: "机房3D",
          hide: true
        },
        component: () => import("@/views/lab/machineRoom/index.vue")
      },
    ]
  }
]

export default route;
