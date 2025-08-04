import {
  BarChartOutlined, DashboardOutlined, DesktopOutlined, RadarChartOutlined,
} from '@ant-design/icons';
import intl from 'react-intl-universal';
import { lazyLoad } from '@/components/enhance/lazyLoad';
import { RouteObjectMeta } from '@/types/login';

const OutletLayout = lazyLoad(() => import('@/components/layouts/OutletLayout'));
const DashboardAnalysis = lazyLoad(() => import('@/pages/dashboard/analysis'));
const DashboardMonitor = lazyLoad(() => import('@/pages/dashboard/monitor'));
const DashboardWorkplace = lazyLoad(() => import('@/pages/dashboard/workplace'));

const dashboardRoutes: RouteObjectMeta[] = [
  {
    path: 'dashboard',
    element: <OutletLayout />,
    meta: {
      get title() {
        return intl.get('menu.overview');
      },
      icon: <DashboardOutlined />,
      code: 'dashboard',
    },
    children: [
      {
        path: 'analysis',
        element: <DashboardAnalysis />,
        meta: {
          get title() {
            return intl.get('menu.analysis');
          },
          icon: <BarChartOutlined />,
          code: 'dashboard:analysis', // 权限标识
        },
      },
      {
        path: 'monitor',
        element: <DashboardMonitor />,
        meta: {
          get title() {
            return intl.get('menu.monitor');
          },
          icon: <RadarChartOutlined />,
          code: 'dashboard:monitor',
        },
      },
      {
        path: 'workplace',
        element: <DashboardWorkplace />,
        meta: {
          get title() {
            return intl.get('menu.workplace');
          },
          icon: <DesktopOutlined />,
          code: 'dashboard:workplace',
        },
      },
    ],
  },
];

export default dashboardRoutes;
