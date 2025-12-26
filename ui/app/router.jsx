// src/router.jsx
import {
  createRouter,
  createRoute,
  createRootRoute
} from '@tanstack/react-router';
import IndexPage from '@pages/IndexPage';
import UsersPage from '@pages/users/UsersPage';
import { Outlet } from '@tanstack/react-router';
import UserDetailPage from '../pages/users/userDetailPage';

// 1) 루트 라우트 (Outlet처럼 자식이 들어올 자리)
const rootRoute = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
      </>
    );
  }
});

// 2) 자식 라우트들
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage
});

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/userInfo',
  component: UsersPage
});

const userDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/userInfo/$id',
  component: UserDetailPage
});

// 3) 라우터 인스턴스 생성
export const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, userRoute, userDetailRoute])
});
