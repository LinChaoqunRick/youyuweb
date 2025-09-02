import {
  FileSearchOutlined, LaptopOutlined, NotificationOutlined, SolutionOutlined, ToolOutlined,
} from '@ant-design/icons';
import intl from 'react-intl-universal';
import { lazyLoad } from '@/components/enhance/lazyLoad';
import { RouteObjectMeta } from '@/types/login';

const OutletLayout = lazyLoad(() => import('@/components/layouts/OutletLayout'));
const LoginInOut = lazyLoad(() => import('@/pages/logManage/loginInOut'));
const AccessLog = lazyLoad(() => import('@/pages/logManage/accessLog'));
const LogOperation = lazyLoad(() => import('@/pages/logManage/logOperation'));
const NotificationLog = lazyLoad(() => import('@/pages/logManage/notificationLog'));

const userRoutes: RouteObjectMeta[] = [
  {
    path: 'log',
    element: <OutletLayout />,
    meta: {
      get title() {
        return intl.get('menu.logManage');
      },
      icon: <FileSearchOutlined />,
      code: 'user',
    },
    children: [
      {
        path: 'inout',
        element: <LoginInOut />,
        meta: {
          get title() {
            return intl.get('menu.logLoginOut');
          },
          icon: <LaptopOutlined />,
          code: 'log:inout',
        },
      },
      {
        path: 'access',
        element: <AccessLog />,
        meta: {
          get title() {
            return '访问日志';
          },
          icon: <SolutionOutlined />,
          code: 'log:inout',
        },
      },
      {
        path: 'operation',
        element: <LogOperation />,
        meta: {
          get title() {
            return intl.get('menu.logOperation');
          },
          icon: <ToolOutlined />,
          code: 'log:operation',
        },
      },
      {
        path: 'notification',
        element: <NotificationLog />,
        meta: {
          get title() {
            return '通知日志';
          },
          icon: <NotificationOutlined />,
          code: 'log:notification',
        },
      },
    ],
  },
];

export default userRoutes;
