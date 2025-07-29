import {
  BarChartOutlined, DashboardOutlined, DesktopOutlined, RadarChartOutlined,
} from '@ant-design/icons';
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
    meta: { title: '概览', icon: <DashboardOutlined />, code: 'dashboard' },
    children: [
      {
        path: 'analysis',
        element: <DashboardAnalysis />,
        meta: {
          title: '分析页',
          icon: <BarChartOutlined />,
          code: 'dashboard:analysis', // 权限标识
        },
      },
      {
        path: 'monitor',
        element: <DashboardMonitor />,
        meta: {
          title: '监控页',
          icon: <RadarChartOutlined />,
          code: 'dashboard:monitor',
        },
      },
      {
        path: 'workplace',
        element: <DashboardWorkplace />,
        meta: {
          title: '工作台',
          icon: <DesktopOutlined />,
          code: 'dashboard:workplace',
        },
      },
    ],
  },
];

export default dashboardRoutes;
