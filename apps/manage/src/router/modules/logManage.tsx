import { FileSearchOutlined, LaptopOutlined, ToolOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import { RouteObjectMeta } from '@/types/login';

const OutletLayout = lazy(() => import('@/components/layouts/OutletLayout'));
const LoginInOut = lazy(() => import('@/pages/logManage/loginInOut'));
const LogOperation = lazy(() => import('@/pages/logManage/logOperation'));

const userRoutes: RouteObjectMeta[] = [
  {
    path: 'log',
    element: <OutletLayout />,
    meta: { title: '日志管理', icon: <FileSearchOutlined />, code: 'user' },
    children: [
      {
        path: 'inout',
        element: <LoginInOut />,
        meta: {
          title: '登录登出日志',
          icon: <LaptopOutlined />,
          code: 'log:inout',
        },
      },
      {
        path: 'operation',
        element: <LogOperation />,
        meta: {
          title: '操作日志',
          icon: <ToolOutlined />,
          code: 'log:operation',
        },
      },
    ],
  },
];

export default userRoutes;
