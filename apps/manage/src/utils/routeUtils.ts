import { basicRoutes, authRoutes, wildcardRoute } from '@/router';

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
    if (route.meta?.public) return true;

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
 * 将路由配置转换为React Router需要的格式
 * @param {Array} filteredRoutes 过滤后的路由
 * @returns React Router路由配置
 */
export function createRouterConfig(filteredRoutes: any[]) {
  return filteredRoutes.map(route => {
    const config = { path: route.path };

    if (route.element) {
      config.element = route.element;
    }
    if (route.children) {
      config.children = createRouterConfig(route.children);
    }

    return config;
  });
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
