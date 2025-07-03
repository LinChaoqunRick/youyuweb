import { JSX, lazy } from 'react';

const Analysis = lazy(() => import('@/views/dashboard/analysis'));
const Login = lazy(() => import('@/views/login'));
const NotFound = lazy(() => import('@/views/error/NotFound'));

export interface AppRoute {
  path: string;
  element: JSX.Element;
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    roles?: string[];
  };
}

export const routes: AppRoute[] = [
  {
    path: '/login',
    element: <Login />,
    meta: { title: 'Login' },
  },
  {
    path: '/dashboard/analysis',
    element: <Analysis />,
    meta: { title: 'Dashboard', requiresAuth: true },
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
