import { useMemo } from 'react';

import { useAuth } from '@/context/AuthContext';
import { authRoutes } from '@/router';
import { RouteObjectMeta } from '@/types/login';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export function useMenu(): MenuItem[] {
  const { permissions } = useAuth();

  return useMemo(() => {
    const permissionCodes = permissions.map(p => p.code);

    const generateMenu = (routes: RouteObjectMeta[]): MenuItem[] => routes
      .filter(route => {
        // 过滤隐藏菜单项
        if (route.meta?.hide) return false;

        // 检查权限
        return !route.meta?.code || permissionCodes.includes(route.meta.code);
      })
      .map(route => ({
        key: route.path,
        label: route.meta?.title,
        icon: route.meta?.icon,
        children: route.children ? generateMenu(route.children) : null,
      }));

    return generateMenu(authRoutes);
  }, [permissions]);
}
