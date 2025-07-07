import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';

import AppLoading from '@/components/layouts/AppLoading';
import { useAuth } from '@/context/AuthContext';
import { findFirstAuthPath, generateRoutes } from '@/utils/routeUtils';

export default function RouterProvider() {
  const location = useLocation();
  const navigate = useNavigate();
  const { permissions, authLoaded } = useAuth();

  // 根据权限生成路由配置
  const routes = useMemo(() => {
    if (!authLoaded) return [];
    return generateRoutes(permissions);
  }, [permissions, authLoaded]);

  const element = useRoutes(routes);

  // 页面加载后进行重定向逻辑
  useEffect(() => {
    if (authLoaded && location.pathname === '/') {
      const firstPath = findFirstAuthPath(routes);
      // TODO... 更具体的路由，比如 /dashboard 重定位到 /dashboard/analysis
      if (firstPath) {
        navigate(firstPath, { replace: true });
      }
    }
  }, [authLoaded, location.pathname, routes, navigate]);

  if (!authLoaded) {
    return <AppLoading />;
  }

  return element;
}
