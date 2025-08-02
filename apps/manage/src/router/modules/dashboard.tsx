import {
  BarChartOutlined, DashboardOutlined, DesktopOutlined, RadarChartOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
import { RouteObjectMeta } from '@/types/login';

const OutletLayout = lazy(() => import('@/components/layouts/OutletLayout'));
const DashboardAnalysis = lazy(() => import('@/pages/dashboard/analysis'));
const DashboardMonitor = lazy(() => import('@/pages/dashboard/monitor'));
const DashboardWorkplace = lazy(() => import('@/pages/dashboard/workplace'));

const dashboardRoutes: RouteObjectMeta[] = [
  {
    path: 'dashboard',
    element: <OutletLayout />,
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
