import { ControlOutlined, SettingOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { lazyLoad } from '@/components/enhance/lazyLoad';
import { RouteObjectMeta } from '@/types/login';

const OutletLayout = lazyLoad(() => import('@/components/layouts/OutletLayout'));
const Maintenance = lazyLoad(() => import('@/pages/systemManage/maintenance'));

const systemRoutes: RouteObjectMeta[] = [
  {
    path: 'system',
    element: <OutletLayout />,
    meta: {
      get title() {
        return '系统管理';
      },
      icon: <SettingOutlined />,
      code: 'system',
    },
    children: [
      {
        path: 'maintenance',
        element: <Maintenance />,
        meta: {
          get title() {
            return '系统维护';
          },
          icon: <ControlOutlined />,
          code: 'system:maintenance',
        },
      },
    ],
  },
];

export default systemRoutes;
