import { AppRoute } from '@/libs/enums';
import { Home, NewImage, Viewer } from '@/pages';
import { RouteObject } from 'react-router-dom';
import { PrimaryLayout } from '../layouts';

const routes: RouteObject[] = [
  {
    path: AppRoute.HOME,
    element: <PrimaryLayout />,
    children: [
      { element: <Home />, index: true },
      {
        path: AppRoute.VIEWER,
        element: <Viewer />,
      },
      {
        path: AppRoute.NEW_IMAGE,
        element: <NewImage />,
      },
    ],
  },
] as const;

export { routes };
