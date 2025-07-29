import { GET_MANAGE_AUTH_ROUTES } from '@youyu/shared/apis';
import http from '@youyu/shared/network';
import React, {
  createContext, useState, useContext, useEffect, useMemo, ReactNode,
} from 'react';

import { useLocation } from 'react-router-dom';
import { AuthResult, Permission } from '@/types/login';

const AuthContext = createContext<AuthResult>({
  permissions: [], // 权限路由
  authLoaded: false, // 权限是否加载完成
});

export function useAuth() {
  return useContext(AuthContext);
}

async function getAuthData(): Promise<Permission[]> {
  const res = await http.get(GET_MANAGE_AUTH_ROUTES);
  return res.data;
}

interface ComponentProps {
  children: ReactNode;
}

export function AuthProvider({ children }: ComponentProps) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [authLoaded, setAuthLoaded] = useState(false); // 新增：权限加载状态
  const location = useLocation();

  // 初始化权限数据
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      getAuthData().then(res => {
        setPermissions(res);
        setAuthLoaded(true); // 标记权限已加载完成
      });
    }
  }, [location.pathname]);

  const value = useMemo(
    () => ({
      permissions,
      authLoaded,
    }),
    [permissions, authLoaded],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
