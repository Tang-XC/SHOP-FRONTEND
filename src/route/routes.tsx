import React, { Suspense, FC, lazy } from 'react';
import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';
export interface RouteItem {
  path: string;
  element: JSX.Element;
  children?: RouteItem[];
  showNav?: {
    title: string;
    icon?: string;
  };
}
export const lazyLoad = (Comp: FC<any>) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Comp />
    </Suspense>
  );
};
export const merchantRoutes: RouteItem[] = [
  {
    path: '',
    element: <Navigate to="/merchant/overview" />,
  },
  {
    path: '/merchant/overview',
    element: lazyLoad(React.lazy(() => import('@/pages/merchant/overview'))),
    showNav: {
      title: '概览',
    },
  },
  {
    path: '/merchant/shop',
    element: lazyLoad(React.lazy(() => import('@/pages/merchant/shop'))),
    showNav: {
      title: '我的店铺',
    },
  },
];
export const consumerRoutes: RouteItem[] = [
  {
    path: '/home',
    element: lazyLoad(React.lazy(() => import('@/pages/consumer/home'))),
    showNav: {
      title: '首页',
    },
  },
  {
    path: '/shop',
    element: lazyLoad(React.lazy(() => import('@/pages/consumer/shop'))),
    showNav: {
      title: '商城',
    },
  },
];
export const adminRoutes: RouteItem[] = [
  {
    path: '',
    element: <Navigate to="/admin/merchants" />,
  },
  {
    path: '/admin/merchants',
    element: lazyLoad(React.lazy(() => import('@/pages/admin/merchants'))),
    showNav: {
      title: '商家',
    },
  },
  {
    path: '/admin/users',
    element: lazyLoad(React.lazy(() => import('@/pages/admin/users'))),
    showNav: {
      title: '用户',
    },
  },
];
export default [
  {
    path: '/',
    element: lazyLoad(React.lazy(() => import('@/Layout'))),
    children: [
      {
        path: '/auth',
        element: lazyLoad(React.lazy(() => import('@/pages/auth'))),
      },
      {
        path: '/admin',
        element: lazyLoad(React.lazy(() => import('@/pages/admin'))),
        children: adminRoutes,
      },
      {
        path: '/merchant',
        element: lazyLoad(React.lazy(() => import('@/pages/merchant'))),
        children: merchantRoutes,
      },
      ...consumerRoutes,
      {
        path: '*',
        element: lazyLoad(React.lazy(() => import('@/pages/Error/404'))),
      },
    ],
  },
];
