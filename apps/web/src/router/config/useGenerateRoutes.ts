import { ref } from 'vue';
import type { Ref } from 'vue';
import { GET_AUTH_ROUTES } from '@youyu/shared/apis';
import http from '@youyu/shared/network';
import { cloneDeep } from 'lodash';
import { router } from '@/router';
import permissionList from '../permission';
import type { RouteRecordRaw } from 'vue-router';

interface routeItemType {
  code: number;
  path: string;
}

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
function generateRoutes(
  permissionList: RouteRecordRaw[],
  codeList: routeItemType[],
  _routes: RouteRecordRaw[],
  parent: RouteRecordRaw | null,
) {
  permissionList.forEach(route => {
    if (codeList.findIndex(item => item.code === route.meta?.code) > -1) {
      // console.log(route?.path);
      route.path = `${parent ? parent.path + '/' + route.path : route.path}`;
      const copyRoute = cloneDeep(route);
      if (route.children?.length && isNeedAuth(route.children)) {
        copyRoute.children = [];
        generateRoutes(route.children, codeList, copyRoute.children, route);
      }
      // route.meta?.title && _routes.push(copyRoute);
      _routes.push(copyRoute);
    }
  });
}

/**
 * 方法：handleAddRoutes: 添加动态路由和404路由
 * 参数：router: 路由器对象
 * 参数：route: 需要添加的路由集合
 **/
function handleAddRoutes(route: RouteRecordRaw[]) {
  route.forEach(item => {
    router.addRoute(item);
  });
  // 添加404路由
  const notFoundRouter = permissionList[permissionList.length - 1];
  router.addRoute(notFoundRouter);
}

/**
 * 获取权限路由信息
 */
function getAuthRoutes() {
  return http.get(GET_AUTH_ROUTES).then(res => {
    return res.data;
  });
}

/**
 * 方法：handleAddRoutes: 生成路由，权限路由请求回来后进行路由匹配
 * 参数：router: 路由器对象
 **/
export async function generateAuthRoutes(): Promise<void> {
  _routes.value = [];
  const codeList = await getAuthRoutes();
  // 这边需要用cloneDeep，否则登录后路由会出现类似`/post//list`这样的路由,原因是未登录时已经拼接过一次`/`了
  generateRoutes(cloneDeep(permissionList), codeList, _routes.value, null);
  handleAddRoutes(_routes.value);
}
