import { basicRoutes, authRoutes, wildcardRoute } from '@/router';
import { RouteObjectMeta } from '@/types/login';

/**
 * 递归过滤路由表
 * @param {Array} routes 权限路由配置
 * @param {Array} permissions 扁平权限数组 [{code: 'dashboard:analysis'}]
 * @returns 过滤后的路由表
 */
export function filterRoutes(routes: Array<any>, permissions: Array<any>) {
  // 提取所有权限码
  const permissionCodes = permissions.map(p => p.code);

  return routes.filter(route => {
    // 1. 公共路由直接保留
    // if (route.meta?.public) return true;

    // 2. 处理有子路由的情况
    if (route.children) {
      // 递归过滤子路由
      const filteredChildren = filterRoutes(route.children, permissions);

      // 保留有有效子路由的父路由
      if (filteredChildren.length > 0) {
        route.children = filteredChildren;
        return true;
      }
      return false;
    }

    // 3. 检查叶子节点的权限
    return permissionCodes.includes(route.meta?.code);
  });
}

/**
 * 查找第一个有权限的路由路径
 * @param {Array<RouteObjectMeta>} routes 过滤后的路由表
 * @param {String} basePath 基础路径（用于递归）
 * @returns 第一个有权限的路由路径
 */
export function findFirstAuthPath(routes: RouteObjectMeta[], basePath: string = ''): string | null {
  for (const route of routes) {
    // 获取当前路径（移除basePath末尾的/，移除route.path开头的/，再拼接）
    const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
    const cleanPath = route.path?.startsWith('/') ? route.path.slice(1) : route.path || '';
    const fullPath = `${cleanBase}/${cleanPath}`;

    // 如果是叶子节点且有权限，返回路径
    if (!route.children && route.meta?.code) {
      return fullPath;
    }

    // 如果有子路由，递归查找
    if (route.children) {
      const childPath = findFirstAuthPath(route.children, fullPath);
      if (childPath) return childPath;
    }
  }

  return null;
}

/**
 * 生成最终路由配置
 * @param {Array} permissions 权限数组
 * @returns 完整路由配置
 */
export function generateRoutes(permissions: any[]) {
  // 1. 过滤权限路由
  const filteredAuthRoutes = filterRoutes(authRoutes, permissions);

  // 2. 合并基础路由和通配路由
  return [...basicRoutes, ...filteredAuthRoutes, wildcardRoute];
}
