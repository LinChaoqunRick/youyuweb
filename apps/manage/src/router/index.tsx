import React from 'react';
import { Navigate } from 'react-router-dom';

import dashboardRoutes from '@/router/modules/dashboard';
import logRoutes from '@/router/modules/logManage';
import userRoutes from '@/router/modules/userManage';
import { RouteObjectMeta } from '@/types/login';

// 页面组件动态导入
const BasicLayout = React.lazy(() => import('@/components/layouts/BasicLayout'));
const Login = React.lazy(() => import('@/pages/login'));
const NotFound = React.lazy(() => import('@/pages/error/NotFound'));

// 基础路由（无需权限）
export const basicRoutes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      hide: true,
    },
  },
  {
    path: '/404',
    element: <NotFound />,
    meta: {
      title: '404',
      hide: true,
    },
  },
];

// 权限路由配置（需要动态过滤）
export const authRoutes: RouteObjectMeta[] = [
  {
    path: '/',
    element: <BasicLayout />,
    meta: {
      title: '有语-管理系统',
    },
    children: [
      // 仪表盘路由组
      ...dashboardRoutes,
      // 用户管理路由组
      ...userRoutes,
      // 日志管理路由组
      ...logRoutes,
    ],
  },
];

// 通配路由放在最后
export const wildcardRoute = {
  path: '*',
  element: <Navigate to="/404" replace />,
  meta: { hide: true },
};
