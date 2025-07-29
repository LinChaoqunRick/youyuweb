import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import React from 'react';

import UserLayout from '@/pages/user';
import UserList from '@/pages/user/list';
import { RouteObjectMeta } from '@/types/login';

const userRoutes: RouteObjectMeta[] = [
  {
    path: 'user',
    element: <UserLayout />,
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
