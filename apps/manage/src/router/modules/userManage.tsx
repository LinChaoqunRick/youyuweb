import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { lazyLoad } from '@/components/enhance/lazyLoad';
import { RouteObjectMeta } from '@/types/login';

const OutletLayout = lazyLoad(() => import('@/components/layouts/OutletLayout'));
const UserList = lazyLoad(() => import('@/pages/userManage/userList'));
const VisitorList = lazyLoad(() => import('@/pages/userManage/visitorList'));

const userRoutes: RouteObjectMeta[] = [
  {
    path: 'member',
    element: <OutletLayout />,
    meta: {
      get title() {
        return '会员管理';
      },
      icon: <UserOutlined />,
      code: 'member',
    },
    children: [
      {
        path: 'user',
        element: <UserList />,
        meta: {
          get title() {
            return '用户管理';
          },
          icon: <UserSwitchOutlined />,
          code: 'member:user',
        },
      },
      {
        path: 'visitor',
        element: <VisitorList />,
        meta: {
          get title() {
            return '游客管理';
          },
          icon: <UserSwitchOutlined />,
          code: 'member:user',
        },
      },
    ],
  },
];

export default userRoutes;
