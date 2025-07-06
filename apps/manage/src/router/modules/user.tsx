import { UserOutlined } from '@ant-design/icons';
import React from 'react';

import UserLayout from '@/pages/user';
import UserList from '@/pages/user/list';
import { RouteObjectMeta } from '@/types/login';

const userRoutes: RouteObjectMeta[] = [
  {
    path: 'user',
    meta: { title: '用户管理', icon: <UserOutlined /> },
    element: <UserLayout />,
    children: [
      {
        path: 'list',
        element: <UserList />,
        meta: {
          title: '用户列表',
          code: 'user:list',
        },
      },
    ],
  },
];

export default userRoutes;
