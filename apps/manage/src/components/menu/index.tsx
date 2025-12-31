import { Menu, MenuProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenu } from '@/hooks/useMenu';
import { useAppSettings } from '@/store/useAppSettings';
import type { MenuItem } from '@youyu/shared/types/vo/common.ts';
import { extractMenus } from '@/utils/dataUtils.ts';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const authMenus: MenuItem[] = useMenu();
  const { menuCollapsed } = useAppSettings();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const items = useMemo(() => {
    return authMenus[0]?.children ?? [];
  }, [authMenus]);

  // 使用 useMemo 缓存 selectedKeys
  const selectedKeys = useMemo(() => [location.pathname], [location.pathname]);

  // 当路由变化时，自动更新展开的菜单
  useEffect(() => {
    setOpenKeys(extractMenus(location.pathname));
  }, [location.pathname]);

  const onClick = ({ key }: { key: string }) => {
    if (menuCollapsed) {
      return;
    }
    navigate(key);
  };

  // 监听菜单展开/折叠变化
  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 220 }}
      mode="inline"
      inlineCollapsed={menuCollapsed}
      items={items as MenuProps['items']}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    />
  );
}

export default App;
