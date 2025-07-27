import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import AppLoading from '@/components/layouts/AppLoading';
import { useAuth } from '@/context/AuthContext';
import { basicRoutes } from '@/router';
import { findFirstAuthPath, generateRoutes } from '@/utils/routeUtils';

export default function RouterProvider() {
  const access_token = localStorage.getItem('access_token');
  const location = useLocation();
  const navigate = useNavigate();

  const { permissions, authLoaded } = useAuth();
  // 根据权限生成路由配置

  const routes = useMemo(() => {
    return authLoaded ? generateRoutes(permissions) : basicRoutes;
  }, [authLoaded, permissions]);

  const element = useRoutes(routes);
  // 页面加载后进行重定向逻辑
  useEffect(() => {
    const locationPath = location.pathname;
    // 是否已经登录(存在access_token)
    if (access_token) {
      // 登录后自动跳转到第一个路由
      if (authLoaded && ['/', '/login'].includes(locationPath)) {
        const firstPath = findFirstAuthPath(routes);
        if (firstPath) {
          navigate(firstPath, { replace: true });
        }
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, [authLoaded, location.pathname]);

  if (access_token && !authLoaded) {
    return <AppLoading />;
  }
  return element;
}
