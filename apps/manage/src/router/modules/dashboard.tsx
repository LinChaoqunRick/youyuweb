import { DashboardOutlined } from '@ant-design/icons';
import React from 'react';

import Dashboard from '@/pages/dashboard';
import DashboardAnalysis from '@/pages/dashboard/analysis';
import DashboardMonitor from '@/pages/dashboard/monitor';
import DashboardWorkplace from '@/pages/dashboard/workplace';
import { RouteObjectMeta } from '@/types/login';

const dashboardRoutes: RouteObjectMeta[] = [
  {
    path: 'dashboard',
    element: <Dashboard />,
    meta: { title: '仪表盘', icon: <DashboardOutlined /> },
    children: [
      {
        path: 'analysis',
        element: <DashboardAnalysis />,
        meta: {
          title: '分析页',
          code: 'dashboard:analysis', // 权限标识
        },
      },
      {
        path: 'monitor',
        element: <DashboardMonitor />,
        meta: {
          title: '监控页',
          code: 'dashboard:monitor',
        },
      },
      {
        path: 'workplace',
        element: <DashboardWorkplace />,
        meta: {
          title: '工作台',
          code: 'dashboard:workplace',
        },
      },
    ],
  },
];

export default dashboardRoutes;
