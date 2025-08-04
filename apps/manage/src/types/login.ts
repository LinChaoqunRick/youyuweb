import { JSX } from 'react';

export interface Permission {
  id: number;
  code: string;
  title: string;
  description: string;
  pid: number;
}

export interface AuthResult {
  permissions: Permission[];
  authStatus: number; // 0: 获取中，1: 成功，2: 失败
}

// 类型拓展：支持 meta
export type RouteObjectMeta = {
  path: string;
  element: JSX.Element;
  meta: {
    title: string;
    code?: string;
    icon?: JSX.Element;
    hide?: boolean;
  };
  children?: RouteObjectMeta[];
};

export interface ManageUser {
  avatar: string;
  email: string;
  id: number;
  nickname: string;
  sex: number;
  signature: string;
  username: string;
}
