import { GET_MANAGE_AUTH_ROUTES, GET_CURRENT_MANAGE_USER } from '@youyu/shared/apis';
import http from '@youyu/shared/network';
import React, {
  createContext, useState, useContext, useEffect, useMemo, ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@/store/useUser';

import { AuthResult, ManageUser, Permission } from '@/types/login';

const AuthContext = createContext<AuthResult>({
  permissions: [], // 权限路由
  authStatus: 0, // 权限加载标识
});

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * 获取当前用户权限路由
 */
async function getAuthRoutes(): Promise<Permission[]> {
  const res = await http.get(GET_MANAGE_AUTH_ROUTES);
  return res.data;
}

/**
 * 获取当前用户信息
 */
async function getCurrentUser(): Promise<ManageUser> {
  const res = await http.get(GET_CURRENT_MANAGE_USER);
  return res.data;
}

interface ComponentProps {
  children: ReactNode;
}

export function AuthProvider({ children }: ComponentProps) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [authStatus, setAuthStatus] = useState(0); // 0: 获取中，1: 成功，2: 失败
  const location = useLocation();
  const { setUser } = useUser();

  // 初始化权限数据
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token && !authStatus) {
      Promise.all([getAuthRoutes(), getCurrentUser()])
        .then(([routeRes, userRes]) => {
          setPermissions(routeRes);
          setAuthStatus(1); // 标记权限加载完成
          setUser(userRes);
        })
        .catch(() => {
          setAuthStatus(2); // 标记权限加载失败
        });
    }
  }, [location.pathname]);

  const value = useMemo(
    () => ({
      permissions,
      authStatus,
    }),
    [permissions, authStatus],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
