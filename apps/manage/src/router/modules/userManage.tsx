import { MessageOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { lazyLoad } from '@/components/enhance/lazyLoad';
import { RouteObjectMeta } from '@/types/login';

const OutletLayout = lazyLoad(() => import('@/components/layouts/OutletLayout'));
const UserList = lazyLoad(() => import('@/pages/user/list'));
const UserMessage = lazyLoad(() => import('@/pages/user/message'));

const userRoutes: RouteObjectMeta[] = [
  {
    path: 'user',
    element: <OutletLayout />,
    meta: {
      get title() {
        return intl.get('menu.userManage');
      },
      icon: <UserOutlined />,
      code: 'user',
    },
    children: [
      {
        path: 'list',
        element: <UserList />,
        meta: {
          get title() {
            return intl.get('menu.userList');
          },
          icon: <UserSwitchOutlined />,
          code: 'user:list',
        },
      },
      {
        path: 'message',
        element: <UserMessage />,
        meta: {
          get title() {
            return '留言管理';
          },
          icon: <MessageOutlined />,
          code: 'user:message',
        },
      },
    ],
  },
];

export default userRoutes;
