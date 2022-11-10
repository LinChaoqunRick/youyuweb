const route = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: "首页",
      code: "HOME"
    },
    component: () => import("@/views/home/Home.vue")
  },
]

export default route;
