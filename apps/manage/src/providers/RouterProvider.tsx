import React, { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';

import AppLoading from '@/components/layouts/AppLoading';
import { useAuth } from '@/context/AuthContext';
import { generateRoutes } from '@/utils/routeUtils';

export default function RouterProvider() {
  const { permissions, authLoaded } = useAuth();

  // 根据权限生成路由配置
  const routes = useMemo(() => {
    // 权限未加载完成时不生成路由
    if (!authLoaded) return [];

    return generateRoutes(permissions);
  }, [permissions, authLoaded]);

  const element = useRoutes(routes);

  // 处理不同状态
  if (!authLoaded) {
    // 权限数据加载中
    return <AppLoading />;
  }

  return element;
}
