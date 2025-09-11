import type { MenuItem } from '@youyu/shared/types/common';
import { useMemo } from 'react';

import { useAuth } from '@/context/AuthContext';
import { authRoutes } from '@/router';
import { RouteObjectMeta } from '@/types/login';

export function useMenu(): MenuItem[] {
  const { permissions } = useAuth();

  return useMemo(() => {
    const permissionCodes = permissions.map(p => p.code);

    const generateMenu = (routes: RouteObjectMeta[], parentPath = ''): MenuItem[] => routes
      .filter(route => {
        return route.path === '/' || (route.meta?.hide !== false && permissionCodes.includes(route.meta.code ?? ''));
      })
      .map(route => {
        const fullPath = route.path.startsWith('/') ? route.path : `${parentPath}/${route.path}`.replace(/\/+/g, '/');
        return {
          key: fullPath,
          label: route.meta.title,
          icon: route.meta.icon,
          children: route.children ? generateMenu(route.children, fullPath) : undefined,
        };
      });

    return generateMenu(authRoutes);
  }, [permissions]);
}
