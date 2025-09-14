import intl from 'react-intl-universal';
import { lazyLoad } from '@/components/enhance/lazyLoad';
import { RouteObjectMeta } from '@/types/login';
import { FolderOpenOutlined, LinkOutlined, MessageOutlined } from '@ant-design/icons';

const OutletLayout = lazyLoad(() => import('@/components/layouts/OutletLayout'));
const LinkManage = lazyLoad(() => import('@/pages/contentManage/link'));
const MessageManage = lazyLoad(() => import('@/pages/contentManage/message'));

const contentRoutes: RouteObjectMeta[] = [
  {
    path: 'content',
    element: <OutletLayout />,
    meta: {
      get title() {
        return intl.get('menu.contentManage');
      },
      icon: <FolderOpenOutlined />,
      code: 'content',
    },
    children: [
      {
        path: 'message',
        element: <MessageManage />,
        meta: {
          get title() {
            return intl.get('menu.messageManage');
          },
          icon: <MessageOutlined />,
          code: 'content:message',
        },
      },
      {
        path: 'link',
        element: <LinkManage />,
        meta: {
          get title() {
            return intl.get('menu.linkManage');
          },
          icon: <LinkOutlined />,
          code: 'user:list',
        },
      },
    ],
  },
];

export default contentRoutes;
