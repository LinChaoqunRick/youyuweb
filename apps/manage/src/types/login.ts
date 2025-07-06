import { JSX } from 'react';

// import { RouteObject } from 'react-router-dom';

export interface Permission {
  id: number;
  code: string;
  title: string;
  description: string;
  pid: number;
}

export interface AuthResult {
  permissions: Permission[];
  authLoaded: boolean;
}

// 类型拓展：支持 meta
export interface RouteObjectMeta {
  path: string;
  element: JSX.Element;
  meta: {
    title: string;
    code?: string;
    icon?: JSX.Element;
    hide?: boolean;
  };
  children?: RouteObjectMeta[];
}
