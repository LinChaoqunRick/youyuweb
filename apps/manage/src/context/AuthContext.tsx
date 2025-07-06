import React, {
  createContext, useState, useContext, useEffect, useMemo, ReactNode,
} from 'react';

import { AuthResult, Permission } from '@/types/login';

const AuthContext = createContext<AuthResult>({
  permissions: [],
  authLoaded: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

// 模拟API
async function getAuthData(): Promise<Permission[]> {
  // 模拟网络延迟
  await new Promise(resolve => {
    setTimeout(() => resolve(true), 500);
  });

  return [
    {
      id: 1,
      code: 'dashboard:analysis',
      title: '',
      description: '',
      pid: -1,
    },
    {
      id: 1,
      code: 'user:list',
      title: '',
      description: '',
      pid: -1,
    },
  ];
}

type ComponentProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: ComponentProps) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [authLoaded, setAuthLoaded] = useState(false); // 新增：权限加载状态

  // 初始化权限数据
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        // 模拟API请求
        const routeData = await getAuthData();
        setPermissions(routeData);
      } catch (error) {
        console.error('权限获取失败', error);
      } finally {
        setAuthLoaded(true); // 标记权限已加载完成
      }
    };

    fetchAuthData();
  }, []);

  const value = useMemo(
    () => ({
      permissions,
      authLoaded, // 暴露加载状态
    }),
    [permissions, authLoaded],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
