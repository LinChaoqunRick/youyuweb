const route = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: "首页",
      code: "HOME"
    },
    component: () => import("@/views/home/Home.vue"),
    alias: ['/qqConnect', '/githubConnect']
  },
]

export default route;
