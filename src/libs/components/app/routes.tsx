import { AppRoute } from '@/libs/enums';
import { Home, Viewer } from '@/pages';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: AppRoute.HOME,
    element: <Home />,
  },
  {
    path: AppRoute.VIEWER,
    element: <Viewer />,
  },
] as const;

export { routes };
