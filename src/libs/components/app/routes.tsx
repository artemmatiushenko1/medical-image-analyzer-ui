import { AppRoute } from '@/libs/enums';
import { Home, Viewer, NewStudy, SignIn } from '@/pages';
import { RouteObject } from 'react-router-dom';
import { PrimaryLayout } from '../layouts';
import { PrivateRoute, PublicRoute } from '../router';

const routes: RouteObject[] = [
  {
    path: AppRoute.HOME,
    element: (
      <PrivateRoute>
        <PrimaryLayout />
      </PrivateRoute>
    ),
    children: [
      { element: <Home />, index: true },
      { element: <div>Reports</div>, path: AppRoute.REPORTS },
      {
        path: AppRoute.VIEWER,
        element: <Viewer />,
      },
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
