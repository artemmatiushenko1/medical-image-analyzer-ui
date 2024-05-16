import { AppRoute } from './enums';
import { NewStudy, SignIn, Studies } from '@/pages';
import { RouteObject } from 'react-router-dom';
import { UserLayout } from '../libs/components/layouts';
import { PrivateRoute, PublicRoute } from '../libs/components/router';

const routes: RouteObject[] = [
  {
    path: AppRoute.HOME,
    element: (
      <PrivateRoute>
        <UserLayout />
      </PrivateRoute>
    ),
    children: [
      { element: <Studies />, index: true },
      { element: <NewStudy />, path: AppRoute.NEW_STUDY },
    ],
  },
  {
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
    path: AppRoute.SIGN_IN,
  },
] as const;

export { routes };
