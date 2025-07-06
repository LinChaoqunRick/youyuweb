import { Menu } from 'antd';
import React from 'react';

import { useMenu } from '@/hooks/useMenu';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function App() {
  const authMenus: MenuItem[] = useMenu();
  const items: MenuItem[] = authMenus[0]?.children;

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
}

export default App;
