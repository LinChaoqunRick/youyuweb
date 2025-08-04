import { Menu } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenu } from '@/hooks/useMenu';
import { useAppSettings } from '@/store/useAppSettings';
import type { MenuItem } from '@youyu/shared/types';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const authMenus: MenuItem[] = useMenu();
  const { menuCollapsed } = useAppSettings();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const items = useMemo(() => {
    return authMenus[0]?.children ?? [];
  }, [authMenus]);

  const selectedKeys = [location.pathname];

  useEffect(() => {
    const newOpenKeys = items
      .filter(item => item.children?.some(child => location.pathname.startsWith(child.key)))
      .map(item => item.key);
    setOpenKeys(newOpenKeys);
  }, [location.pathname, items]);

  const onClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      selectedKeys={selectedKeys}
      openKeys={menuCollapsed ? [] : openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      inlineCollapsed={menuCollapsed}
      items={items}
    />
  );
}

export default App;
