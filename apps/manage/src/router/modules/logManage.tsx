import { FileSearchOutlined, LaptopOutlined, ToolOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { lazyLoad } from '@/components/enhance/lazyLoad';
import { RouteObjectMeta } from '@/types/login';

const OutletLayout = lazyLoad(() => import('@/components/layouts/OutletLayout'));
const LoginInOut = lazyLoad(() => import('@/pages/logManage/loginInOut'));
const LogOperation = lazyLoad(() => import('@/pages/logManage/logOperation'));

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
    ],
  },
];

export default userRoutes;
