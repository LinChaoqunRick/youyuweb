import {ref} from 'vue';
import type {Ref} from 'vue';
import type {RouteRecordRaw, Router} from "vue-router";
import permissionList from "../permission";
import {cloneDeep} from 'lodash';

// 这两个不一样，因为可能存在菜单中不存在的路由，但它实际存在，如：文章->文章详情
export const _routes: Ref = ref([]); // 用于addRoutes

/**
 * 方法：isNeedAuth: 检查下级路由是否存在权限code,即是否需要经过路由匹配
 * 参数：list: 需要检查的路由列表
 **/
function isNeedAuth(list: RouteRecordRaw[]) {
  for (const item of list) {
    if (item.meta?.code) {
      return true;
    }
  }
  return false;
}

/**
 * 方法：generateRoutes: 生成路由
 * 参数：permissionList: 本地路由
 * 参数：codeList: 接口返回的权限路由集合
 * 参数：_routes: 匹配后生成的路由
 * 参数：parent: 父路由
 **/
function generateRoutes(permissionList: RouteRecordRaw[], codeList: [], _routes: [], parent: object) {
  permissionList.forEach(route => {
    if (codeList.findIndex(item => item.code === route.meta?.code) > -1) {
      route.path = `${parent ? parent.path + '/' + route.path : route.path}`;
      let copyRoute = cloneDeep(route);
      if (route.children?.length && isNeedAuth(route.children)) {
        copyRoute.children = [];
        generateRoutes(route.children, codeList, copyRoute.children, route);
      }
      route.meta?.title && _routes.push(copyRoute);
    }
  })
}


/**
 * 方法：handleAddRoutes: 添加动态路由和404路由
 * 参数：router: 路由器对象
 * 参数：route: 需要添加的路由集合
 **/
function handleAddRoutes(router: Router, route: RouteRecordRaw) {
  route.forEach(item => {
    router.addRoute(item);
  })
  // 添加404路由
  const notFoundRouter = permissionList[permissionList.length - 1];
  router.addRoute(notFoundRouter);
}

// 模拟路由接口数据
function getAuthRoutes() {
  const userType: number = 2; // 0: 未登录 1: 普通用户 2: 管理员
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let res: [] = [];
      if (userType === 0) {
        res = [
          {id: 0, title: "首页", code: "HOME"},
          {id: 1, title: "文章", code: "POST"},
          {id: 2, title: "文章列表", code: "POST_LIST"},
          {id: 3, title: "文章详情", code: "POST_DETAIL"},
          {id: 4, title: "期刊", code: "MAGAZINE"},
          {id: 5, title: "时刻", code: "MOMENT"},
          // {id: 6, title: "相册", code: "ALBUM"},
          {id: 7, title: "创作", code: "CREATE"},
          // {id: 8, title: "文章", code: "CREATE_BLOG"},
          {id: 9, title: "时刻", code: "CREATE_MOMENT"},
          {id: 10, title: "随笔", code: "CREATE_SKETCH"},
          // {id: 11, title: "关于", code: "ABOUT"},
        ]
      } else if (userType === 1) {
        res = [
          {id: 0, title: "首页", code: "HOME"},
          {id: 1, title: "文章", code: "POST"},
          {id: 2, title: "文章列表", code: "POST_LIST"},
          {id: 3, title: "文章详情", code: "POST_DETAIL"},
          {id: 4, title: "期刊", code: "MAGAZINE"},
          {id: 5, title: "时刻", code: "MOMENT"},
          {id: 6, title: "相册", code: "ALBUM"},
          {id: 7, title: "创作", code: "CREATE"},
          {id: 8, title: "文章", code: "CREATE_BLOG"},
          {id: 9, title: "时刻", code: "CREATE_MOMENT"},
          // {id: 10, title: "随笔", code: "CREATE_SKETCH"},
          {id: 11, title: "关于", code: "ABOUT"},
        ]
      } else if (userType === 2) {
        res = [
          {id: 0, title: "首页", code: "HOME"},
          {id: 1, title: "文章", code: "POST"},
          {id: 2, title: "文章列表", code: "POST_LIST"},
          {id: 3, title: "文章详情", code: "POST_DETAIL"},
          {id: 4, title: "期刊", code: "MAGAZINE"},
          {id: 5, title: "时刻", code: "MOMENT"},
          {id: 6, title: "相册", code: "ALBUM"},
          {id: 7, title: "创作", code: "CREATE"},
          {id: 8, title: "文章", code: "CREATE_BLOG"},
          {id: 9, title: "时刻", code: "CREATE_MOMENT"},
          {id: 10, title: "随笔", code: "CREATE_SKETCH"},
          {id: 11, title: "关于", code: "ABOUT"},
          {id: 12, title: "实验室", code: "LAB"},
          {id: 13, title: "笔记", code: "NOTE"},
          {id: 14, title: "笔记列表", code: "NOTE_LIST"},
          {id: 15, title: "笔记详情", code: "NOTE_DETAIL"},
        ]
      }
      return resolve(res);
    }, 1000)
  })
}

/**
 * 方法：handleAddRoutes: 生成路由，权限路由请求回来后进行路由匹配
 * 参数：router: 路由器对象
 **/
export async function generateAuthRoutes(router: Router): void {
  _routes.value = [];
  let codeList = await getAuthRoutes();
  generateRoutes(permissionList, codeList, _routes.value, null);
  handleAddRoutes(router, _routes.value);
  // console.log(_routes.value);
}
