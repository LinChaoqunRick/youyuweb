import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import { RouteObjectMeta } from '@/types/login';

const OutletLayout = lazy(() => import('@/components/layouts/OutletLayout'));
const UserList = lazy(() => import('@/pages/user/list'));

const userRoutes: RouteObjectMeta[] = [
  {
    path: 'user',
    element: <OutletLayout />,
    meta: { title: '用户管理', icon: <UserOutlined />, code: 'user' },
    children: [
      {
        path: 'list',
        element: <UserList />,
        meta: {
          title: '用户列表',
          icon: <UserSwitchOutlined />,
          code: 'user:list',
        },
      },
    ],
  },
];

export default userRoutes;
